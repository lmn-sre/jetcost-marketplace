---
type: Data Convention
description: "Marketing's own campaign-level dimensions — Campaign (including the virtual campaigns given to non-campaign traffic), Campaign Type and its reporting cluster-types, Source, Local vs Ext, Country Cluster — and the attribution scope each is read through."
tags: [marketing]
timestamp: 2026-10-22T00:00:00Z
---

# SEM Dimensions

## Overview

Campaign-level dimensions specific to marketing's own reporting and
bid management — distinct from the shared dimensions in
[data/dimensions.md](/data/dimensions.md) (Country, Device, Context,
Platform, Traffic Type), which apply identically across every function.

## Attribution scope: read the same dimension through different lenses

Campaign, Campaign Type, Source, and Local vs Ext each exist as
several raw fields — one per attribution scope, not several distinct
dimensions:

- **`sessionCampaign*`** — last-click attribution, scoped to the
  current session itself (not one of the three models in
  [data/attribution.md](/data/attribution.md), which attribute a
  *booking*, potentially across sessions; this is last-click logic
  applied to a single session's own touchpoints).
- **`lastClickNotDirect*`** — scoped to the
  [lastclicknotdirect](/data/attribution.md) attribution model, the
  default for reporting and reconciliation.
- **`userBased*`** — scoped to the
  [userbased](/data/attribution.md) attribution model — see that file
  for what it means.

Pick the scope the same way you'd pick an attribution model — via
[data/attribution.md](/data/attribution.md)'s "Which Model to Use"
table — rather than treating e.g. `lastClickNotDirectCampaignType`
and `userBasedCampaignCampaignType` as unrelated fields.

## Campaign

The specific campaign a session/touchpoint is tied to.

### Every session carries a campaign — including sessions that came from none

The campaign field is **never empty**. Traffic that arrives from no
campaign at all — direct, referral (AI assistants included, see below),
organic — is assigned a **virtual campaign**: an entry that exists to be
resolved, not to be bought.

The reason is the campaign registry (*anagrafica marketing*). Every
other dimension in this file — paid vs not paid, channel group, traffic
type, campaign type, source/medium, local vs ext, country detail,
product — is resolved *from* the campaign value against that registry.
A session with no campaign would resolve to nothing and fall out of
every campaign-keyed breakdown; giving non-campaign traffic a virtual
campaign is what makes "organic" and "direct" first-class, sliceable
values instead of gaps.

The consequence is the one most often got wrong: **a populated campaign
field does not mean paid traffic**. Filtering on "campaign is not null"
selects essentially everything. To isolate paid, use Traffic Type
(`*PaidVsNotPaid`) — see [data/dimensions.md](/data/dimensions.md).

Virtual campaigns are named with a `vrt` prefix. That prefix is
arbitrary — a naming convention with no semantics of its own — so
don't build logic on it or read meaning into its parts. What marks a
campaign as virtual is the registry itself: its entry carries a
*technical* flag, and that flag is what logic keys on (see *Country
Cluster* below, and [traffic-taxonomy.md](/core/marketing/traffic-taxonomy.md),
where it draws the line between campaign and not-campaign traffic).

### AI assistant referral

Referral traffic from AI assistants (ChatGPT, Perplexity and similar)
reaches Jetcost when a user follows a link in an assistant's answer. Since
2026-10-22 it has virtual campaigns of its own, one per product
(`vrt_ai_assistant_flights`, `vrt_ai_assistant_cars`), split out of the
generic referral ones, which until that date included it. It is not paid
traffic and has nothing to do with the paid `llm` channel group, which is
advertising bought on OpenAI (see
[other-channels.md](/core/marketing/other-channels.md)).

### Not-found virtual campaigns

Some virtual campaigns exist for traffic that *should* have matched a
real campaign and didn't. They belong to the same registry mechanism as
every other virtual campaign, and there is more than one:

- a **generic** not-found, for a session that matches nothing in the
  registry at all;
- a **Google Search CPC** not-found, for traffic known to be paid
  Google search whose specific campaign can't be identified. **This one
  absorbs the cost** — the spend is real and lands in cost totals while
  belonging to no named campaign.

Both are expected to stay small, and alerts exist to flag it when they
don't. A growing not-found bucket is an attribution defect to report,
not a category to analyse — with one exception that is not a defect: a
campaign activated on Google Ads before its registry entry exists has
nothing to resolve against, and its spend sits in the not-found bucket
until the entry is created. That spend is never reattributed afterwards.
See [data/query-caveats.md](/data/query-caveats.md) for how to tell the
two apart and for what this does to a per-campaign cost read.

## Campaign Type

Classification of the campaign — Brand, Branded, Competitors,
Destinations, Routes, Generics, DSA, PMax. See
[index.md](/core/marketing/sem/index.md)'s "Campaign Types" table for
the taxonomy (shared across Google Ads and Bing Ads) and
[google-ads.md](/core/marketing/sem/google-ads.md)'s "Bid Strategies"
section for how bid strategy is chosen per type — not repeated here.
A value still reading `hybrid` is what is now called Branded.

### Reporting cluster-types

Reporting doesn't read the type label directly: the typology carried in
campaign naming rolls up into a smaller set of cluster-types.

| Typology label(s) | Cluster-Type |
|---|---|
| brand, branded, hybrid | BRANDED |
| airlines, competitor | COMPETITOR |
| cities, countries | DESTINATION |
| routes | ROUTES |
| generic | GENERIC |
| dsa, performancemax | PMAX-DSA |
| app | APP |

Two collapses in that mapping matter when reading a cluster-level
number:

- **BRANDED merges Brand and Branded**, which are run as separate
  campaigns with different strategies. A BRANDED figure blends brand
  defence with brand+generic intent; separating them means dropping to
  campaign level.
- **PMAX-DSA merges DSA and PMax**, two campaign types with different
  bid logic — DSA is keyword-less Search coverage, PMax is
  cross-channel. A PMAX-DSA figure is not a read on either one on its
  own.

## Source

The traffic source/platform the campaign ran on (e.g. Google Ads,
Bing Ads).

## Local vs Ext

Whether the campaign targets the local market or an external
audience.

## Country Cluster

Groups the granular market-locale a session/touchpoint belongs to
(e.g. `it-it`, `us-en`) into a small set of macro clusters — LATAM,
GERMANIC, NORDICS, OTHER-EU, plus single-market clusters (IT, FR,
ES, UK, NL, PT, IE, CA-EN, CA-FR) for markets not folded into a
wider group. Countries are grouped together when they're similar
enough in user behaviour that analysing them individually isn't
worth the extra granularity.

The US is the one market the cluster *splits* rather than folds: it
carries Local vs Ext into the cluster value itself, as `US-EN-LOC`,
`US-EN-EXT`, `US-ES-LOC` and `US-ES-EXT`. A US campaign buying its
own market and one buying an external audience behave differently
enough that reading them as a single `US-EN` hides more than the
language split does.

Like the dimensions above, it's read through the same attribution
scopes — `sessionCampaign*`, `userBased*`, `lastClickNotDirect*`,
one field each. All three live on the
**sessions datamart only**: there is no country cluster on searches,
clicks or impressions.

Which locale gets grouped depends on the campaign. A real campaign
contributes its own target — the country-language it was set up to
buy. The virtual campaigns described under *Campaign* above have no
target: direct, referral (AI assistants included) and organic traffic
was never bought for a
country. For them (the campaigns flagged *technical* in the registry)
the cluster takes the **session's market** instead, and for the US
the Local vs Ext split comes from whether the user is in the
market's country. So on paid traffic the cluster reads as campaign
target and on non-campaign traffic as market; split by Traffic Type
when the difference matters. The rule is applied at query time, so
it holds for the whole history.

**`RoW` is the fallback bucket, not a market group.** Anything the
mapping doesn't name lands there: markets outside every cluster
(India, Singapore, South Africa, Australia, Thailand, New Zealand…)
and three Latin American markets — Venezuela, Uruguay, Bolivia —
that LATAM does not include. Over 2026-09-01..27 that was about 11%
of sessions: 0.4% of paid, 15% of non-paid. Never report it as a
market; break it down by market first. Until 2026-09-28 virtual
campaigns used their `undefined` target too, which put 98% of
non-paid sessions in RoW and made the cluster usable on paid traffic
only.

## Bidding Strategy / Bidding Strategy Type

Unlike the dimensions above, these come from the Google Ads API (via
`agents/import-operation-logs/importers/gads.js`), not the session
datamarts. **Bidding Strategy Type** is the category — tCPA, Manual
CPC, Maximise Conversions, Impression Share — documented in
[google-ads.md](/core/marketing/sem/google-ads.md)'s "Bid Strategies"
section. **Bidding Strategy** is the specific named strategy instance
assigned to a campaign.
