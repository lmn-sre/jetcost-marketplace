---
type: Marketing Channel
description: "The state of the Bing channel: small, not yet stabilised, and deliberately not documented as a set of rules."
tags: [marketing]
timestamp: 2026-09-03T00:00:00Z
---

# Bing Ads

Account, campaign and adgroup structure are shared with Google Ads —
see [index.md](/core/marketing/sem/index.md).

## The channel has no settled operating rules yet

Bing is a **small channel and its management model is still being
worked out**. Match types, device coverage and bid strategy all vary
between accounts and are, in places, deliberately under test.

That has one important consequence for reading anything about SEM:
**the platform-level rules documented elsewhere in this folder describe
Google Ads.** Do not restate them as Bing rules, and don't treat an
observed Bing configuration as a convention — a live setting there is
as likely to be a test as a standard. Earlier versions of this bundle
asserted flat Bing rules ("Exact match only", "desktop only"); they
were a false precision and have been removed rather than corrected,
because the honest statement is that no stable rule exists yet.

## Bid strategies under test

Three bid strategies are being tested across accounts — one strategy
per account:

| Strategy | Type |
|---|---|
| SA360 tCPA | Target CPA managed via Search Ads 360 |
| BingAds tCPA | Target CPA managed natively in Bing Ads |
| Manual CPC | Manual cost-per-click |

The test exists to pick one before standardising across the Bing
account fleet. Results, winning strategy and rollout are to be
documented when the channel settles.
