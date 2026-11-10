---
type: Feature Flag
description: "Show alternative search suggestions when no flights are found on the search results page."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-NOT-FOUND-INTERCARDS

Search suggestions shown on the flight results page when a search
completes with no results at all, below the "no results" message and
the MAL inline not-found unit (see
[config/features/mal-flights-inline-not-found.md](/config/features/mal-flights-inline-not-found.md)).
They are built from the cheapest prices that earlier searches on the
same market found, in up to two blocks of up to three cards: one with
the same route on nearby dates, and one with the same dates either from
and to nearby airports or, when that finds nothing, to destinations
similar to the searched one. A card starts the search it shows. Each
block has its own switch below, read only when `ENABLED` is on. Flights
only, on the Jetcost and white-label sites.

The app can request the same suggestion lists through its API, which
returns them whatever `ENABLED` and the three block switches say: those
are not read there, nor sent to the app. `AIRPORTS-RADIUS` and the
`DATES-*` numbers apply there only where the feature is on for the app,
their defaults elsewhere; the similar-destinations list reads no config
of this flag.

## Configs

### AIRPORTS-ENABLED
Boolean, default `0`. With `1`, the nearby-airports block is requested:
the three cheapest prices on the searched dates between airports within
`AIRPORTS-RADIUS` of the origin and of the destination, the searched
pair excluded. With `0`, it never shows, and the similar-destinations
block can take its place.

### DATES-ENABLED
Boolean, default `0`. With `1`, the nearby-dates block is requested: the
three cheapest prices on the searched route with the dates moved by up
to `DATES-FLEXIBLE-DATES` days, the searched dates excluded. With `0`,
it never shows.

### DATES-FLEXIBLE-DATES
Number, default `3`. How many days before or after the searched
departure date, and return date on a return search, the nearby-dates
block looks.

### DATES-MAX-TRIP-DURATION
Number, default `5`. Return searches only: how many days longer than
the searched trip a nearby-dates suggestion can last.

### DATES-MIN-TRIP-DURATION
Number, default `5`. Return searches only: how many days shorter than
the searched trip a nearby-dates suggestion can last.

### ENABLED
Boolean, default `0`. With `1`, the blocks switched on below are
requested whenever a search ends with no results. With `0`, none of
them shows.

### INSPIRATIONAL-ENABLED
Boolean, default `0`. With `1`, the similar-destinations block is
requested: up to three destinations similar to the searched one, from
the same origin on the same dates, cheapest known price first; one with
no known price shows without a price. It shows only when the
nearby-airports block has nothing to show. With `0`, it never shows.

### AIRPORTS-RADIUS
Number, default `100`. Radius in kilometres around the searched origin
and destination within which the nearby-airports block looks for
alternative airports.
