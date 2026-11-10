---
type: Business Concept
description: "Describes the sequential user funnel from session to booking and the business formulas connecting each step."
tags: [business]
timestamp: 2026-10-21T00:00:00Z
---

# The Jetcost Funnel

## Overview

The Jetcost funnel describes the sequence of steps a user
goes through from landing on the platform to completing a
booking on a partner's site. Each step has a corresponding
metric that measures the conversion rate from the previous
step.

Understanding the funnel is essential for diagnosing
revenue performance, evaluating product changes, and
interpreting the impact of partner deal mix.

This file describes the funnel steps and the business
formulas that connect them. For what each metric means,
what it's sensitive to, and the raw ClickHouse fields
behind it, see [data/metrics.md](/data/metrics.md).

## Funnel Steps

### Session

A user lands on Jetcost. Not all sessions are equal:
only **qualified sessions** are counted in performance
analysis. Qualification is not based on user
engagement but on signal integrity — it is a data
quality filter, not a behavioural one. It removes two
kinds of traffic:

- **Bots, crawlers and illegitimate traffic**, recognised
  from the technical characteristics of the session.
- **Sessions that never recorded a consent state**, on
  the channels where that absence marks traffic too
  unreliable to count. A session that never went through
  the consent banner is not one the funnel can trust,
  whatever it did afterwards. What the technical consent
  is, and why it marks a recorded consent state rather
  than a choice, is in
  [data/consents.md](/data/consents.md).

Which channels are affected, the exact conditions and
the dates from which they apply are implementation, and
live in the ClickHouse semantic layer: the
`qualifiedSession` field and its mandatory default
filter (rule R002).

All funnel metrics are calculated on qualified sessions.
Unqualified sessions are excluded from analysis.

### Search

The user performs a flight search — one the user
actually submits. Searches triggered automatically by
the platform (*autosearches*) are not a funnel step and
are excluded from every search count, the same way
unqualified sessions are excluded above. The conversion
from session to search is measured by **STR
(Search-Through Rate)**:

```
STR = searches / sessions
```

### Impression

Search results are displayed. Each result shows one or
more **offers** per itinerary — an itinerary is a
specific origin-destination-date combination, while an
offer is a specific price from a specific partner for
that itinerary.

One itinerary can have multiple offers. Impressions and
clicks are sibling dimensions: both inherit from searches
and sessions, but they cannot be joined to each other.

### Click

The user selects an offer and is redirected to the
partner's platform. This is the primary monetisation
event for CPC deals. The conversion from search to
click is measured by **CTR (Click-Through Rate)**:

```
CTR = clicks / searches
```

### Booking

The user completes the purchase on the partner's
platform. This is the monetisation event for CPA deals.
The conversion from click to booking is measured by
**CR (Conversion Rate)**:

```
CR = bookings / clicks
```

## Funnel Metrics Summary

| Metric | Formula |
|---|---|
| STR | searches / sessions |
| CTR | clicks / searches |
| CR | bookings / clicks |

See [data/metrics.md](/data/metrics.md) for what each one means, what it's
sensitive to, and how it maps to raw ClickHouse fields.

## CPC vs CPA Implications

The funnel has different revenue implications depending
on deal type:

- **CPC deals**: revenue is generated at the click step.
  Every qualified click earns a fixed fee regardless of
  whether the user books. CTR is the critical driver.

- **CPA deals**: revenue is generated only at the booking
  step. A click with no booking generates zero revenue.
  Both CTR and CR are critical drivers.

This distinction means that the same CTR improvement
has a different revenue impact depending on the market's
CPC/CPA mix. In predominantly CPA markets, improving
CTR without also improving CR may have limited revenue
effect.

## Web vs App Funnel Differences

The funnel structure is identical on web and app, but
the baseline metrics differ significantly:

- App users tend to show higher STR and CTR — they are
  typically more intentional and engaged than web users.
- CR on app varies by market and partner support for
  app deep-linking.
- Sessions on app are measured differently: app funnel
  analysis uses Active Users and Sessions per User as
  upstream drivers, rather than raw session counts.

For app-specific funnel analysis, always filter by
`context = 'app'` and refer to the app revenue formula
in the ICE framework documentation.
