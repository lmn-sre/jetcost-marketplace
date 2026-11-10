---
type: Feature Flag
description: "Display featured flight deals on homepage."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-HOMEPAGE-DEALS

A carousel of flight deals at the top of the Jetcost flights home page,
titled after the user's departure city. Each card is a round trip from
that airport, with the destination's photo, the price, the dates and how
many days ago the price was found; a click relaunches the search on that
route and those dates. The departure airport is the one of the user's
last search, otherwise the market's most searched departure airport.
The prices are not live: they are the cheapest found on the market's
searches of the last 15 days, the legal limit on cached prices explained
in [core/product/seo-pages.md](/core/product/seo-pages.md), one card per
destination, cheapest first. It exists on the Jetcost site only; on
white-label sites the flag has no effect.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the carousel shows on the home page
whenever there are enough deals (see `MIN-DEALS`). With `0`, it never
shows.

### MAX-DEALS
Number, default `12`. Maximum number of cards in the carousel, one per
destination.

### MIN-DEALS
Number, default `5`. Minimum number of deals the carousel needs: with
fewer, it is not shown at all. No other departure airport is tried.
