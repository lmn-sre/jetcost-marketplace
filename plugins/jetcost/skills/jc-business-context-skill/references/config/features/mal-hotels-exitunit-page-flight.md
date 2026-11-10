---
type: Feature Flag
description: "Opens a hotel advertiser's pop-under from the flight results page of round-trip searches, where the flight results-page exit unit does not run."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# MAL-HOTELS-EXITUNIT-PAGE-FLIGHT

A hotel cross-sell exit unit on the flight results page, a MAL Media
placement (see
[core/commercials/integration-types.md](/core/commercials/integration-types.md)).
It works like the pop-under of
[config/features/mal-flights-exitunit-page.md](/config/features/mal-flights-exitunit-page.md),
desktop only and opened by the same first click, but on a hotel
auction: MAL is asked for hotels in the searched destination city, for
the outbound and return dates and for rooms fitting the searched
passengers, and the window opens on the site of the hotel advertiser
that won. If no advertiser bids, it shows a Jetcost search to everywhere
from the same origin instead.

It runs only on round-trip searches, and only where the flight
results-page exit unit is not armed for that search (off, or held back
by its own limits). It opens at most once every 20 minutes per browser
and market, counted apart from the flight one, and not in a browser
window in full screen. It exists on the Jetcost site and on white-label
sites, and shows only while
[config/features/mal.md](/config/features/mal.md) is on. The MAL webhook
records its clicks in the exit-unit click category (4002), with the
`_XS_POP` suffix on the partner code and, unless bought through
`mdflow`, no integration type.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the hotel pop-under is armed on the
flight results page under the conditions above. With `0`, it never
opens.
