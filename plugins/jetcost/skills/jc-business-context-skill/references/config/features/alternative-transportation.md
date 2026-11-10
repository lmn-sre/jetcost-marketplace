---
type: Feature Flag
description: "Let train, bus and mixed itineraries into flight results, route by route: next to the flights or as an intermediate card."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# ALTERNATIVE-TRANSPORTATION

Whether flight searches can return alternative transportation (train,
bus and mixed itineraries that some partners sell next to flights) and,
route by route, how it is shown. It is read by the search backend that
builds the flight results, not by this site's own code (in the
backoffice it is a legacy-backend flag, with no profile preview), so it
acts on everything that shows those results: the Jetcost and white-label
sites and the app. Rules can also target app version: the search
backend checks the version only on app requests, so a rule scoped on
app version with no site constraint also applies to the web.

With the flag on, the treatment depends on the route: for each country,
origin and destination, the backoffice's list of alternative
transportation routes (`alternative_transportation_routes`) sets one of
three types. `NOAT`, or a route
missing from the list, gets no alternative transportation. `ATFIRST`
lets train, bus and mixed itineraries into the main list, next to the
flights. `ATINTERCARD` takes the itineraries that are not flights only
out of the main list, and the search backend picks the best of them as
the intermediate card of the results (`intercard_itinerary_id`),
without reordering anything. On the web site that card is shown first
on each results page until a transport filter including every
non-flight transport type is applied; it then stays hidden until the
page is reloaded. Clicking it selects all transports, bringing back the
hidden itineraries.

## Configs

### ENABLED
Boolean, default `0`. With `1`, alternative transportation follows the
route list above. With `0`, no route gets alternative transportation.
