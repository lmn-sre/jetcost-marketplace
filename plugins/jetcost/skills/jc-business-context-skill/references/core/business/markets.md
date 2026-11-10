---
type: Business Concept
description: "Describes the country-language market tuples Jetcost operates, how they differ from user geography and campaign targeting, and how deal structure, ticket value, and traffic patterns vary across markets."
tags: [business]
timestamp: 2026-10-14T00:00:00Z
---

# Markets

## Overview

Jetcost operates across multiple geographic markets. Each
market has distinct characteristics that affect deal
structure, revenue potential, user behaviour, and
strategic priorities. Understanding market differences
is essential for interpreting metrics and making
commercial decisions.

## The Market Tuple: Country + Language

A market is a **country-language tuple**, not a country. The
country alone does not determine the language: two countries
are served in two languages each, and in both the second
language is a near-half of the market rather than a tail.

This is the granularity the business already operates at
everywhere else: SEM holds one account per country-language
combination (`US-EN`, `US-ES`, `CA-FR` — see
[core/marketing/sem/accounts.md](/core/marketing/sem/accounts.md)),
and feature configuration can be scoped by language
independently of country (see
[core/product/features.md](/core/product/features.md)).

The tuple is **not** a separate website. A single website
serves both locales of a split market, and `website` is an
orthogonal dimension — many brands and domains exist per
tuple (see [core/business/overview.md](/core/business/overview.md)
for the white-label layer).

### Tuples in operation

| Country | Language(s) |
|---|---|
| AR | es |
| AT | de |
| AU | en |
| BO | es |
| BR | pt |
| **CA** | **en, fr** |
| CL | es |
| CO | es |
| DE | de |
| DK | da |
| ES | es |
| FI | fi |
| FR | fr |
| HK | en |
| HU | hu |
| ID | en |
| IE | en |
| IN | en |
| IT | it |
| KR | ko |
| MX | es |
| MY | en |
| NL | nl |
| NO | nb |
| NZ | en |
| PE | es |
| PH | en |
| PL | pl |
| PT | pt |
| RO | ro |
| SE | sv |
| SG | en |
| TH | en |
| UK | en |
| **US** | **en, es** |
| UY | es |
| VE | es |
| ZA | en |

38 countries, 40 tuples, 15 languages. **RU (`ru`) was a
market until 2026-07-06** and carries no traffic after that
date — a query spanning that boundary will show it appearing
and stopping, which is a decommissioning, not a data gap.

**KR is a web-only market.** The app is not available there: the
expected return did not justify the cost of launching and running it.
KR app traffic is therefore absent by design, not missing, and a
web-vs-app split or an app breakdown across markets will show KR with
no app side at all.

Five languages span more than one market — `en` (13), `es`
(9), `pt` (2), `de` (2), `fr` (2). That overlap is what
makes EXT campaign targeting need explicit exclusions: an
EXT account bidding on a language would otherwise compete
with the Local accounts of every other market sharing it.

### The two split markets

| Market | Split | Minority share |
|---|---|---|
| US | `en` / `es` | `es` ≈ 41% |
| CA | `en` / `fr` | `fr` ≈ 48% |

In both, the two halves have materially different paid
economics — the ROAS gap between them runs to tens of
percentage points, in both cases with the *smaller* half
performing better, while ARPU is nearly identical. The
difference sits on the cost side, not the revenue side.

The consequence: **grouping US or CA by country alone
averages two segments that should be read apart**, and hides
the better-performing one. This is why SEM keeps them as
separate accounts. Note also that CA appears among the
Anglo-Saxon CPC markets below, which is only true of its
English half.

## Three Different "Country" Notions

Three distinct things get called country, and they answer
different questions. Confusing them is the most common way
a market read goes wrong.

- **Market** (`country`) — the market whose site the session
  is on, the first element of the tuple above. This is what
  "market" means throughout this bundle.
- **User geography** (`countryUser`) — where the user
  physically is, from geo-IP. **Routinely different from the
  market**: a large minority of sessions overall sit on a
  market's site from outside that country. France is the
  clearest case — a substantial share of FR-market sessions
  come from Morocco, Belgium, Tunisia, Algeria and
  francophone West Africa, which is the diaspora pattern
  described below, not noise.
- **Campaign target** (`*CountryDetail`, and the
  `*CountryCluster` grouping built from it) — the
  country-language the *campaign* was set up to target, per
  attribution scope. This is a property of the campaign, not
  of the user or of the market: because EXT campaigns
  deliberately buy users outside the target market, one
  `CountryDetail` value spreads across many markets and many
  user countries. It also carries values that are **not
  Jetcost markets at all** — EXT targets like Belgium,
  Switzerland, Morocco, or a Turkish-language German
  campaign — so it cannot be used as a market list.
  The cluster follows the campaign target only for real
  campaigns: for the virtual campaigns of non-campaign
  traffic it is built from the market instead.

None of the three can substitute for another. Use the market
for "how is this market doing", user geography for "where
are these people", and the campaign target only for "how is
the campaign fleet set up". See
[core/marketing/sem/accounts.md](/core/marketing/sem/accounts.md)
for why a per-account and a per-market read of the same
traffic disagree, and
[core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md)
for the Country Cluster dimension.

## Deal Structure by Market

The monetisation model varies significantly by geography:

- **Anglo-Saxon markets** (UK, US, AU, CA): predominantly
  CPC. Partners in these markets are accustomed to
  paying per click, and CPA deals are less common.
  CPC rates tend to be higher due to market maturity
  and competition.

- **Continental European and other markets** (IT, ES, FR,
  DE and others): higher prevalence of CPA deals.
  Partners prefer to pay on confirmed bookings rather
  than clicks, which shifts conversion risk to Jetcost.

This distinction is critical when analysing revenue mix
and when evaluating the impact of product changes on
monetisation.

## Diaspora Markets

Some markets have large diaspora communities that
travel frequently to their country of origin. This
creates a specific demand pattern: high search volume
for routes between the host country and the origin
country, often with distinct seasonality and price
sensitivity.

**France** is the clearest example, with significant
traffic for routes to North Africa (Morocco, Algeria,
Tunisia). Similar patterns exist in other markets with
large immigrant populations.

Diaspora markets tend to show:
- Higher search-to-click conversion on specific routes
- Strong price sensitivity
- Concentrated traffic on a limited set of
  origin-destination pairs
- Different partner mix (regional carriers and OTAs
  specialised in those routes)

## Market Size and Flight Economics

The geographic size of a market directly affects average
flight prices, which in turn affects CPC rates and CPA
commissions:

- **Small/medium countries** (e.g. Italy, Spain): domestic
  flights are short and inexpensive, often under €100.
  International routes dominate higher-value searches.

- **Large countries** (e.g. United States, Brazil,
  Australia): domestic flights can cost €500–1000+.
  This inflates average ticket value, which pushes
  CPA commissions and effective CPC rates significantly
  higher than in European markets.

This means that raw click volume is not directly
comparable across markets — a click in the US is
structurally worth more than a click in Italy,
independent of partner deal quality.

## Paid Coverage per Market

Not every market has a SEM account of its own: several are covered
through another account's Extended (EXT) campaigns, and a few have no
active campaigns at all. Which is which — and why that makes a
per-account read and a per-country read of the same traffic disagree —
is in
[core/marketing/sem/accounts.md](/core/marketing/sem/accounts.md).

## Key Dimensions for Market Analysis

When analysing performance by market, the most relevant
dimensions are:

- **Market**: the country-language tuple the session is on
  (drives currency and partner mix). Not the user's own
  country, and the country half does not determine the
  language — see the two sections at the top of this file.
- **Deal mix**: CPC vs CPA ratio for that market
- **Average ticket value**: proxy for revenue potential
  per conversion
- **Diaspora weight**: share of traffic on diaspora
  routes vs domestic/mainstream international routes
