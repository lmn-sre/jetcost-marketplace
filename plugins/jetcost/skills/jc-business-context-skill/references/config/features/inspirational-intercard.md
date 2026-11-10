---
type: Feature Flag
description: "Show inspirational flight destination cards between search results."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# INSPIRATIONAL-INTERCARD

An intercard in the flight result list suggesting up to three
destinations similar to the searched one, from the same origin, on the
same dates and for the same passengers, each with a picture and the
cheapest price earlier searches on the market found for it. A
destination is kept when that price is at most `PRICE-DELTA` above the
cheapest price of the current search, or when no price is known, in
which case it shows without one. Clicking a destination starts that
search. On web the intercard loads once the search is complete with
results, needs three destinations to appear, never shows on searches
with flexible dates, and stops appearing for the rest of the browser
session once the user has clicked one of its destinations.

It exists on the Jetcost and white-label sites and in the app: the app
settings carry its on/off state, and the app API returns the same
destinations, with `ROW-POSITION` and `PRICE-DELTA` applied. The same
destinations are also computed for the flight search event the web
sends to Braze, whether or not the flag is on; see
[core/marketing/crm.md](/core/marketing/crm.md) for the inspirational
intercard push campaign.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the web requests the intercard on
eligible searches and the app settings report it on
(`intercards.inspirational_enabled`). With `0`, it never shows on web;
the API still returns destinations to whoever asks.

### ROW-POSITION
Number, default `3`. Position in the result list, counted from `0`,
above which the intercard is inserted: with `3` it sits above the
fourth flight card. When the list never reaches that position, the
intercard does not appear. Also sent to the app with the destinations.

### PRICE-DELTA
Number, default `0.10`. How much more expensive than the cheapest price
of the current search a suggested destination can be, as a fraction:
with `0.10`, up to 10% more. Destinations with no known price are kept
whatever its value.
