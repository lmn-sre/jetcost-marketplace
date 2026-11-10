---
type: Feature Flag
description: "Enables exit-unit advertising on flights results page."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# MAL-FLIGHTS-EXITUNIT-PAGE

The exit unit of the flight results page, a MAL Media placement (see
[core/commercials/integration-types.md](/core/commercials/integration-types.md)).
Desktop only: once the page has run MAL's auction on the search, the
user's first click on the page outside the flight cards, the search
form and the other Jetcost units (intercards, promoboxes, W2A elements)
opens, behind the current window, a window with the site of the
advertiser that won (a pop-under), when MAL allows one for that
auction. If no
advertiser bids, that window shows a Jetcost search to everywhere from
the same origin instead, where that search is available.

It opens at most once every 20 minutes per browser and market (country
and language), never on the results of a search whose submit already
opened the search-form exit unit
([config/features/mal-flights-exitunit-form.md](/config/features/mal-flights-exitunit-form.md)),
and not in a browser window in full screen. It exists on the Jetcost
site and on white-label sites, and shows only while
[config/features/mal.md](/config/features/mal.md) is on. One sibling per
product: `MAL-FLIGHTS-EXITUNIT-PAGE`, `MAL-CARS-EXITUNIT-PAGE`.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the pop-under is armed on the flight
results page under the conditions above. With `0`, it never opens.
