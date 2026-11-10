---
type: Business Concept
description: "Explains Jetcost's two monetisation models, CPC and CPA, and how deal type shapes revenue, risk, and which funnel metrics matter."
tags: [business]
timestamp: 2026-10-14T00:00:00Z
---

# Deal Types

## Overview

Jetcost monetises partner traffic through two deal
models: **CPC** (Cost Per Click) and **CPA** (Cost Per
Acquisition). The deal type determines when and how
revenue is generated, which funnel metrics matter most,
and how commercial risk is distributed between Jetcost
and the partner.

Most partners operate under a single deal type, but
hybrid arrangements exist where a partner has both
a CPC floor and a CPA upside.

## CPC — Cost Per Click

### How It Works

The partner pays a fixed fee every time a user clicks
on one of their offers and is redirected to their
platform. Revenue is generated at the click event,
regardless of whether the user completes a booking.

### Revenue Drivers

The critical funnel metrics for CPC deals are STR and
CTR — both determine how many clicks are generated.
CR is irrelevant for revenue calculation under a pure
CPC model.

```
Revenue_CPC = clicks x CPC_rate
```

### Risk Profile

Conversion risk sits entirely with the partner. If
their platform converts poorly, Jetcost still earns
on every click. This makes CPC a more predictable
and stable revenue model for Jetcost.

### Typical Markets

CPC is the dominant model in Anglo-Saxon markets:
UK, US, AU, CA. Partners in these markets are
accustomed to paying for traffic regardless of
conversion outcome.

### Considerations

CPC rates vary significantly by market, partner
category, and route type. A click in the US on a
domestic long-haul route is structurally worth more
than a click in Italy on a short domestic route,
due to differences in average ticket value and
partner willingness to pay.

## CPA — Cost Per Acquisition

### How It Works

The partner pays a commission only when a user
completes a booking on their platform. Revenue is
generated at the booking event, not at the click.
Jetcost carries the conversion risk: a click that
does not result in a booking generates zero revenue.

### Revenue Drivers

Both CTR and CR are critical. CTR determines how
many users reach the partner platform; CR determines
how many of those complete a booking. A weak CR
can significantly erode the revenue value of strong
CTR performance.

```
Revenue_CPA = clicks x CR x Payoff
```

Where Payoff is the average commission value per
confirmed booking.

### CPA with Minimum CPC Floor

Some CPA partners include a contractual **min_cpc** billing
safeguard: a per-click minimum that guarantees Jetcost a floor
regardless of how the partner converts. It doesn't change the deal
classification — revenue is still generated at the booking event,
and the partner is still a CPA partner — it's a billing-level
override computed on top of the CPA reality, not a separate pricing
mode the deal switches into. The floor accrues per click
(`Floor = clicks × min_cpc`), not triggered once CR drops below some
threshold, and the accrued total is compared against actual CPA
revenue produced at the grain the clause is measured at — it only
becomes binding when the floor exceeds what was actually produced.
See
[core/commercials/cpa-model.md](/core/commercials/cpa-model.md) for
the exact comparison, the grain the clause is computed at, and how to
verify whether it's binding for a given partner/period, rather than assuming it from the clause's
presence alone.

The clause also keeps optimisation pressure on the partner, not just
on Jetcost. When both sides perform — Jetcost's own funnel and the
partner's conversion flow — produced revenue clears the floor and
the deal behaves like ordinary CPA. If the partner doesn't optimise
their own booking UX and clicks stop converting, they still have to
pay the floor regardless. In a fully efficient market, CPA and
CPA_MIN_CPC converge to the same outcome over the long run — the
floor mainly protects against structural, sustained underperformance
on the partner's side, not short-term noise.

### Risk Profile

Conversion risk sits with Jetcost. If the partner's
platform converts poorly — due to UX issues, pricing
uncompetitiveness, or technical problems — Jetcost
absorbs the revenue loss. This makes CPA a more
volatile model, with higher upside when conversion
is strong and higher downside when it is not.

### Typical Markets

CPA is more prevalent in continental European markets
and markets with diaspora traffic patterns, where
partners prefer to pay on confirmed outcomes rather
than on traffic volume.

### Considerations

CPA performance is sensitive to factors outside
Jetcost's direct control: partner platform quality,
payment options, post-click UX. Monitoring CR by
partner is essential to identify underperforming
integrations.

## CPC vs CPA — Key Differences

| Dimension | CPC | CPA |
|---|---|---|
| Revenue event | Click | Booking |
| Critical metrics | STR, CTR | STR, CTR, CR |
| Conversion risk | Partner | Jetcost |
| Revenue predictability | High | Lower |
| Typical markets | Anglo-Saxon | Continental EU |
| Upside potential | Capped at click volume | Higher if CR is strong |

## Mix CPC/CPA

In practice, Jetcost's revenue at any point in time
is a blend of CPC and CPA contributions. The
**Mix CPC/CPA** metric measures the share of clicks
monetised under each model:

```
Mix_CPC = CPC clicks / total clicks
Mix_CPA = 1 - Mix_CPC
```

The mix varies by market, partner, and product
context (web vs app). Shifts in the mix — even
without changes in total click volume — directly
affect revenue, because CPC and CPA have different
effective values per click depending on conversion
rates and commission levels.

Monitoring mix over time is important: an unexpected
shift toward CPA in a market that was predominantly
CPC may indicate a partner renegotiating their deal,
or a change in the partner set active in that market.
