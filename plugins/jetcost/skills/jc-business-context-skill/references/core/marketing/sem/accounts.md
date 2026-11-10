---
type: Marketing Concept
description: "How the SEM account fleet is segregated (country, language, brand, Local vs EXT), the account and campaign naming conventions, the brands and markets covered, and the macro-regions Routes/Destinations campaigns are split by."
tags: [marketing]
timestamp: 2026-09-03T00:00:00Z
---

# SEM Account Architecture

The structure shared across platforms — campaign types, adgroup
granularity, keywords, ads, landing pages — is in
[index.md](/core/marketing/sem/index.md). This file covers how the
account fleet itself is carved up, and why it's carved up that way.

## Traffic segregation principle

The MCC holds one dedicated account per unique combination of four
variables:

- **target country** (ISO-2)
- **language**
- **brand/website** — Jetcost or a whitelabel domain
- **localization type** — Local or Extended (EXT)

One account per combination is what makes cost and revenue
attributable per market, and it's also what keeps two segments with
different economics from sharing a bid strategy. Without the split,
accounts targeting the same language would compete in each other's
auctions.

### Local vs Extended (EXT)

- **Local** — users physically in the target country.
- **EXT** — users *outside* that country who browse in the market's
  language. `FR-FR_JC_EXT_Flights` targets French-language users
  outside France.

EXT location targeting excludes the matching Local country **plus any
same-language country that has a dedicated account of its own**. That
exclusion is the whole point: without it, EXT would bid against the
Local accounts for the same users.

This is the account-side origin of the Local/Ext classification
sessions carry downstream — see
[core/marketing/index.md](/core/marketing/index.md) for the session-level
definition and [dimensions.md](/core/marketing/sem/dimensions.md) for
the dimension.

## Naming conventions

**Account**: `[PREFIX]_COUNTRY-LANG_BRAND[_EXT]_PRODUCT` — e.g.
`NEW_US-EN_JC_EXT_Flight`.

**Campaign**: `COUNTRY-LANG_PLATFORM_PRODUCT_NETWORK_BRAND_TYPE[_GEO][_LOCATION]`,
where Platform is `G`=Google / `B`=Bing, Product `F`=Flights /
`C`=Cars, Network `S`=Search / `C`=Display. So
`US-EN_G_F_S_JC_Routes_LATAM-LATAM-EXT-NEW` reads: US/EN account,
Google, Flights, Search, Jetcost brand, Routes type, South-American
origin and destination, targeting users outside the US.

### The `NEW` prefix, and why the fleet was rebuilt

`NEW` marks accounts created in the 2025/2026 account refactoring.
What it replaced was heavily fragmented — millions of keywords with
zero clicks — which kept Smart Bidding in **chronic learning**: a bid
strategy spread across that many near-zero-volume keywords never
accumulates enough conversions on any of them to optimise against.

Everything else on this page and in
[index.md](/core/marketing/sem/index.md) — aggregated adgroups,
campaigns grouped by macro-region, keyword templates with a volume
filter — exists to concentrate the conversion signal rather than
dilute it. That's the single design constraint the whole structure
answers to, and the reason the historical CPA-tier bid portfolios were
dropped in favour of geographic segmentation (see
[google-ads.md](/core/marketing/sem/google-ads.md)).

## Brands

Ten brands run on SEM. **Jetcost (JC)** is the main one, present in
40+ markets; the rest are smaller and mostly single-market.

| Brand | Code | Markets |
|---|---|---|
| Jetcost | JC | 40+ |
| Fly-scanner | FS | — |
| Rumbo | BR | — |
| Fluge-buchen | FB | DE |
| Baratos-vuelos / Baratos-voos | BV | ES, PT |
| Vol-direct / Voli-diretti | VD | FR, IT |
| omeilleursprix | OMP | FR |
| ryan-vols | RV | FR |
| airlines-flight | AF | US-EN |
| Pricenfly | PNF | UK |

## Market coverage

Coverage is not one account per country, and the exceptions matter
when reading a market's paid traffic:

- **HU, NZ, PL, RO** — no active campaigns.
- **BO, UY, VE** — covered by the EXT campaigns of the US-ES account.
- **HK, ID, IN, KR, MY, PH, SG, TH** — covered by the EXT campaigns of
  the US-EN account.
- **AT** — covered by the Local campaigns of the DE account.

The consequence for analysis: **a country's paid sessions are not
necessarily attributable to an account named after it**. A market
covered via another account's EXT campaigns has its spend and revenue
booked under that account, so a per-account read and a per-country read
of the same traffic won't line up. Slice by Country (see
[data/dimensions.md](/data/dimensions.md)) when the question is about
the market; slice by account/campaign when the question is about how
the fleet is being managed.

## Macro-regions

Routes and Destinations campaigns are grouped by the origin/destination
macro-region carried in the campaign's `GEO` field:

| Code | Area |
|---|---|
| EU | Europe |
| LATAM | South America |
| NORAM | North America (CA + US) |
| AMER | Americas (NORAM + LATAM) |
| APAC | Asia + Africa + Oceania |
| Asia | Asia + Oceania |
| Africa | Africa |
| Domestic | Origin and destination inside the account's own country |
| World-World | Residual routes with no dedicated volume |
| `[ISO]` | A specific country (e.g. `FR` = routes from/to France) |

**The grouping is a partition, not a set of overlapping filters** — an
adgroup lives in exactly one campaign and is never repeated in
another. The IT account's Domestic campaign holds IT→IT routes; its EU
campaigns hold IT→EU-excluding-IT and EU-excluding-IT→IT. Duplicating
an adgroup across two campaigns would split its conversion signal in
two, which is the same failure the refactoring was undertaken to fix.
