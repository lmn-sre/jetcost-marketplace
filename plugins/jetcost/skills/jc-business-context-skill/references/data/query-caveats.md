---
type: Query Caveat
description: "Gotchas that silently skew a query or analysis: the CPA conversion reporting lag, the MAL pro-rata figure that repeats the previous day on the most recent day, the Dynamic Package active window, the UK/GB country-code split, which app marketing-cost zeros are real, search counts that include autosearches, the campaign field being populated for traffic that came from no campaign, and A/B test slices that vanish while the test is off."
tags: [data]
timestamp: 2026-10-22T00:00:00Z
---

# Query Caveats

## Overview

Gotchas that make a query or an analysis silently wrong — not because a
metric is misunderstood, but because of *when* the underlying data becomes
complete, because a product only existed for part of the timeline, or
because two fields that look interchangeable use different code spaces.
Read this before comparing recent periods against older ones, before
reading a per-product series, before joining/filtering on country,
before quoting a search count, before using the campaign field to
tell paid traffic from the rest, or before reading a series filtered
down to a single A/B test.

## CPA Conversion Reporting Lag

CPA conversions are reported by partners with a delay — they are not fully
in by the time a recent day's data is queried. In practice, the most
recent 1-2 days of data are **not yet finalized** for CPA-dependent
metrics.

Concretely, for a recent, not-yet-finalized day:

- **CR** (see [data/metrics.md](/data/metrics.md)) is **underestimated** — some
  conversions haven't landed yet.
- **Payoff** is **overestimated** — same numerator issue, inverted
  by the ratio.
- A reference period that is a full week or more old is already
  finalized and not affected by this lag.

**Do not use CR, Payoff, or their deltas as evidence of a real
change** when one side of the comparison is a recent, not-yet-finalized
day — treat any swing in these two metrics as a reporting-lag artifact,
not a signal. Explain variation using volume/funnel metrics (sessions,
STR, CTR, Mix) and `coreRevenue`/`mediaRevenue` instead, which don't
carry this lag.

This is the short, universal version of the lag. Some partners
(`LMNNEXT`, `DOHOP`, `KIWI`, `KAYAK`) suffer a longer, partner-specific
version of the same mechanism — see
[config/partners/index.md](/config/partners/index.md#known-cpa-lag-partners) and
[data/revenue-fields.md](/data/revenue-fields.md) for how `revenueCurrent` is filled
while a booking report is outstanding.

## MAL Pro-Rata Repeats the Previous Day on the Most Recent Day

On the sessions datamart, the `revenueCurrentProRataMal*` columns carry
the **previous day's** allocation on the most recent day, because the MAL
network revenue report lands a day late. The mechanism, and the evidence
it rests on, are in
[data/pro-rata-allocation.md](/data/pro-rata-allocation.md).

The figure is non-zero and plausible, so nothing in the data signals it.
Its consequence is that **the last day's MAL revenue, Full Core revenue
and ROAS Full Core are stale rather than missing** — overstated when
traffic fell that day, understated when it grew. Core revenue, marketing
cost and the non-MAL pro-rata streams do not carry this.

Do not exclude the day: read those figures as provisional, corroborate
them against sessions or clicks volume for the same slice, and re-read
once the day has settled. Unlike the CPA lag above, this one does not
fade over a couple of days — it flips to the settled value in one step.

## Dynamic Package: Active Window Only

Dynamic Package (`product = 'DP'` in the datamarts) was a live product
**only between 2023-07-19 and 2025-09-30**. There is no DP data before or
after that window, while `FLIGHT` and `CAR` run to date. Total volume over
the whole window is small — ~58.5k searches.

**A DP metric reading zero for a recent period is expected, not a drop.**
Do not report it as an anomaly and do not investigate it as one. A DP time
series is only meaningful inside the active window, and any period
straddling 2025-09-30 mixes active and inactive months — which will look
like a collapse and isn't.

Note also that the `destinationCountry` column, which looks like it should
carry the DP destination, is **always NULL** — a placeholder that was never
wired, empty even on DP rows. DP origin/destination live in `countryFrom` /
`countryTo`, like flights. Enforced as `R016` in
`skills/jc_clickhouse_semantic_layer_skill/query-rules.yml`.

## UK / GB Country-Code Split

The United Kingdom is the one market where two families of fields use two
different codes for the same country. Verified on 2026-08-11 across
`jc_sessions_datamart`, `jc_searches_datamart`, `jc_clicks_datamart`,
`jc_impressions_datamart` and `jc_users_datamart`:

- **Market/user fields use `UK`** — `country`, `countryUser`,
  `firstSessionCountry`, `firstSessionCountryUser`, and every
  `appOpening*Country` / `appOpening*CountryUser` variant. These are the
  market/site and the user's geo-IP country. Every other market on these
  fields is a standard ISO 3166-1 alpha-2 code (`IT`, `ES`, `FR`, `US`,
  ...) — `UK` is the single non-ISO exception.
- **Route and car-geography fields use `GB`**, the actual ISO code —
  `countryFrom`, `countryTo`, `pickupCountry`, `dropoffCountry`.

The split is **per field, not per row**: no field was found to contain
both codes, so a given column is always entirely in one code space.

**Filtering or joining across the two families on the same literal
breaks silently for the UK specifically** — `countryFrom = 'UK'` and
`country = 'GB'` both return zero rows, and `country = countryFrom`
never matches for a UK query even when it should. When a query touches
both families, normalise explicitly, e.g.
`if(country = 'UK', 'GB', country) = countryFrom`.

Two consequences worth stating separately, because they are easy to miss:

- Anything **derived from a route field inherits `GB`**. A country-level
  route reads `GB-IT`, never `UK-IT`, and sub-region lookups keyed on
  `countryFrom` / `countryTo` resolve from `GB`.
- Comparing two **market/user** fields needs **no** normalisation —
  both sides already use `UK`. Normalising `countryUser` from `GB` is
  dead code: that field never holds `GB`.

The split described above is a property of the **datamarts**. The
operation logs (`mcp_utils.jc_operation_logs_data` and its summary table,
see [data/operation-log-classification.md](/data/operation-log-classification.md))
deliberately do **not** follow it: their `country` / `countries` columns are
ISO throughout, so the UK market is `GB` there. That table is recent enough
not to have had to inherit the anomaly, and most of its sources were
already writing `GB`; the import normalises the rest on write. The practical
consequence is that **joining the operation logs to a datamart on market
needs the datamart side normalised** — `if(country = 'UK', 'GB', country)`
— and that asking the logs for `country = 'UK'` returns nothing.

See [core/business/markets.md](/core/business/markets.md) for the
business-facing "UK" naming this stems from. The rule is enforced for
agents and analysts as `R015` in
`skills/jc_clickhouse_semantic_layer_skill/query-rules.yml`, and for the
operation logs in `skills/jc_operation_logs_skill/SKILL.md`.

## App Marketing Cost — Which Zeros Are Real

Marketing Cost (`costProRataMktg`, and the `clicksProRataGAds` /
`impressionsProRataGAds` / `costProRataGAds` it's built from — see
[data/pro-rata-allocation.md](/data/pro-rata-allocation.md)) reads
`0` on app sessions (`platform IN ('android', 'ios')`) with two
exceptions: app-install campaigns from 2026-09-07, and OIA campaigns,
whose Google Ads cost has been shared between web and app sessions
since the October 2026 restatement (history back to 2023-01). Before
those two changes web absorbed 100% of `costProRataMktg` and
`clicksProRataGAds`, and app read exactly `0` on both.

This is a **different kind of zero** from the generic "no allocation
rate configured for this slice" zero described in
[data/pro-rata-allocation.md](/data/pro-rata-allocation.md)'s "How it
falls back" section — that one is ambiguous and slice-specific. This
one is not ambiguous, but it is also not one single fact. App sessions
of paid campaigns fall into three cases, with three different
verdicts — one correct zero, one fixed, one transitional. Do not treat
them as variants of the same convention:

- **Web-to-app (W2A) installs/reopens** — correct zero, nothing to
  fix. The web click ID (`gclid`) propagates from the web session into
  the app session, but at cost-attribution time the app touchpoint is
  excluded: its share of the campaign's cost stays entirely on the web
  session that produced it. The web session absorbed the cost it is
  due; the app session continues the same journey. **Exception**: when
  the campaign is an OIA one (next case), its W2A app sessions share
  the cost like its other app sessions, because the allocation cannot
  tell a W2A continuation from a direct open. They take about a
  quarter of the OIA cost that lands on app in 2026, and 40-50% in
  2023-2025.
- **OIA (open-in-app) reopens** — fixed for Google Ads. OIA campaigns
  (the campaign registry's OIA flag) send a mobile user who already
  has the app straight into it (see
  [config/features/mobile-app-oia.md](/config/features/mobile-app-oia.md)),
  often with no web session in the journey at all. Until
  the October 2026 restatement their cost was allocated only across
  their **web** sessions: a campaign spending 100 with 50 web and 50
  app sessions put 2/session on web and nothing on app, so web
  materially carried the cost of acquisitions that landed in app. Now
  the campaign's cost is spread over its web and app sessions with the
  same cost per session. App takes 3-5% of OIA Google Ads cost from
  2023-07 onwards, and under 1% before, when app sessions rarely
  carried the campaign. SA360 (Bing) OIA app sessions still read `0`;
  they are under 0.1% of Bing OIA sessions. Clicks, impressions and
  conversions pro-rata follow the same split, so
  `conversionsProRataGAds` on an OIA app session is an allocation by
  sessions, not the conversions Google measured in the app.
- **App-install campaigns** — transitional zero, resolved from
  2026-09-07. Paid installs bought on the app stores allocate their
  cost onto the app session itself (the first open), pro-rata like
  every other stream. Before 2026-09-07 these campaigns were not
  correctly tracked and their cost read zero like the other two cases;
  from 2026-09-07 app-install cost on app sessions is real and must
  not be filtered out. A recent day can still read `0` from the
  ordinary processing lag described in the "How it falls back" section
  referenced above — check that before concluding the cost isn't
  there.

**Practical effect**: do not read `costProRataMktg = 0` on an app
session as "no spend drove this session". For W2A sessions of a
non-OIA campaign it means the cost sits on the web session that
produced them. For OIA campaigns the app sessions now carry their
share of Google Ads cost, so a web vs app split of their cost per
session or ROAS is meaningful.

Consequence for ROAS: the all-platform read is still the one closest
to what Google's bidding optimises against, since it already counts
`ios-core-sgtm` / `android-core-sgtm` among its conversion signals
(see [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md)).
A web-only read no longer carries the app share of OIA cost, so it is
consistent. But it leaves out the app revenue those campaigns bought.

The campaign-level traffic datamart and the overall datamart built on
it (`meta_traffic_datamart`, `meta_overall_datamart`) apply the same
split to OIA Google Ads cost, clicks and impressions since the October
2026 restatement: same app share as the session datamart, then divided
between android and ios by GA sessions. Their conversions are not
split: Google's own web vs app attribution is kept, with
`android-core-sgtm` / `ios-core-sgtm` on app (labelled web desktop from
2025-08-17 until the October 2026 fix), while `conversionsGAds`, which
Google reports without a platform, stays on web.

## Search Counts Include Autosearches Unless Excluded

An **autosearch** is a search triggered by the platform rather than by the
user — mostly the result page refreshing its own prices after a spell of
inactivity, and batch searches launched server-side. See
[data/metrics.md](/data/metrics.md) for why they are not counted as user
demand.

The exclusion is **not applied uniformly across the datamarts**, and this
is what makes it a trap rather than a definition:

- **Session-based search counts already exclude autosearches.** They are
  filtered out upstream, when the sessions datamart is built, so STR, CTR
  and anything else derived from them is autosearch-free with nothing to
  add.
- **Search-level counts do not**, until the `automaticSearch` flag is used
  to exclude them.

**So the same period returns two different search totals depending on
where it was counted**, and the unfiltered one is the higher of the two —
by 5.9-7.1% over 2026-04 → 2026-08. A searches figure quoted without the
exclusion will therefore contradict the STR and CTR published for the same
period, with no error anywhere to signal it.

The share excluded is also **not stable over time**: 6-9% of searches from
2025 through 2026-03, ~24% in April and May 2026, back to 6-7% since July.
A period-over-period comparison where only one side is filtered is
meaningless, and a swing of that size is large enough to look like a real
trend on its own.

Enforced for agents and analysts as `R018` in
`skills/jc_clickhouse_semantic_layer_skill/query-rules.yml`, which also
carries the field-level traps (which flag to filter on, and why the same
filter must not be copied to clicks).

## The Campaign Field Is Populated Even When There Was No Campaign

One mechanism, two traps. Every session carries a campaign value:
traffic that arrived from no campaign at all — direct, referral
(AI assistants included), organic — is assigned a **virtual campaign** so that it still resolves
against the campaign registry and keeps all its derived dimensions.
See
[core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md)
for the mechanism and why it exists.

**Trap 1 — a populated campaign is not paid traffic.** Filtering on
"campaign is not null" (or on the campaign field being non-empty)
selects essentially *all* traffic, not the paid subset. To isolate
paid, use Traffic Type (`*PaidVsNotPaid`, see
[data/dimensions.md](/data/dimensions.md)). This is the kind of filter
that produces a plausible-looking number rather than an error: paid
metrics computed this way silently include organic and direct sessions.

**Trap 2 — per-campaign cost doesn't sum to total cost.** When traffic
is known to be paid Google search but its specific campaign can't be
identified, its cost lands on a **not-found virtual campaign**. That
spend is real and present in the totals while belonging to no campaign
anyone actually bought, so a "spend by campaign" breakdown and the
account-level total will disagree by that amount.

Don't close the gap by rescaling the named campaigns — the residual is
information, not noise: it's the share of spend attribution couldn't
resolve. It is expected to stay small, and alerts exist for when it
doesn't, so a growing gap is a defect to report rather than a bucket to
analyse.

**A campaign can go live before it is onboarded.** The registry is filled
by hand, and nothing ties that to the moment a campaign is activated on
Google Ads. A campaign that goes live first has nothing to resolve
against, so its spend lands on the not-found campaign for as long as that
stays true — zero if the entry was created first, open-ended if it wasn't.
There is no interval to wait out and no lag to correct for.

The spend is never reattributed once the entry appears: the campaign value
is resolved when the row is built and stays on it. So a window containing
those days is permanently short by that amount, not short until someone
catches up.

What this means when reading a breakdown: an isolated not-found spike
followed the next day by campaigns that weren't there before is a launch
that ran ahead of its registry entry, not an attribution defect — check
what appears the day after before escalating it. It is still spend that
will never be attributed to anything, so it is a sequencing problem to fix
upstream (register, then activate), not a reading convention to absorb.

## An A/B Test Slice Only Exists While the Test Is On

Sessions exposed to an A/B test carry the test on `abTestId`, and
sessions outside it carry none — so a test's slice is built by
filtering on that field. See
[core/product/abtests.md](/core/product/abtests.md) for what a test
is and how its perimeter is defined.

A test is switched on and off while live, and each switch is
recorded in the operation logs as a product lever (see
[core/product/levers.md](/core/product/levers.md)). That produces
two artifacts in the series, both of which read as broken data and
are not:

- **Days the test was off return no rows at all.** An empty or
  missing day in a test slice is indistinguishable, from the slice
  alone, from a day that failed to load — and the pipeline
  explanation is almost always the wrong one. Check the test's
  on/off history before concluding anything about the data.
- **The first and last day of each active stretch are partial.** A
  test switched on at midday contributes roughly half its usual
  exposure that day. Those days are not comparable with the full
  days around them and should be excluded from any before/after
  reading, not explained.

**Read a test slice as a share of its perimeter, never in
absolute terms.** The number of sessions in a test moves with total
traffic — weekday, seasonality, a marketing push — so a slice that
fell day over day says nothing on its own. Run the same query
without the test filter and compare the share: a stable share means
the test is running normally and the movement is the market's, while
a share that shifted is the thing worth investigating. This single
check separates a paused test, a rescoped test and a real data
problem from ordinary traffic variation, and costs one query.
