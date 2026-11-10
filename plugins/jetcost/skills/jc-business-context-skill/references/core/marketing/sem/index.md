# SEM — Search Engine Marketing

## Overview

SEM covers all paid search acquisition: Google Ads and Bing Ads
(Microsoft Ads). This file holds the structure shared across platforms
— campaign types, adgroup granularity, keywords, ads, landing pages.

Google Ads carries essentially all the volume and all the active
methodology. Bing is a small channel whose rules are still being
settled, so **nothing on this page should be read as a Bing rule** —
see [bing-ads.md](/core/marketing/sem/bing-ads.md) for what is and
isn't established there.

## Files

- [accounts.md](/core/marketing/sem/accounts.md) — how the account fleet is
  segregated (country, language, brand, Local vs EXT), account and campaign
  naming, brands and market coverage, and the macro-regions campaigns are
  grouped by.
- [google-ads.md](/core/marketing/sem/google-ads.md) — bid strategies,
  standard campaign settings, the day-to-day bid management methodology, and
  the conversion signals sent to Google (including what economic value each
  one carries).
- [bing-ads.md](/core/marketing/sem/bing-ads.md) — the state of the Bing
  channel.
- [levers.md](/core/marketing/sem/levers.md) — the levers marketing pulls day
  to day (tCPA, device bid adjustment, budget, campaign status) and what
  pulling each one does.
- [negative-keywords.md](/core/marketing/sem/negative-keywords.md) — how
  exclusions are structured, and the rule for adding a partner under a
  no-bidding agreement.
- [metrics.md](/core/marketing/sem/metrics.md) — SEM's own bid-management
  metrics (ROAS, GP, CPA mktg, RPA) and how a tCPA target is derived from a
  ROAS objective.
- [goals.md](/core/marketing/sem/goals.md) — the weekly SEM goals by day and
  country cluster, their two perimeters (SEM and ALL), and how to read them
  against actuals.
- [dimensions.md](/core/marketing/sem/dimensions.md) — marketing's own
  campaign-level dimensions, including the virtual campaigns that keep the
  campaign field populated for traffic that came from no campaign at all.

## Account Structure

One account per unique combination of target country, language,
brand/website and localization type (Local or EXT), all under a single
MCC. The segregation rule, the naming conventions, the brand list, the
market coverage exceptions and the macro-region grouping are in
[accounts.md](/core/marketing/sem/accounts.md).

## Campaign Types

Within each account, campaigns are segmented by intent. The point is to
concentrate the conversion signal into homogeneous intent clusters — a
Smart Bidding strategy can only optimise as well as the signal reaching
it is coherent.

| Type | Intent |
|---|---|
| **Brand** | Exact brand searches (e.g. "jetcost") |
| **Branded** | Brand plus a generic travel term (e.g. "jetcost voli") |
| **Competitors** | Airline and OTA/meta competitor terms |
| **Destinations** | A destination or origin city/country |
| **Routes** | An exact origin–destination pair |
| **Generics** | Generic travel terms, plus seasonal and holiday variants |
| **DSA** | Automatic coverage from site content — catches queries no keyword maps |
| **PMax** | Cross-channel (Search / Display / Video) |

Brand and Branded are separate campaigns run with different strategies.
**"Branded" was previously called "Hybrid"** — same campaigns, cosmetic
rename; older material and any `hybrid` value still found in a
campaign-type field means these. How the types roll up in reporting is
in [dimensions.md](/core/marketing/sem/dimensions.md); the bid strategy
each one runs is in
[google-ads.md](/core/marketing/sem/google-ads.md).

## Ad Group Structure

Adgroup granularity is what determines the quality of the signal sent
to Smart Bidding: one adgroup per real intent unit, no finer.

| Campaign Type | Ad Group Granularity | Naming example |
|---|---|---|
| Brand / Branded | One per campaign | `Jetcost` |
| Competitors | One per competitor | `Ryanair`, `Kayak`, `Skyscanner` |
| Destinations — destination | One per destination city/country | `to_IT_Milano_MIL` |
| Destinations — origin | One per origin city/country | `from_IT_Milano_MIL` |
| Routes | One per route | `IT_FR_Roma_Parigi_FCO_CDG` |
| Generics | One main adgroup plus seasonal ones | `Voli`, `Natale`, `Primavera` |

- **No bid adjustment at adgroup level.** Device is the only bid
  dimension marketing acts on, and it acts on it at campaign level (see
  [levers.md](/core/marketing/sem/levers.md)).
- **Default Max CPC is €0.10** on every adgroup — a floor-level
  default, not the operative lever. A tCPA portfolio strategy can carry
  its own Max CPC ceiling on top of it, which is worth checking when a
  portfolio underdelivers on volume.
- **Accents and special characters are stripped** from Routes and
  Destinations adgroup names, mandatorily: without it the same route
  produces two adgroups and splits its own signal.

## Keywords

Keywords are generated semi-automatically from structured templates,
fed by the most frequent queries in the search query report (SQR).
Templates are what make 40+ markets coverable at all; the volume filter
paired with them is what keeps coverage from backfiring, since
low-volume terms degrade account quality and dilute the signal the
algorithm learns from — the exact failure the account refactoring was
undertaken to undo (see
[accounts.md](/core/marketing/sem/accounts.md)).

| Rule | Detail |
|---|---|
| Match type | Exact + Broad on all campaign types. Exception: Origins inside Destinations campaigns use Exact + Phrase. |
| Double variant | Every template keyword is created in both Exact and Broad (Brand excepted). |
| No misspellings | No spelling, singular/plural or word-order variants — `volo milano` and `milano volo` are the same keyword to Google. |
| Lowercase only | All keyword text lowercase, IATA codes and city/airline names included. |
| No special characters | Accents, diaereses and special characters removed via the sanitization table. |

Individual campaigns may deviate to test something (a match type, a
device); a live account that doesn't match a row above is a test, not
necessarily a drift.

## Ads and Assets

One responsive search ad (RSA) per adgroup, with title structure
following the campaign's intent:

| Type | RSA | Title structure |
|---|---|---|
| Brand / Branded | 1 | Titles 1+2+3 pinned to position 1; must carry the brand/website name |
| Generics | 1 | Generic travel titles, no personalisation |
| Destinations | 1 | ≥3 titles personalised with the destination name |
| Origins | 1 | ≥3 titles personalised with the origin name |
| Routes | 1 | ≥3 titles carrying origin–destination, or at minimum the destination |
| Competitors | 2 | RSA1 carries the competitor name in 3 titles; RSA2 is generic with no brand name — it exists so the adgroup keeps serving if RSA1 is disapproved on a trademark complaint |

## Landing Pages

Landing page assignment follows campaign intent, with one structural
subtlety that is easy to get wrong: **the ad's Final URL is always the
homepage**. The specific page is set at *keyword* level and inherited
from there, so reading the ad alone tells you nothing about where a
click actually lands.

| Campaign type | Desktop | Mobile |
|---|---|---|
| Brand / Branded / Generics / Competitors | Homepage | Homepage + `/oia/` |
| Destinations — cities / Origins / Routes | Specific SEO page | SEO page + `/oia/` |
| Destinations — countries | SEO page | Homepage + `/oia/` |

`/oia/` (Open In App) sends a mobile user who already has the app
installed straight into it. See
[core/product/w2a/](/core/product/w2a/index.md) for the wider
web-to-app context and
[config/features/mobile-app-oia.md](/config/features/mobile-app-oia.md)
for the in-app side.

SEO pages are the current landing surface because they already exist,
not because they're the right one — dedicated SEM landing pages are
being built and will replace them for these campaign types. Until
then, an SEM landing on an SEO page inherits everything that binds
that page, including the 15-day limit on its cached prices (see
[core/product/seo-pages.md](/core/product/seo-pages.md)).

## Device Targeting

Google Ads campaigns run on all devices, with device handled as a bid
adjustment rather than a targeting decision (see
[levers.md](/core/marketing/sem/levers.md)). Tablet sits at -100% on
the main accounts, which is a default rather than a rule: it reflects
tablet's historical contribution, and there is no cap on a device that
performs.
