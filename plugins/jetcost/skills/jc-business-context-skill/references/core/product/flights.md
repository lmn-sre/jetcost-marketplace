---
type: Product Concept
description: "Defines the flight domain terminology — itinerary, trip, segment, offer — and flight/search type distinctions."
tags: [product]
timestamp: 2026-07-22T00:00:00Z
---

# The Flight Domain

## Overview

Jetcost is a flight metasearch engine. Understanding
how flights are structured, combined, and compared
is fundamental to interpreting product decisions,
partner integrations, and revenue dynamics.

## How Flight Search Works

When a user performs a search, Jetcost queries its
partner integrations in real time and aggregates
the results into a unified list of itineraries.
Each itinerary represents a way to get from origin
to destination on the requested dates.

The core challenge of a metasearch engine is
**normalisation**: offers from different partners
use different data formats, pricing structures,
and availability signals. Jetcost normalises these
into a comparable format before displaying results.

## Core Terminology

### Itinerary

The full travel package searched by the user.
An itinerary contains one or more trips:

- **One-way**: one trip (outbound only)
- **Return**: two trips (outbound + inbound)

### Trip

A single directional block of flights within
an itinerary. In a return search, the outbound
journey is one trip and the return journey is
a separate trip. Each trip has its own origin,
destination, and departure date.

### Segment

A single flight leg within a trip — one takeoff
and one landing. A direct trip consists of one
segment. A trip with one stopover consists of
two segments. The number of segments determines
whether a trip is direct or connecting.

```
Itinerary
├── Trip (outbound)
│   └── Segment (LHR → FCO)        ← direct: 1 segment
└── Trip (inbound)
    ├── Segment (FCO → AMS)         ← connecting: 2 segments
    └── Segment (AMS → LHR)
```

### Offer

A specific price for a specific itinerary from
a specific partner. One itinerary can have
multiple offers — the same trips available at
different prices from different OTAs or airlines.

The distinction between itinerary and offer is
critical: an **impression** is an itinerary
displayed to the user, a **click** is a specific
offer selected.

## Flight Types

### Direct vs Connecting

- **Direct flight**: a trip with a single segment,
  no intermediate stops.
- **Connecting flight**: a trip with two or more
  segments, requiring a layover at an intermediate
  airport. The full journey is typically under a
  single booking.

### Self-Transfer

A journey where the user independently manages
the connection between two separate bookings.
If the first flight is delayed and the user misses
the second, no automatic rebooking or compensation
applies — the user holds two independent contracts.

Self-transfer itineraries are typically cheaper
but carry higher risk for the traveller. They must
be clearly labelled to manage user expectations
and avoid post-click dissatisfaction that would
hurt CR on CPA deals.

### Virtual Interline

A Virtual Interline (VI) itinerary combines flights
from two or more airlines that do not have a
formal interline agreement — meaning they do not
officially cooperate on connecting passengers or
baggage transfer.

Jetcost (or a VI provider) algorithmically
constructs these combinations by identifying
flight pairs where the connection time is
feasible and the price combination is competitive.
The result is a new itinerary that does not exist
in any single airline's inventory.

Virtual Interline expands the universe of available
itineraries significantly, especially for routes
where no single carrier offers a direct or
one-stop connection at a competitive price.

**Key implications:**

- VI itineraries are typically self-transfer —
  the passenger holds separate tickets and bears
  the risk of missed connections.
- Pricing is the sum of two independent fares,
  which can be very competitive compared to
  traditional connecting flights.
- VI itineraries require clear disclosure to
  users to avoid confusion about baggage,
  check-in, and connection responsibility.
- A VI click always points to a **single partner**.
  The user is sent to one partner, which sells the
  whole combination and takes care of issuing and
  managing the two separate tickets. There is no
  split of the click across the carriers involved.
- From a revenue perspective a VI click therefore
  behaves like any other click on that partner —
  same commercial model, same attribution, no
  special multi-partner logic.

## Search Types

### One-Way

A single trip from origin to destination.
Typically lower average ticket value than
return searches.

### Return

An itinerary with two trips: outbound and
inbound. The most common search type across
most markets. Higher average ticket value
is favourable for CPA commission levels.

## Fare Conditions

Flights within the same itinerary can vary
significantly in conditions: baggage allowance,
change and cancellation flexibility, seat
selection. These conditions affect user choice
and post-click conversion, particularly on CPA
deals where unexpected restrictions on the
partner site reduce the likelihood of booking.

## Domestic vs International Flights

The distinction matters significantly for revenue:

- **Domestic flights** tend to have lower ticket
  values, lower CPC rates, and lower CPA
  commissions. A domestic Italian flight averages
  around €100; a domestic US flight can exceed
  €500.

- **International flights** carry higher ticket
  values and typically stronger monetisation,
  especially on long-haul routes.

This is why raw click volume is not comparable
across markets — a click in a large-geography
market (US, AU) is structurally worth more than
a click in a small-geography market (IT, ES).
See [core/business/markets.md](/core/business/markets.md) for further detail.
