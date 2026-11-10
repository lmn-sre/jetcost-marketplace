---
type: Feature Flag
description: "Tell the user, on flight results, when the cheapest price found is low against past prices for similar searches."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# BOOK-NOW-PRICE-INDICATOR

A price indicator on the flight results page telling the user that the
cheapest price found is low for this kind of trip. Once the search is
complete, the cheapest price per passenger is compared with a threshold
taken from past prices of comparable searches: same market, route and
trip type, and the same booking-window, season, weekend and trip-length
bands. At or below the threshold, the indicator shows and the cheapest
flight card gets a matching tag; above it, or when no threshold exists
for the search, nothing shows. On desktop layouts the indicator is a
card at the top of the results sidebar; on smaller layouts it is a card
inserted in the result list at `ROW-POSITION`. On the Jetcost site the
sidebar card takes the place of the email-marketing sidebar card, which
is not rendered while this flag is on, even on searches where the
indicator stays hidden. Flights only, on the Jetcost and white-label
sites.

## Configs

### ENABLED
Boolean, default `0`. When the feature is marked *always enabled* in
the backoffice, `ENABLED` has no effect: every eligible request gets the
feature on. Whether it is marked so is live state — check the feature
state, not this file. While the feature is on, the threshold is looked
up for every flight search, the indicator shows as described above and
the email-marketing sidebar card is not rendered on the Jetcost site.
Without the mark, `0`, or no rule setting it, hides the indicator and
lets that card show again.

### PRICE-PERCENTILE
Choice among `p25`, `p30`, `p35`, `p40`, `p45` and `p50`, default
`p25`. Which percentile of past prices is the threshold: with `p25`,
the indicator shows only when the cheapest price is within the cheapest
quarter of past prices for comparable searches; a higher percentile
makes it show on more searches.

### ROW-POSITION
Number, default `0`. Smaller layouts only: position in the result list,
counted from `0`, above which the indicator card is inserted: with `0`
it sits above the first flight card.
