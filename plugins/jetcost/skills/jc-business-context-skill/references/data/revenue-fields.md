---
type: Data Concept
description: "What revenueCurrent, revenueEcpc, and revenueOperational each actually measure at the click level and why they diverge, what revenueCurrent shows while partner conversion data is missing or partial and how it is recovered, why revenueEcpc is no longer the value sent to Google as a conversion value, why the funnel-level `revenue` metric is the sessions pro-rata total and not their sum (only its Organic Core leg is click-level revenueCurrent), why MAL revenue has three different representations that do not reconcile, and why 'Actual Revenue' is billing/invoicing data outside ClickHouse entirely, not a fourth datamart field."
tags: [data, commercials]
timestamp: 2026-10-22T00:00:00Z
---

# Revenue Fields — Current, eCPC, Operational

## Overview

Three click-level revenue fields exist in `jc_clicks_datamart`, and
they answer different questions. This applies across deal types, not
just CPA — for CPC deals the three normally coincide, which is why
the distinction is easy to miss until a CPA or min_cpc read exposes
it.

## `revenueEcpc` — known at click time

The revenue Jetcost can know *at the moment of the click*. For CPC
partners this is the real CPC, known immediately. For CPA partners
there is no real revenue yet at click time — this is an **estimate**,
produced by the "cpc calculator" tool from moving averages on past
performance.

For min_cpc deals, the calculator's current behaviour is to set this
estimate to `minCpc`. That is a decision internal to the calculator,
not a guaranteed property of the field, and it could change — don't
treat `revenueEcpc` as reliably equal to the min_cpc floor; compute
the floor directly from `minCpc` instead (see
[core/commercials/cpa-model.md](/core/commercials/cpa-model.md#cpa_min_cpc--fixed-fee-with-cpc-floor)).

### No longer the value sent to Google (since 2026-06-01)

`revenueEcpc` is built on the **eCPC per partner** — the average
revenue per click of the partner receiving the clickout. That used to
be exactly what SEM pushed to Google as the economic value of a
conversion, which made the two effectively the same number.

Since 2026-06-01 they have diverged: the value sent to Google now comes
from a model keyed on the **clicked route**, with no partner dimension
at all (see
[core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md)).
`revenueEcpc` has **not** been realigned with that model — it still
carries the old per-partner logic. Whether to align it is under
evaluation and, as of 2026-09-03, has not been done.

So: do not read `revenueEcpc` as "what Google is told a click is worth"
for any date after 2026-06-01. It answers a different question —
revenue knowable at click time — and now does so with different logic
from the bidding signal. The divergence is confined to this field and
that signal; `revenueCurrent` and `revenueOperational` are unaffected.

## `revenueCurrent` — the commercial reference

The consolidated revenue, built from ingesting the booking-report
files partners send (see
[partner-lifecycle.md](/core/commercials/partner-lifecycle.md#implications-for-data-interpretation)
for how that reporting works and which partners lag). This is the
figure commercial reading uses.

### How partner data reaches it, and what fills the gaps

CPA partners send their conversions through one of two channels, and
what `revenueCurrent` shows while that data is missing depends on
which one:

- **Booking-report file.** The trigger is binary: either the file
  arrived or it did not. While a file-based partner's report is
  missing, `revenueCurrent` is filled with `revenueEcpc` (the **eCPC
  fallback**) until the real booking data lands. A recent figure for
  such a partner may therefore be an estimate, not a settled actual;
  for partners on the known CPA-lag list (see
  [config/partners/index.md](/config/partners/index.md#known-cpa-lag-partners))
  this is the expected state of recent days. Once a file has arrived
  its content is taken as it is: the fallback does not look at how
  many conversions the file carries.
- **Conversion API** (`groupConversionApiEnabled` on the clicks
  datamart). The eCPC fallback never applies. When the partner sends
  only a fraction of its conversions, `revenueCurrent` carries only
  that fraction: it is **silently understated**, with no estimate in
  its place and no flag marking it. Nothing in the data tells a
  partial feed apart from a genuine drop in the partner's
  performance, so a fall on a Conversion-API partner needs its feed
  ruled out before it is read as performance.

The eCPC fallback is unrelated to the CPA fallback that admits CPA
offers into results (see
[core/commercials/cpa-fallback.md](/core/commercials/cpa-fallback.md))
and to the default eCPC a partner runs on when none was configured
(see
[core/commercials/partner-lifecycle.md](/core/commercials/partner-lifecycle.md#3-technical-integration)).

### When the missing data is recovered

When a partner later sends the missing conversions, how they enter
`revenueCurrent` depends on the report's grain:

- **Click-based report** — reimported as is: the affected clicks get
  their real revenue and bookings, exactly as if the data had
  arrived on time.
- **Aggregated report** — the revenue is applied pro-rata across the
  clicks, but the bookings are not restored. The period's revenue
  becomes right while its booking counts, and anything built on them
  such as CR, stay understated.

Which periods and partners this has happened to, and which metrics are
still wrong for them, is implementation and lives in the ClickHouse
semantic layer: its data-incidents file, applied by rule R024.

See [query-caveats.md](/data/query-caveats.md) for the general,
shorter-window lag that affects CR and Payoff for any CPA partner,
not just the known-lag list.

## `revenueOperational` — for marketing/operational use, not commercial reading

An artificial figure that exists to keep marketing operability and
other analyses (e.g. AB tests) usable. Out of scope for commercial
reading, which always uses `revenueCurrent`.

### Default rule

`revenueOperational = revenueCurrent`. No floor is applied — this is,
and has always been, the rule for every partner and every click type
except the `LMNNEXT` carve-out below. In particular, a negative-margin
`AMC3` period (see
[cpa-model.md](/core/commercials/cpa-model.md#amc3--margin-share-inter-company)) shows up as
negative in `revenueOperational` too, same as in `revenueCurrent`.

### `LMNNEXT` carve-out — redistribution (from 2026-06-01)

`LMNNEXT` is billed on the AMC3 "margin share" condition, which can
be negative on an individual click (see
[config/partners/index.md](/config/partners/index.md#known-groupcode-exceptions)) — the reason
this carve-out exists at all.

Since 2026-06-01, `LMNNEXT` flight clicks that generated a booking no
longer follow the default rule above (every other `LMNNEXT` click —
non-flight, or flight without a booking — still does). Instead,
actual revenue is redistributed across clicks following the shape of
the theoretical commission (which is never negative, so the result
is never negative either):

```
revenueOperational = theoretical_commission × boost
boost = actual_revenue / theoretical_commission,
        measured over the trailing 30 days before the click's date
```

`boost` is computed per country cluster, recalculated daily: a
country with at least 1,000 flight clicks in the trailing 30-day
window gets its own boost; smaller countries are pooled together.

**Residual gap vs. `revenueCurrent`.** Even under the new logic,
`LMNNEXT`'s `revenueOperational` won't match `revenueCurrent` exactly
when cross-checked — `boost` is a 30-day trailing average applied to
a single day, so a gap remains: roughly −2% over a long window (e.g.
Jan–Jul 2026) vs. roughly −10% over a short one (e.g. Jun–Aug 2026).
The longer the period, the smaller the gap.

**Discontinuity at 2026-06-01 — don't trend across it.** Data was
reprocessed from 2026-06-01 onwards only; dates before that keep the
old floor-at-zero values. Any table spanning the boundary (including
rolling-window rollups, e.g. a 365-day rollup) mixes old and new
values and shows a step change at that date: `LMNNEXT`
`revenueOperational` from June 2026 onwards reads roughly 30% lower
than the old rule would have produced for the same clicks (June 2026:
−23.4%; July 2026: −35.5%; 1 Jun–10 Aug 2026: −30.4%). This is not a
performance drop — the new logic brings the metric in line with
`revenueCurrent` instead of overstating it — but a year-on-year or
long-range `LMNNEXT` comparison crossing 2026-06-01 will show that
step regardless.

## From click-level to funnel-level: `revenue`

The three fields above live at the click level, in `jc_clicks_datamart`.
[data/metrics.md](/data/metrics.md)'s funnel-level `revenue` metric is
**not** their sum. It is `revenueCurrentProRataTotal` on the sessions
datamart, the whole business, built from five legs:

| Leg | Source | In Full Core |
|---|---|---|
| Organic Core | `revenueCurrentCore` — `revenueCurrent` summed over Core clicks | Yes |
| MAL Core | `revenueCurrentProRataMalCore` — network-reported, pro-rata | Yes |
| MAL Media | `revenueCurrentProRataMalMedia` — pro-rata | No |
| Display Media | `revenueCurrentProRataNetMedia` — pro-rata | No |
| Data Monetisation | `revenueCurrentProRataDataMonetization` — pro-rata, monthly grain | No |

Only the Organic Core leg is click-level `revenueCurrent` aggregated, and
it carries the caveats above (eCPC fallback and partial Conversion-API
feeds included). The other four are allocations, with their own caveats
in [data/pro-rata-allocation.md](/data/pro-rata-allocation.md). The first
two legs together are **Full Core** revenue (`revenueCurrentProRataFullCore`).

`SUM(revenueCurrent)` over clicks is a different, narrower figure: Core
plus MAL, with MAL as the summed winning bids (see the MAL section
below), and no Media or Data Monetisation — those are attributable to
no click. It is what "revenue" means on the clicks datamart, and on
searches and impressions an unqualified "revenue" is Full Core with the
MAL Core leg again as bids. Which perimeter each grain reaches is
enforced for agents and analysts as `R022` in
`skills/jc_clickhouse_semantic_layer_skill/query-rules.yml`. The figures
do not reconcile across grains, so always say which one an answer is.

## MAL revenue: three representations, one name

Everything above describes Core clicks. On **MAL** clicks the same field
names mean something different, and `revenueCurrent` in particular is not
what its name suggests.

### At click level, `revenueCurrent` is the bid

For every non-Core click, `revenueCurrent` is **set equal to
`revenueEcpc`** by construction — there is no separate consolidation step
for MAL, and no partner booking report enters the click level at all. The
number both fields carry is the **bid** that won the placement.

Two consequences:

- Do not read a click-level MAL `revenueCurrent` as "consolidated
  revenue". It is a price, known at click time, no more settled than
  `revenueEcpc` — because it *is* `revenueEcpc`.
- The two fields are the same number, so comparing them on a MAL click
  answers nothing — there is no MAL equivalent of the Core divergence
  this file's earlier sections describe.

### At search and session level, still the bid — just aggregated

The MAL revenue columns on the searches and sessions datamarts are the
same click-level bids summed within each search or each session. Same
lineage, same meaning, one level up.

**But on searches, MAL Media is the inline unit alone.** The exit unit —
by far the largest MAL Media placement — fires when the user leaves a
page, outside any search, so it has nothing to attach to; neither does
the checkbox. The inline unit is the exception: it is served within a
search, and its clicks carry that search just as MAL Core clicks do. So the MAL Media that reaches the searches datamart is the inline
unit and nothing else, about 1% of MAL Media clicks, and MAL revenue read
there is, in practice, **MAL Core plus the inline unit**. A per-search
"MAL Media" metric — RPMS, clicks per search, CTR — is therefore not a
MAL Media figure at all: it is an inline figure, a legitimate answer only
to a question asked about the inline unit.

### On the sessions view, the pro-rata columns are a different fact

The `revenueCurrentProRata*` columns exposed only by the sessions
datamart view do **not** come from clicks at all. They come from the MAL
network revenue report, allocated down to sessions — see
[data/pro-rata-allocation.md](/data/pro-rata-allocation.md).

So the same row of that view carries two MAL revenue figures with the
same prefix and incompatible semantics: `revenueCurrentMal` (the bids
that won) and `revenueCurrentProRataMal` (the revenue the network
reported). **They do not reconcile, by construction**, and the gap
between them is not an error to chase.

Which to use:

- **Revenue reporting, and anything read at session level** — the
  pro-rata columns. They are the figure the network actually reported,
  which is what revenue reporting means by MAL revenue.
- **Auction and placement questions** ("what did this click cost the
  buyer", "who won this exit unit") — the click-level bid, which is the
  only representation that answers them.

## "Actual Revenue" — real, but not a ClickHouse field at all

Report copy sometimes contrasts "Actual Revenue" with Current (e.g.
`agents/pcl-report`'s footer against budget/forecast; `agents/daily-report`'s
footer: *"All the revenues are Current Revenues / Actual Revenues are
ignored"*). This is a real, distinct figure — **billing/invoicing
revenue**, sourced from finance systems, not from any ClickHouse
datamart. That's why it isn't among `revenueCurrent`/`revenueEcpc`/`revenueOperational`
above, and why `revenue` in [data/metrics.md](/data/metrics.md) can't
be reconciled to it directly: invoicing data is aggregated at a much
coarser grain (no per-date/country/device breakdown), so it can't be
sliced the way datamart figures can. Treat it as an external
reconciliation figure, not something queryable alongside the rest of
this file.
