---
type: Data Convention
description: "How marketing clusters traffic — not-campaign vs campaign by the registry's technical flag, campaign into paid and not paid, paid into SEM and Not SEM by channel group — and why marketing cost has to be read against that tree rather than through its platform buckets."
tags: [marketing]
timestamp: 2026-10-22T00:00:00Z
---

# Traffic Taxonomy

## Overview

Marketing reads traffic as a three-level tree. Each level is one rule on
a field the campaign registry resolves from the session's campaign (see
[sem/dimensions.md](/core/marketing/sem/dimensions.md)), so every
session lands in exactly one leaf:

```
session
├── not-campaign        technical campaign = true
└── campaign            technical campaign = false
    ├── not paid        paidVsNotPaid = notpaid
    └── paid            paidVsNotPaid = paid
        ├── SEM         channel group = paid-search
        └── Not SEM     channel group ≠ paid-search
```

## Level 1 — Campaign vs not-campaign

**Not-campaign** is the traffic that reached Jetcost through no campaign
at all — direct, referral (from websites and from AI assistants),
organic. It still carries a campaign value:
a virtual one, which exists only so that the session has a record in the
campaign registry and can be resolved like any other (see
[sem/dimensions.md](/core/marketing/sem/dimensions.md)). What identifies
it is the registry's *technical* flag on that campaign, never the
campaign field being empty (it never is) nor the naming prefix virtual
campaigns happen to carry.

**Campaign** is everything else: a real campaign, set up in the registry
for traffic that arrives with its own tracking.

## Level 2 — Paid vs not paid

Campaign traffic splits by Traffic Type, `paidVsNotPaid` (see
[data/dimensions.md](/data/dimensions.md)). Being a campaign does not
make traffic paid: CRM is campaign traffic, tracked like any other, and
is not paid.

## Level 3 — SEM vs Not SEM

Paid traffic splits by channel group:

- **SEM** — channel group `paid-search`: the Google Ads and Bing Ads
  search accounts described in [sem/index.md](/core/marketing/sem/index.md).
- **Not SEM** — every other paid channel group. What each one is and
  where its cost comes from is in
  [other-channels.md](/core/marketing/other-channels.md).

## Reading marketing cost against the tree

Marketing cost (`costMktg`, see [data/metrics.md](/data/metrics.md)) is
the sum of three pro-rata buckets (see
[data/pro-rata-allocation.md](/data/pro-rata-allocation.md)), and the
buckets are cut **by the platform the spend was bought on, not by the
kind of traffic it bought**:

| Bucket | Raw field | What it holds |
|---|---|---|
| GAds | `costProRataGAds` | All Google Ads spend — search and display alike |
| Ds | `costProRataDs` | Bing Ads search spend |
| NotSem | `costProRataNotSem` | Spend bought outside the two SEM platforms |

So "Non-SEM" as a cost bucket and Not SEM as a branch of this tree are
not the same thing:

- Everything in the NotSem bucket belongs to the Not SEM branch.
- The reverse does not hold. Google Ads display is Not SEM traffic, but
  its cost is in the GAds bucket, so GAds + Ds is **not** SEM cost.

To get the cost of any branch, slice marketing cost by that branch's
rule. Never assemble it by picking buckets.

## Attribution scope

The same tree can be read through any attribution scope —
`sessionCampaign*`, `lastClickNotDirect*`, `userBased*` (see
[sem/dimensions.md](/core/marketing/sem/dimensions.md)). Read all three
levels through the same one: each scope can resolve a different campaign
for the same session, so mixing them classifies one level by one
campaign and the next by another. Under lastClickNotDirect the not-campaign branch
is smaller by construction, because direct visits roll back to the
previous non-direct touchpoint (see
[data/attribution.md](/data/attribution.md)).

The SEM perimeter of the [SEM goals](/core/marketing/sem/goals.md) is
the SEM leaf read through lastClickNotDirect.
