---
type: Data Concept
description: "What pro-rata allocation is, why some revenue and marketing-cost streams need it while others don't, which dimensions it's safe to slice a pro-rata figure by, how it behaves when no allocation rate exists for a given slice, and why MAL repeats the previous day's figure on the most recent day."
tags: [data, commercials]
timestamp: 2026-09-18T00:00:00Z
---

# Pro-Rata Allocation

## Overview

Most of what a session "earns" or "costs" is known directly: an
Organic Core click carries its own `revenueCurrent`/`revenueEcpc`
(see [data/revenue-fields.md](/data/revenue-fields.md)), and a
booking is either a conversion or it isn't. But several revenue
streams and all of marketing cost are reported by a counterparty —
an ad network, a SEM platform, a data partner — as one aggregate
figure over a coarse slice (a day, a country, a device, a campaign),
with no natural link back to the individual session that "caused"
it.

**Pro-rata allocation is how that aggregate figure is spread down to
session grain**: every qualified session in the same slice is
assumed to have contributed an equal share, so the aggregate can be
divided into a per-session rate and joined/summed alongside
genuinely session-level metrics. It is an allocation, not a
measurement — no single session's pro-rata figure is a fact about
that session; it's a fair share of a fact about the whole slice.

## Why some streams need it and others don't

| Stream | Pro-rata? | Why |
|---|---|---|
| Organic Core | No | Known per click — `revenueCurrent`/`revenueEcpc` in `jc_clicks_datamart` |
| MAL Core | Yes | Priced as a placement fee separate from the partner's own CPC/CPA rate — see [core/commercials/mal/overview.md](/core/commercials/mal/overview.md). It's sold directly to an identifiable partner, same as Organic Core, but the sessions datamart only carries its pro-rata form, not a direct per-session figure the way `revenueCurrentCore` is one |
| MAL Media | Yes | Structurally independent of the click funnel — see [core/business/revenue-streams.md](/core/business/revenue-streams.md) |
| Display Media (GAM + AFS) | Yes | Same — priced by the ad market, not by Jetcost's partner deals |
| Data Monetisation | Yes | Reported by the data partner at deal/business-profile grain, not per session |
| Marketing Cost | Yes | Reported by the ad platform (Google Ads, other SEM) per campaign/day, not per session |

Marketing Cost — `costMktg` in [data/metrics.md](/data/metrics.md),
also exposed pre-computed as `costProRataMktg` on the sessions
datamart view — is entirely a
pro-rata figure; there is no non-pro-rata marketing cost. Same class
of fact as **GAds Clicks**/**GAds Cost** in
[data/metrics.md](/data/metrics.md), which the allocation also
underlies. `revenueCurrentProRataTotal` (the ROAS Pro Rata family's
numerator) is `revenueCurrentCore + MAL Core + MAL Media + Display Media +
Data Monetisation` computed row by row — Organic Core is the one
term in that sum that isn't itself an allocation.

The raw pro-rata fields for every stream above live only on
`datamart.jc_sessions_datamart_view` — see
`skills/jc_clickhouse_semantic_layer_skill` for the exact field
names (`revenueCurrentProRata*`, `costProRata*`, `clicksProRata*`,
`impressionsProRata*`, `conversionsProRata*`). This file covers the
business concept the allocation exists to serve — what it is, why it's
needed, which dimensions it's safe to read it by — not the
allocation formula itself, which lives in the ClickHouse semantic
layer skill only.

## Which dimensions are safe to slice by

Each stream's aggregate is reported — and therefore allocated — at
its **own** grain, and the grains differ from one stream to the
next. A pro-rata figure can be sliced meaningfully by any dimension
at or coarser than that grain; slicing **finer** doesn't reveal real
signal, it just divides the same rate proportionally across whatever
finer bucket you chose, producing a smooth number that looks precise
but carries no extra information. The breakdown below is per stream,
because "safe" for one stream is often unsafe for another.

### MAL (MAL Core, MAL Media)

- **Safe**: Day, Country, Device, Site/brand, Language.
- **Not safe**: Campaign, Traffic Type — neither is part of this
  allocation at all, so a MAL revenue breakdown by Campaign isn't a
  real decomposition, just the same Day/Country/Device/Site/Language
  rate spread evenly across whatever campaign mix that slice happens
  to contain.
- Context (web vs app) is safe, but indirectly: there's no separate
  web-vs-app field in this allocation — it's folded into Site/brand,
  which carries a dedicated value for app traffic alongside each
  web brand's own domain. Confirmed directly against data: MAL
  Media's pro-rata revenue reads exactly `0` for every app session,
  matching the "MAL Media is zero on app" fact in
  [core/business/revenue-streams.md](/core/business/revenue-streams.md).

### Display Media (GAM + AFS)

Two allocations combine into one Display Media figure:

- A general rate, safe by: Day, Country, Device, Site type. Not
  safe by Campaign — this part of the allocation has no campaign
  detail at all.
- A GAM-specific rate, safe by everything above plus session-level
  Campaign attribution (Channel Group, Traffic Type, Campaign Type —
  read on both the session's own Campaign and its Content). This
  campaign detail is scoped to **session-level attribution only** —
  see [data/attribution.md](/data/attribution.md) for how that scope
  differs from the lastclicknotdirect/userbased models used for
  revenue reporting elsewhere. Reading GAM Media revenue by a
  lastclicknotdirect- or userbased-scoped Campaign isn't grounded in
  how this allocation is actually computed.

### Data Monetisation

- **Safe**: Month, Context (web vs app), business profile.
- **Not safe**: Day, Country, Device, Campaign — none of these exist
  in this allocation at all.

This is the sharpest case in the whole file: the allocation is
**monthly**, not daily, and carries no Country or Device split. A
"Data Monetisation revenue by day" or "by country" query isn't a
real breakdown — it's the one monthly, web-vs-app-level number
divided arbitrarily across days or countries. Combined with it still being
early-stage and excluded from standard performance evaluations (see
[core/media/data-monetization.md](/core/media/data-monetization.md)),
treat any WoW or country-level read of it as meaningless by
construction, not just noisy.

### Marketing Cost (GAds Cost/Clicks)

Two allocations combine here too:

- A general rate covering all channels (the GAds, Ds and NotSem
  buckets — cut by buying platform, not by SEM vs Not SEM traffic; see
  [core/marketing/traffic-taxonomy.md](/core/marketing/traffic-taxonomy.md)),
  safe by: Day, Context, Device, session-level Campaign.
- A GAds-specific rate (the one that has replaced the general one
  for GAds since 2026-01-01), safe by everything above plus
  Country — but **keyed on the session's user geo-IP, not the
  market-level `country` field** the rest of this bundle uses for
  Country. See [data/query-caveats.md](/data/query-caveats.md)'s
  UK/GB section for a case where the two diverge for the same
  session.
- **Not safe**: anything finer than session-level Campaign (a
  specific keyword, ad group, or landing page).
- Grouping by a Campaign dimension scoped on a different attribution
  model (`lastClickNotDirect*`, `userBased*`) does **not** move cost
  between buckets: the sessions where the two fields diverge are the
  direct ones, which carry `0`. It relabels the cost, it does not
  reallocate it. This is a labelling question, not an allocation error
  — unlike slicing finer than session-level Campaign, above.
- Session-level Campaign is safe to slice by, but the campaign
  breakdown is **not exhaustive**: paid spend whose specific campaign
  couldn't be identified is allocated onto a not-found virtual
  campaign, so the named campaigns don't sum to the total. See
  [data/query-caveats.md](/data/query-caveats.md).
- "Safe by Context" means slicing by it doesn't distort the
  allocation — it does **not** mean app gets a share proportional to
  its engagement. Marketing Cost reads `0` on app except for two kinds
  of campaign: app-install campaigns allocate cost onto app sessions
  from 2026-09-07, and OIA campaigns share their Google Ads cost
  between web and app sessions since the October 2026 restatement
  (history back to 2023-01). W2A sessions of every other campaign keep
  reading `0`. See
  [data/query-caveats.md](/data/query-caveats.md)'s app marketing-cost
  section for the three cases and what each zero means.

### A cross-cutting caveat: "Device" isn't the same field everywhere

Different allocations key on different raw device fields, and
they don't all draw the same lines. MAL and marketing cost key on
the plain device form factor (phone/desktop/tablet); Display Media
keys on a field of the same conceptual role that has been observed
to also fold in the web-vs-app split. Don't assume a "by Device"
pro-rata breakdown means the same thing across streams — check which
raw field a given allocation actually uses before comparing a
Device-sliced MAL figure against a Device-sliced Media one.

## How it falls back when there's no rate to allocate

A pro-rata figure is computed by looking up a per-session rate for
the session's slice and multiplying by the session count in that
slice. When no rate has been configured for a given slice — a
country with no marketing spend that day, a campaign not yet
onboarded, a still-processing recent day — **the pro-rata figure for
that slice is zero**, not an error and not `NULL`. This is directly
observable in the sessions datamart: on a given day, many countries
show a non-zero MAL Core/Media allocation (present everywhere) next
to an exact `0` marketing-cost allocation (present only where paid
spend actually ran that day).

That makes a pro-rata zero **ambiguous by design**: it can mean
"genuinely nothing happened here" or "no allocation rate exists for
this slice yet," and the field itself doesn't distinguish the two.
Before reading a pro-rata figure of zero as a real fact (e.g. "no
marketing cost in this market"), corroborate it against a
non-allocated signal for the same slice — sessions/clicks volume, or
Organic Core revenue, which don't carry this ambiguity.

## MAL on the most recent day: the previous day's figure, repeated

The zero above is the visible form of a missing rate. There is a second,
quieter form, and it affects **MAL only**: on the most recent day the
`revenueCurrentProRataMal` columns — `MalCore` and `MalMedia` included —
carry the *previous* day's allocation rather than a zero or an unsettled
one. The MAL network revenue report lands a day late; until it does, the
last rate available is the one applied.

Nothing about the result looks like missing data. The figure is non-zero
and plausible, and it decomposes into its Core and Media legs exactly as
it should. What gives it away is that at country grain it is identical to
the cent to the day before, while the sessions of the same slice have
moved. Verified on 2026-09-18 across every market with material traffic;
no pair of already-settled consecutive days behaves this way, so the
repetition belongs to the last day alone and resolves once the report
arrives.

For that one day, the consequences are:

- **MAL revenue is stale, not absent** — the day-before figure carried on
  a different volume of sessions. It is overstated when traffic fell and
  understated when it grew.
- Everything built on the MAL leg inherits it: Full Core revenue (see
  [data/revenue-fields.md](/data/revenue-fields.md)), the ROAS variants
  that sum a MAL leg, and `revenueCurrentProRataTotal`.
- Core revenue, marketing cost, and the GAM / Media / AFS allocations are
  **not** affected, nor are clicks, searches and sessions: they settle on
  their own schedule and move with traffic on the same day.

Read the last day's MAL, Full Core and ROAS Full Core as provisional
rather than dropping them, corroborate them against a non-allocated
signal for the same slice as with the zero above, and re-read once the
day has settled. The click-level MAL fields (`revenueCurrentMal`,
`revenueEcpcMal`) are populated on the day and can be used as a shape
check — did MAL follow traffic or not — but never as MAL revenue itself,
which is what they are not: see the three representations in
[data/revenue-fields.md](/data/revenue-fields.md).
