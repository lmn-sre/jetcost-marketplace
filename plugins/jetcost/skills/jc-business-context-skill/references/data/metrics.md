---
type: Metric Glossary
description: "Glossary of the main funnel — volumes (Sessions, Searches, Full Core Clicks, Conversions, Marketing Cost, Revenues), rates (STR, CTR, CR, Average CPC, Payoff, Gross Profit, Gross Margin), and a handful of independently-named ratios (RPMS, CPS, cpcIN...) — datamart-specific slices live in the ClickHouse semantic layer skill only."
tags: [data]
timestamp: 2026-10-21T00:00:00Z
---

# Metrics

Glossary of business metrics: what each one means, what it's
sensitive to, and its field name where that's a stable business
concept rather than a datamart-specific slice (the "declinations"
rule — those live in the ClickHouse semantic layer skill only).
Shared identically across
business, commercials, marketing, and product — see
[core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md) for
metrics specific to marketing's own bid-management levers. For how
these fit into the user journey, see
[core/business/funnel.md](/core/business/funnel.md).

## Funnel Volumes

The base counts behind every rate below. All figures are computed
over qualified sessions only (what qualification removes is
defined in [core/business/funnel.md](/core/business/funnel.md)), and every
search count excludes autosearches (see the Searches row below).
Any of these can be sliced by deal type, placement, product, or
channel — those slices are datamart-specific implementations of the
same metric, not separate concepts, and live in the ClickHouse
semantic layer skill only (the "declinations" rule).

| Metric | Field | Description |
|---|---|---|
| Sessions | `sessions` | Qualified sessions, paid + non-paid. See [data/sessions-and-users.md](/data/sessions-and-users.md). |
| Searches | `searches` | Searches the user actually submitted. Searches triggered automatically — *autosearches* — are not user demand and are excluded from every search count, and so from STR, CTR and RPMSr. The two biggest sources are the result page re-running a search on its own to refresh prices after the user has sat idle on it, and batch searches Jetcost launches server-side to fetch prices. The share excluded is neither small nor stable over time, so a figure that includes them is not comparable with one that doesn't — see [data/query-caveats.md](/data/query-caveats.md). |
| Full Core Clicks | `clicksFullCore` | Clicks on Organic Core + MAL Core — the subtotal every rate below (CTR, Mix, Average CPC) is actually computed on. Distinct from `clicksCore` (Organic Core only) and from "Core" used as a macro-category word (the Organic Core + MAL Core revenue grouping in [revenue-streams.md](/core/business/revenue-streams.md) — same set, different word for a different context). |
| Conversions | `conversions` | Confirmed bookings on CPA clicks, as reported by partners. |
| Marketing Cost | `costMktg` | Marketing spend attributed to the slice (paid acquisition cost). Entirely a pro-rata allocation — see [data/pro-rata-allocation.md](/data/pro-rata-allocation.md). |
| Revenues | `revenue` | Total Current revenue of the whole business — `revenueCurrentProRataTotal` on sessions: Organic Core from click-level `revenueCurrent`, MAL Core, MAL Media, Display Media and Data Monetisation from the pro-rata allocation. Organic Core + MAL Core alone is Full Core revenue (`revenueCurrentProRataFullCore`). See [data/revenue-fields.md](/data/revenue-fields.md) for how the legs are built and why `SUM(revenueCurrent)` over clicks is a different figure. Not the billing/invoicing "Actual Revenue", which lives outside ClickHouse — see the same file. |

**Clicks across all placements** (Full Core Clicks + MAL Media) is a broader, distinct concept that `agents/daily-report/db.js`'s `fetchFunnelMetrics` does not currently compute as a single total — it only computes the Full Core subtotal above. `clicksMalMedia` exists and is already summed into `revenueCurrentMalMedia`, but not into a combined click count. Getting a true grand total would mean extending that query, not a documentation fix.

**Revenues** as defined above includes Data Monetisation, matching [data/pro-rata-allocation.md](/data/pro-rata-allocation.md)'s `revenueCurrentProRataTotal`. `agents/daily-report/db.js`'s `revenue` field — the one actually posted to Slack — does not currently sum Data Monetisation into its total: that stream's pro-rata allocation is monthly-grain only (see pro-rata-allocation.md), while this query runs at daily grain. This is a known gap in that query, not a documentation error.

## STR — Search-Through Rate

Measures conversion from session to search.

```
STR = searches / sessions
```

Sensitive to landing page quality and marketing traffic
composition. A low STR typically indicates a problem
upstream of the product — marketing traffic quality,
landing page relevance, or campaign targeting — rather
than a search or results issue.

## CTR — Click-Through Rate

Measures conversion from search to click.

```
CTR = clicks / searches
```

Sensitive to search result quality, sorting logic,
partner mix, and product features like detail page.
CTR is the primary revenue lever for CPC markets.

## CR — Conversion Rate

Measures conversion from click to booking.

```
CR = bookings / clicks
```

Relevant only for CPA deals. CR is not directly
observable by Jetcost — it depends on partner
reporting. Varies significantly by partner, market,
and device. Sensitive to partner platform quality,
pricing competitiveness, and payment options.

## Mix CPC/CPA

Share of clicks monetised under each model.

```
Mix_CPC = CPC clicks / Full Core Clicks
Mix_CPA = 1 - Mix_CPC
```

Shifts in mix directly affect revenue even without
changes in total click volume. A move toward CPA
in a historically CPC market may signal a deal
renegotiation or partner set change.

## Average CPC

Average revenue earned per CPC click.

```
Average CPC = CPC revenue / CPC clicks
```

Varies by market, partner category, and route type.
Structurally higher in large-geography markets (US,
AU) due to higher average ticket values.

## Payoff

Average CPA commission per confirmed booking.

```
Payoff = CPA revenue / bookings
```

Reflects the average economic value of a booking
across all active CPA partners. Sensitive to partner
mix and average ticket value by market.

## Gross Profit

Revenue net of marketing spend.

```
Gross Profit = Revenue - Marketing Cost
```

The bottom-line profitability figure. Field: `grossProfit` (`agents/daily-report/db.js`
computes it internally, then returns it under this name — don't cite
the internal alias).

## Gross Margin

Share of revenue left after marketing spend.

```
Gross Margin = Gross Profit / Revenue
```

Expressed as a percentage, on the same revenue and Marketing Cost basis
as Gross Profit — it is Gross Profit read as a share of revenue rather
than as an amount, and the KPI market GM targets are set in.

- **Aggregate as a ratio of sums, never as an average of margins.**
  The margin of a month, a market cluster or the whole business is
  total Gross Profit over total Revenue for that perimeter; averaging
  daily or per-market margins weights a low-revenue day or market as
  much as a high-revenue one and gives a different, wrong number.
- **Changes are read in percentage points (pp)**, not as a percent
  change of the margin itself: 40% → 42% is +2 pp.
- **Not defined when revenue is zero**, and it can go negative when
  marketing spend exceeds revenue.

Semantic layer metric: `grossMarginProRata` (sessions datamart).

---

## Other Independent Metrics

Metrics with their own stable business meaning, distinct from a
slice of the volumes/rates above — the test: would this still be the
same concept if a different datamart computed it a different way? If
yes, it belongs here. If the question doesn't make sense because the
field *is* one datamart's specific implementation of a metric already
named above (e.g. revenue split by deal type, clicks split by
placement), it's a declination and lives in the ClickHouse semantic
layer skill only, not here.

- **RPMS** = `revenue * 1000 / sessions` — Revenue Per Mille Sessions.
  Monetisation efficiency per 1,000 sessions, comparable across
  markets/periods with different traffic volume. **`RPMS` always means
  per-session** unless explicitly suffixed with `r`.
- **RPMSr** = `revenue * 1000 / searches` — Revenue Per Mille
  Searches, the search-based variant of RPMS. Not interchangeable with
  RPMS: a session can contain multiple searches, so the two move
  differently as search intensity shifts.
- **CPMS** = `costMktg * 1000 / sessions` — Cost Per Mille Sessions,
  the cost-side counterpart of RPMS.
- **CPS** = cost per paid session — marketing spend efficiency on the
  paid-traffic cohort specifically.
- **eCPC (blended)** = `revenue / clicks` (`clicks` here is Full
  Core Clicks) — average revenue per click blended across CPC and
  CPA economics. Distinct from Average CPC (CPC deals only): this
  mixes both deal types into one figure. Use for a single "average
  click value"; split by deal type when that breakdown matters. Same
  "revenue per outbound click" concept marketing calls **RPA** for
  the SEM channel — see [core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md).
- **`cpcIN`** — average inbound cost per click paid on Google Ads
  (cost on Google Ads / clicks on Google Ads). Distinct from Average
  CPC (revenue earned per *outbound* click to a partner) — `cpcIN` is
  what Jetcost pays for acquisition, not what it earns. One of the
  base metrics behind marketing's SEM bid-management levers — see
  [core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md).
