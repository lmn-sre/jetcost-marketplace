# Data & Measurement Overview

## Overview

This is the shared measurement layer: vocabulary and conventions used
identically across business, commercials, marketing, and product — not
owned by any single function. If a concept here changes, it changes once,
for everyone; that's why it lives here instead of inside a functional
folder. See [core/index.md](/core/index.md) for how this fits into the rest of
`core/`.

## Metrics Index

The main funnel lives here; a function's own metrics live in that
function's `metrics.md` instead.

| Metric | Owner |
|---|---|
| Sessions, Searches, Full Core Clicks, Conversions, Marketing Cost, Revenues | [data/metrics.md](/data/metrics.md) |
| STR, CTR, CR, Mix CPC/CPA, Average CPC, Payoff | [data/metrics.md](/data/metrics.md) |
| Gross Profit, Gross Margin | [data/metrics.md](/data/metrics.md) |
| ROAS, GP, CPA mktg, RPA (SEM bid-management) | [core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md) |
| First Opens, ARPU, Return sessions (app install cohorts) | [core/product/metrics.md](/core/product/metrics.md) |

## Dimensions Index

Same ownership split as metrics: shared breakdown dimensions live
here; a function's own dimension/taxonomy lives in that function's
own concept file instead (e.g.
[core/business/markets.md](/core/business/markets.md),
[core/commercials/integration-types.md](/core/commercials/integration-types.md)).

| Dimension | Owner |
|---|---|
| Business Profile, Website Type, Website | [data/dimensions.md](/data/dimensions.md) |
| Country, Device, Context (web vs app), Platform (OS), Traffic Type | [data/dimensions.md](/data/dimensions.md) |
| Session, User, Marketing Session | [data/sessions-and-users.md](/data/sessions-and-users.md) |
| Attribution model | [data/attribution.md](/data/attribution.md) |
| Consents (GDPR purposes and the internally collected ones) | [data/consents.md](/data/consents.md) |
| Campaign, Campaign Type, Source, Local vs Ext, Bidding Strategy (SEM) | [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md) |

## Files

- [data/metrics.md](/data/metrics.md) — glossary of the main funnel: volumes and
  rates, plus the raw ClickHouse field reference.
- [data/dimensions.md](/data/dimensions.md) — the common breakdown dimensions
  (Business Profile/Website Type/Website, Country, Device, Context,
  Platform, Traffic Type), their raw field names, and how they combine
  (e.g. app + tablet, websiteType as a refinement of Context, Platform
  as a refinement of Context — `context` and `platform` are two fields,
  and only one of them has an `app` value).
- [data/attribution.md](/data/attribution.md) — the three attribution models and which
  one is the default.
- [data/consents.md](/data/consents.md) — the seven consents a session can
  carry: the four GDPR purposes collected through Iubenda (technical,
  marketing, third-party data transfer, measurement) and the three
  collected outside it (geolocation and system tracking on app, push
  notifications on both), why all seven are spelled with an `iubenda`
  prefix anyway, why a consent with nothing recorded must not be
  counted as a refused one, and what a refused one removes from the
  web-to-app handoff.
- [data/revenue-fields.md](/data/revenue-fields.md) — what `revenueCurrent`, `revenueEcpc`,
  and `revenueOperational` each measure at the click level and why
  they diverge (CPA lag fill, min_cpc floor estimate, negative-margin
  flooring); how `data/metrics.md`'s funnel-level `revenue` rolls up
  from `revenueCurrent`; why MAL revenue has three representations that
  don't reconcile, and why on a MAL click `revenueCurrent` is the bid
  rather than a consolidated figure; and why "Actual Revenue" is billing
  data outside ClickHouse entirely, not a fourth datamart field.
- [data/pro-rata-allocation.md](/data/pro-rata-allocation.md) — why MAL
  Core/Media, Display Media, Data Monetisation revenue, and all
  marketing cost are allocated to sessions rather than measured
  directly, which dimensions each allocation is safe to slice by, and
  why an allocated figure of zero is ambiguous.
- [data/seasonality.md](/data/seasonality.md) — annual and weekly traffic patterns, and
  how they affect WoW/YoY reads.
- [data/sessions-and-users.md](/data/sessions-and-users.md) — Session vs User vs Marketing
  Session, and where each applies; the two rules that close a session on
  both platforms (30 min inactivity, midnight `Europe/Paris`), and how
  web and app each enforce them — server-side per page view on web,
  client-side and checked at a few moments on app, which is also where
  the per-market scoping lives.
- [data/analysis-types.md](/data/analysis-types.md) — standard comparison periods (WoW,
  WTD, MoM, MTD) used across all teams, plus the fixed cohort-age
  windows (D15 → M18) used when the subject is a cohort.
- [data/sources.md](/data/sources.md) — the three ingestion paths that fill
  ClickHouse (Galera imported nightly by `maid`, Argo realtime events via
  Kafka, third-party vendor APIs on cron), and what each implies about
  freshness, the trailing edge, whether a past day can still change, and
  why reference attributes carry no history.
- [data/query-caveats.md](/data/query-caveats.md) — gotchas that silently skew a query, starting
  with the CPA conversion reporting lag.
- [data/operation-log-classification.md](/data/operation-log-classification.md) — how an
  operation-log row is classified by business meaning: where each
  department's levers are documented, and why `unknown` (the machine
  couldn't classify it) and `manual-entry` (a person declared there's
  nothing to classify) must never be collapsed.
