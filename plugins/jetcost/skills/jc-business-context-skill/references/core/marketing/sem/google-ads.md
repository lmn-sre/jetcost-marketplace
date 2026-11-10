---
type: Marketing Channel
description: "Google Ads bid strategies, standard campaign settings, the day-to-day bid management methodology, and the conversion signals sent to Google — including what economic value each carries and how that value is computed today."
tags: [marketing]
timestamp: 2026-10-13T00:00:00Z
---

# Google Ads

Structure shared with Bing Ads is in
[index.md](/core/marketing/sem/index.md); the account fleet itself is
in [accounts.md](/core/marketing/sem/accounts.md). This file covers
what's specific to Google Ads: bid strategies, campaign settings, bid
management methodology, and conversion tracking. The levers marketing
actively pulls (tCPA, device bid adjustment, budget) are defined in
[levers.md](/core/marketing/sem/levers.md).

## Bid Strategies

Bid strategy varies by campaign type.

### Brand and Branded

Impression Share bid strategy, Manual CPC, or tCPA depending on the
account. Brand is treated as absolute brand defence — the target is a
ROAS well above break-even, not volume.

### Competitors

One tCPA strategy per account, targeting **ROAS 100%**. Kept
deliberately **isolated from the global portfolios**: competitor
traffic converts differently from everything else, and pooling it into
a shared strategy lets it cannibalise the budget of campaigns with
better unit economics.

### Routes, Destinations, Generics

tCPA, with strategies segmented **by macro-region** — the same
geographic grouping the campaigns themselves use (see
[accounts.md](/core/marketing/sem/accounts.md)).

This replaced an earlier model that segmented bid strategies into
**tiers by historical CPA** (High / Medium / Low CPA / Low Traffic).
Those tiers were eliminated in the account refactoring: geography is a
dimension Google can actually act on in the auction, while a CPA tier
is a property of the account's own history, and slicing strategies by
it produced portfolios that had little in common beyond a number.

### PMax

**Maximise Conversions** with a CPA cap. Despite the name, the cap is
a real, editable **target**, not a fixed ceiling — Maximise Conversions
campaigns in these accounts do carry an editable target. Read it and
move it as you would a tCPA on any other campaign type; it is the same
lever, reported the same way (see
[levers.md](/core/marketing/sem/levers.md)). The budget cap, not the
CPA cap, is what actually constrains a PMax campaign's spend.

### Maximise Clicks

Buys as many clicks as the budget allows. Unlike every other strategy
here it has **no target to price against** — no cost per conversion, no
revenue ratio — so nothing bounds what a single click may cost except the
optional **CPC bid ceiling**. That makes the ceiling the binding lever on
this strategy rather than an optional refinement: with none set, the
campaign spends its whole budget at whatever the auction asks, and the
only remaining brakes are the budget itself and device modifiers. See
`cpc-ceiling-adjustment` in [levers.md](/core/marketing/sem/levers.md).

The same ceiling exists on **Target Impression Share**, where it bounds
how far Google may bid up to defend a position. There it is a guardrail
on a strategy that does have an objective; on Maximise Clicks it is the
whole of the price discipline.

A campaign leaving this strategy for tCPA or tROAS reports as
`bid-objective-change` only once it carries the new target — the
strategy swap itself is not separately reported.

## Standard campaign settings

- **Budget** — Search is unlimited by rule (a budget-limited Search
  campaign is a defect, see [levers.md](/core/marketing/sem/levers.md));
  PMax runs under a rigid cap, because display and video can burn
  budget fast.
- **Conversion goal** — a custom goal bundling the clickout signals
  and the app-install signals: on a Search campaign an install counts
  as a conversion just like a clickout. See Conversion Signals below
  for what those signals carry and why installs are in.
- **Location** — people in, or regularly in, the targeted locations;
  EXT accounts additionally exclude the matching Local country and any
  same-language country with an account of its own (see
  [accounts.md](/core/marketing/sem/accounts.md)).
- **Audiences** — Remarketing, In-Market and Affinity travel, all in
  **Observation** mode: they inform the algorithm and segment
  reporting without restricting who the campaign can reach.
- **Device** — bid adjustments rather than targeting; see
  [index.md](/core/marketing/sem/index.md).
- **AI Max for Search** — enabled with all asset-optimization options.

## AI Max for Search

A 2025 Google feature that augments Search campaigns with AI in three
areas: expanded query matching, automatic asset optimization, and
personalized final URL. It works alongside Broad Match and Smart
Bidding, and its asset-automation toggle is itself a tracked lever
(`asset-upgrade` in [levers.md](/core/marketing/sem/levers.md)).

Two things need watching after enabling it, both because AI Max widens
what the campaign can do without asking:

1. **Query relevance** — check the search query report that newly
   matched queries are actually travel-relevant; the irrelevant ones go
   to negatives (see
   [negative-keywords.md](/core/marketing/sem/negative-keywords.md)).
2. **Mobile landing logic** — personalized final URL can override the
   keyword-level URL, so verify that keywords with a dedicated mobile
   landing page still point there rather than to a generic homepage.
   The `/oia/` mobile behaviour described in
   [index.md](/core/marketing/sem/index.md) depends on it.

## Performance Max

PMax runs across all Google channels from a single campaign; the
algorithm allocates budget dynamically and there is no manual placement
control — only indirect control through assets, audience signals and
budget.

At Jetcost PMax is an **expansion** channel, reaching users in the
pre-decision phase. Search remains the primary acquisition channel, and
PMax is not managed as a substitute for it.

| Asset Group | Audience signal | Objective |
|---|---|---|
| PMax Generic | Family, Luxury, Digital Nomad | Capture latent demand Search doesn't intercept |
| PMax Routes | In-market travel + remarketing of past site users | Intercept specific demand on high-potential routes (top-routes feed) |

- **Brand exclusion is mandatory** on every PMax campaign — the
  account's Brand List must be excluded, or PMax hijacks branded
  queries that belong to the dedicated Brand/Branded campaigns, which
  both inflates PMax's apparent performance and starves the campaigns
  built to defend the brand.
- **Placement cleanup** — weekly for the first 4 weeks after launch,
  monthly thereafter: non-travel placements excluded at account level.

## Bid Management Methodology

The team's operating goal is a sustainable ROAS per campaign, weighted
by device (see [metrics.md](/core/marketing/sem/metrics.md) for the
ROAS/CPA mktg/RPA formulas). The recurring workflow:

1. **Rank campaigns by ROAS**, processed in order of traffic volume
   (highest-traffic campaigns reviewed first).
2. **Assess room to maneuver** on spend — judgment-based, scaled to the
   campaign's volume.
3. **Split by device** when room exists: raise the device bid
   adjustment where that device's ROAS is strong (push more spend),
   lower it where ROAS is weak (contain inefficient spend). The
   adjustment size is also judgment-based.

**The device split is desktop vs mobile + app, never mobile alone.**
A device ROAS is read on two buckets only: desktop on one side, mobile
and app together on the other. App must never be read apart from
mobile, nor dropped from it: a mobile ad click often turns into
revenue on an app session — a W2A install or reopen, or an `/oia/`
opening — and that session is recorded as app, not mobile (see
[data/dimensions.md](/data/dimensions.md#device)). Google counts those
installs and in-app clickouts as mobile conversions, so reading
mobile without app leaves out revenue the mobile campaigns produced
and makes mobile look worse than the auction it is bidding in.

Decision after evaluating a campaign's ROAS:
- **Unsustainable ROAS** → correct via device bid adjustment.
- **Sustainable ROAS** → move on to the next campaign, or try pushing
  this one further ("squeeze it").

**BID %**, tracked in the SEM dashboard, is the % of the bidding
strategy's tCPA the team is willing to pay — the shorthand for how
aggressive the current action is.

### CPC vs CPA markets

Reaction speed to these levers differs by the market's commercial
model:
- **CPC markets** — actions are reactive and immediate.
- **CPA markets** — the tracked conversion action is still the
  clickout (not the booking), same as CPC markets from a
  bidding-signal perspective.

### Action tracking

The SEM dashboard keeps a history of every lever change (tCPA, device
bid adjustment, budget), each with: the baseline before the action, the
metrics it affected, and its outcome — an action → impact record meant
to inform future decisions, not just a point-in-time performance view.

## Conversion Signals

### Why they're sent server-side

Signals used to be pushed client-side through GTM, and they carried
**no economic value at all** — deliberately: a value attached in the
browser is readable by anyone inspecting the page, partners included,
which would expose Jetcost's per-click economics to the very
counterparties it negotiates with.

Server-side GTM (sGTM) is what made attaching a value possible in the
first place. sGTM's other benefits — reliability, less dependence on
third-party cookies under GDPR / Consent Mode v2 — are real, but the
reason the switch matters for bidding is that Smart Bidding can now
optimise against *value* rather than against a bare count of clickouts.

### The three streams

Signals are split by revenue stream and by platform/tracking method.

#### Core Click Signals

| Signal name | Platform | Tracking method |
|---|---|---|
| `web-core-sgtm` | Web | Server-side GTM |
| `ios-core-sgtm` | iOS | Server-side GTM |
| `android-core-sgtm` | Android | Server-side GTM |
| `ios-core_cpc-api-deferred` | iOS | API deferred |
| `android-core_cpc-api-deferred` | Android | API deferred |

Fired on each clickout on the results page. This is the **primary
optimization signal**.

#### MAL Core Click Signals

| Signal name | Platform | Tracking method |
|---|---|---|
| `web-promobox-sgtm` | Web | Server-side GTM |
| `android-promobox-sgtm` | Android | Server-side GTM |
| `ios-promobox-sgtm` | iOS | Server-side GTM |
| `ios-promobox-api-deferred` | iOS | API deferred |
| `android-promobox-api-deferred` | Android | API deferred |

A stream of its own for MAL Core / Promobox placements (see
[core/commercials/mal/overview.md](/core/commercials/mal/overview.md)), passing the real transaction
value rather than a modeled one.

#### App Install Signals

| Signal name | Platform | Tracking method |
|---|---|---|
| `ios-install-api` | iOS | API |
| `android-install-api` | Android | API |

First-open signals, carrying **no economic value** — they are there to
count an install, not to price a conversion.

They optimise app-install campaigns, and they are also part of the
Search campaigns' conversion goal. That is a deliberate choice: under
tCPA an install from a Search campaign is worth one conversion, the
same as a clickout. The reason is W2A — Jetcost pushes web users to
install the app (see [core/product/w2a/index.md](/core/product/w2a/index.md)),
so a Search click that ends in an install is a result the bidding
should pursue, not a lost clickout.

What this means for reading Google's numbers: the conversions and the
CPA Google reports on a Search campaign are clickouts **plus
installs**, not clickouts alone, so they are not a cost per clickout.

#### Why the app streams need a deferred variant

The `*-api-deferred` signals exist because of the **jump to the app
store**: the user leaves the web session, installs, and comes back in a
context the normal funnel can't follow through. Those conversions can't
be captured by the standard flow, so they are reconstructed and sent
manually. Treat them as a separate, hand-maintained path rather than
the sGTM streams under a different name.

### The economic value sent per click

The value has changed twice, and which era a date falls in changes how
its bid calibration should be read.

- **Until mid-2026** — the value sent was the **eCPC per partner**: the
  average revenue per click of the partner receiving the clickout.
- **Since 2026-06-01** — the value comes from a model keyed on the
  **clicked route** (with geography and device, and in its variants the
  booking window and the distribution channel), and **no longer on the
  partner at all**. It applies to every Core sGTM signal — web, iOS and
  Android alike.

The reason for the change is what the algorithm can act on. Google
bids in an auction where route, geography and device are known and
actionable; **which partner ends up winning the click is not** — it's
decided after the click, by Jetcost's own sorting and partner mix. A
value keyed on the partner therefore carries variance the algorithm
cannot attribute to anything it controls, which is noise from a bidding
point of view. Keying the value on the route puts it on a dimension
Google can actually optimise against.

How the model is computed — training window, the geographic waterfall
it falls back through, its volume thresholds, its variants — is in
`skills/jc_clickhouse_semantic_layer_skill`, not here; this file states
what the value *is* and why, not how it's produced.

### "eCPC" means three different things

The word is overloaded, and two of the three used to be the same
number, which is the trap:

1. **Commercial eCPC per partner** — the pricing figure Revenue
   Management sets per partner (see
   [core/commercials/partner-lifecycle.md](/core/commercials/partner-lifecycle.md)).
2. **`revenueEcpc`** — the click-level field holding revenue known at
   click time (see
   [data/revenue-fields.md](/data/revenue-fields.md)).
3. **The conversion value sent to Google** — this section.

Until mid-2026, (1) and (3) were the same figure: the per-partner eCPC
was literally what got pushed. Since 2026-06-01 they are unrelated —
(1) still exists and still prices partners, while (3) no longer
references the partner. And (2) **has not been realigned** with the new
model: `revenueEcpc` still carries the old per-partner logic, so it is
not a proxy for what Google is being told a click is worth on any date
after 2026-06-01. See
[data/revenue-fields.md](/data/revenue-fields.md) for that divergence
and its consequences.

Always qualify which of the three is meant. A bid-calibration
comparison that spans 2026-06-01 is comparing two different valuation
regimes, not two periods of the same one.
