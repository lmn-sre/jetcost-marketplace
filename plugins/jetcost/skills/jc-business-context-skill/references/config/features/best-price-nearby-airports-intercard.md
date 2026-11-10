---
type: Feature Flag
description: "Display best prices for nearby airports in results intercard."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# BEST-PRICE-NEARBY-AIRPORTS-INTERCARD

An intercard in the flight result list offering the same trip, on the
same dates, between other airports near the searched origin and
destination: both airports change, except at an end searched as a city
with several airports, which can keep one of that city's airports. Each
deal is the cheapest price earlier searches on the same market found
for that pair; only deals cheaper than the cheapest price of the
current search are kept, cheapest first. Clicking a deal starts that
search. On web the intercard loads once the search is complete with
results, never shows on searches with flexible dates, and stops
appearing for the rest of the browser session once the user has clicked
one of its deals.

It exists on the Jetcost and white-label sites and in the app: the app
settings carry its on/off state (`intercards.nearby_airports_enabled`
from settings v2; settings v1 sends it as `datesIntercardsEnabled`,
swapped with the nearby-dates key), and the app API returns the same
deals with `ROW-POSITION`. Whether or not the flag is on, the flight
search event sent to Braze also carries these deals: up to six from the
web (`intercards.nearbyAirports`), and from the app only the cheapest
one, as a search command (`route_nearby_airports_command_api`). The
intercard push campaigns of
[core/marketing/crm.md](/core/marketing/crm.md) are app pushes.

Rules can also target persona, CTR category, app platform and app
version. Persona rules apply to the configs below when the deals are
computed and to the app's combined intercard request, not to the web's
on/off check; platform and version rules apply only to the on/off state
in the app settings; CTR-category rules never match, since no code
passes a category.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the intercard is requested on eligible
web searches, and the app settings and the app's combined intercard
request report it as on. With `0`, it never shows.

### TRAVELER-TYPES
String, default `leisure|leisure_strict|undefined|unknown`. Not read by
the web site or by the app backend: an older app settings service sent
it to the app, the current ones do not. By its name and values, it
listed the traveller types the intercard was meant for.

### TRIP-TYPES
String, default `round_trip|one_way`. Not read by the web site or by the
app backend, like `TRAVELER-TYPES`. By its name and values, it listed
the trip types, return and one-way, the intercard was meant for.

### DEALS-LIMIT
Number, default `3`. Maximum number of deals in the intercard. The web
shows at most three whatever the value; the app receives up to this
many.

### PRICE-THRESHOLD-PERCENT
Number, default `0.10`. Has no effect: the code that selects the deals
reads it under a misspelled code, so a deal only has to be cheaper than
the cheapest price of the current search, whatever the value. By its
name, it is the minimum discount on that price a deal should offer, as a
fraction: `0.10` for 10%.

### RADIUS
Number, default `100`. Radius in kilometres around the searched origin
and destination within which the intercard looks for alternative
airports.

### ROW-POSITION
Number, default `10`. Position in the result list, counted from `0`,
above which the intercard is inserted: with `10` it sits above the
eleventh flight card. When the list never reaches that position, the
intercard does not appear. Also sent to the app with the deals.
