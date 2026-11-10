---
type: Metric Glossary
description: "SEM-specific bid-management metrics: ROAS, GP per channel, CPA mktg, RPA, and how a tCPA target is derived from a ROAS objective."
tags: [marketing]
timestamp: 2026-09-03T00:00:00Z
---

# SEM Metrics

Metrics specific to marketing's own bid-management levers on SEM (see
[google-ads.md](/core/marketing/sem/google-ads.md) for the levers themselves). These build on the
cross-functional metrics in [data/metrics.md](/data/metrics.md) — read that first.

Design principle from the SEM dashboard spec: every metric below should
be available both **paid-only** (SEM channel scoped) and **total**
(whole business), so the two can be compared directly — e.g. ROAS on
SEM vs ROAS overall — to gauge how much the channel's performance is
moving the total.

## ROAS — Return on Ad Spend

```
ROAS = Revenue / Costi (marketing spend)
```

Google Ads' own bid strategies target a ROAS goal directly (e.g.
Competitors campaigns target ROAS 100% — see [google-ads.md](/core/marketing/sem/google-ads.md)).

Confirmed revenue/cost base, as wired into `agents/daily-report` (labeled
"META ROAS" there, to read side by side with SEM ROAS):

```
META ROAS = revenue / costMktg * 100   -- unscoped, whole business
SEM ROAS  = revenue / costMktg * 100   -- scoped to the paid-search
                                           cohort (lastClickNotDirectCampaignChannelGroup
                                           = 'paid-search', see data/attribution.md)
```

Both use the same `revenue`/`costMktg` fields from
[data/metrics.md](/data/metrics.md) — SEM ROAS is exactly the paid-only
read the design principle above calls for, computed by scoping the same
funnel query (`agents/daily-report/db.js`'s `fetchSemRevenue`, a
paid-search-scoped counterpart to `fetchFunnelMetrics`) instead of removing
the scoping filter entirely.

### Two ROAS numerators — whole-business vs Full Core

The `revenue` above is whole-business: Core + MAL (Core and Media) +
Display Media + Data Monetisation, all pro-rata allocated onto the
session (see [data/pro-rata-allocation.md](/data/pro-rata-allocation.md)). See
[data/metrics.md](/data/metrics.md) for a known gap where
`agents/daily-report/db.js`'s `revenue` field — the one actually
posted to Slack — doesn't yet include Data Monetisation in this
total. That's the right
numerator for a volume/GP call — "is this channel worth the spend,
everything counted" — but the wrong one for judging **bid
calibration**: Google Ads' own bid strategies (the ones targeting a
ROAS goal directly, above) only ever see Core Click Signals and MAL
Core Click Signals as conversions (see
[google-ads.md](/core/marketing/sem/google-ads.md)'s Conversion
Signals) — never Display Media or Data Monetisation. A whole-business
ROAS can look strong purely on Media revenue the bidding algorithm
never optimised for and has no way to act on, which reads as "bidding
is working" when it isn't.

For a bid-calibration read, use **ROAS Pro Rata - Full Core**
(`skills/jc_clickhouse_semantic_layer_skill/computed.yml`): numerator
Core + MAL Core only, same `costProRataMktg` denominator. The gap
between the two is not a rounding effect — on paid-search
2026-07-17→2026-08-15, desktop reads 115.7% whole-business vs 88.5%
Full Core, mobile 94.2% vs 81.6%. On FR specifically it's not just a
smaller number but a different verdict: desktop's own read crosses the
100% ROAS bid-strategy target (above, "Bid Strategies") in opposite
directions depending on which numerator is used — 130% whole-business
(above target, "bidding looks fine") vs 85% Full Core (below target,
"bidding is under-delivering"). Default to whole-business for
volume/GP; switch to Full Core whenever the question is about how well
bidding itself is calibrated.

One field-naming trap worth flagging explicitly: MAL Core revenue is
`revenueCurrentMalCore` as a direct column on searches/clicks, but only
`revenueCurrentProRataMalCore` (the pro-rata version) exists on
sessions — the datamart this ROAS family is computed from. Using the
non-pro-rata name on sessions is a silent error, not a query failure.

## From a ROAS objective to a tCPA target

The lever is a tCPA (see [levers.md](/core/marketing/sem/levers.md)),
but the objective is expressed as a ROAS. Converting one into the other
is two steps:

1. **Unit revenue** = current CPA mktg × current ROAS — the CPA that
   would put the campaign at exactly 100% ROAS.
2. **Target CPA** = unit revenue / target ROAS.

| Scenario | Formula | Worked example |
|---|---|---|
| Unit revenue | current CPA × current ROAS | €0.09 × 117% = €0.1053 |
| tCPA at ROAS 80% | unit revenue / 0.80 | €0.1053 / 0.80 = €0.1361 — pay more per clickout, accept less ROAS, buy volume |
| tCPA at ROAS 100% | unit revenue / 1.00 | €0.1053 — break-even |
| tCPA at ROAS 140% | unit revenue / 1.40 | €0.1053 / 1.40 = €0.0752 — pay less per clickout, more margin |

The CPA in that formula is **CPA mktg** (cost per clickout, below), not
the commercial CPA deal model, and ROAS is in the percentage form used
throughout this file where 100% is break-even.

Which ROAS goes in matters as much as the arithmetic: when the point of
the change is **bid calibration**, feed in the Full Core read rather
than the whole-business one (see the two-numerators section above).
Google's bidder only ever sees Core and MAL Core conversions, so a
target derived from a ROAS inflated by Media revenue asks it for
something it has no way to deliver.

## GP — Gross Profit (per channel)

Same concept as `grossProfit` in [data/metrics.md](/data/metrics.md)
(`revenue - costMktg`), scoped to a single channel (e.g.
SEM only) instead of the whole business.

## CPA mktg — Cost per Acquisition

```
CPA mktg = Costi (marketing spend) / Clickout
```

**Not the same thing as the CPA commercial deal model** in
[core/commercials/cpa-model.md](/core/commercials/cpa-model.md). Here "acquisition" means an outbound
clickout (the funnel event also used as the denominator for `ecpc` in
[data/metrics.md](/data/metrics.md)), not a confirmed booking — CPA mktg is a
cost-efficiency metric on the marketing spend side, unrelated to how a
partner deal is priced. Always qualify as "CPA mktg" in domain docs and
conversation to avoid the collision.

This is also the basis for the **Target CPA (tCPA)** bidding lever —
see [google-ads.md](/core/marketing/sem/google-ads.md).

## RPA — Revenue per Acquisition

```
RPA = Revenue / Clickout
```

Average revenue earned per clickout — the SEM-channel-scoped read of
the same "revenue per outbound click" concept as `ecpc` in
[data/metrics.md](/data/metrics.md). Paired with CPA mktg to read the unit economics of a
campaign: ROAS-per-click, essentially.

*Note: the "(eCPC)" the source material parenthesised next to RPA was
not, as previously suspected here, a mislabel for Google's Enhanced CPC
bid strategy — it meant eCPC in Jetcost's own sense, revenue per
outbound click, which is exactly what RPA is with the scope narrowed to
the SEM channel. Be careful with the word regardless: it now carries
three distinct meanings at Jetcost, listed in
[google-ads.md](/core/marketing/sem/google-ads.md).*

## Per-session and per-GAds-click ratios

The SEM dashboard also reads these metrics per session and per
Google-Ads-reported click — cost per session, revenue per session, cost
per Core clickout, revenue per GAds click, and so on. Those are shared
metrics under a different denominator rather than SEM-owned concepts,
so they aren't defined here: compose them in
`skills/jc_clickhouse_semantic_layer_skill` as needed.

One thing to keep straight when you do. CTR, Avg CPC and CR are
computed from Google Ads' own reported clicks and impressions, while
revenue and Core clickouts come from ClickHouse. A ratio that mixes the
two — revenue per GAds click being the clearest case — deliberately
pairs a platform-side count with Jetcost's real revenue. That's the
point of it, and it's also why it can't be reconciled against either a
purely platform-side or a purely ClickHouse-side figure.
