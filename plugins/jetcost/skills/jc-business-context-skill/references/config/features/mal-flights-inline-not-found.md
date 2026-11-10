---
type: Feature Flag
description: "Shows inline ads when no flight results found, controlling partner count."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# MAL-FLIGHTS-INLINE-NOT-FOUND

The inline unit of the flight results page, a MAL Media placement (see
[core/commercials/integration-types.md](/core/commercials/integration-types.md)).
When a search finds no flights, or its results fail to load, the page
shows under the no-results message up to `MAX-PARTNERS` sponsored cards,
filled by a MAL auction on the same search: the advertiser's logo, a
title and a description, a "from" price when the advertiser sends one,
and a "visit site" button. A click on a card opens the advertiser's
site in a new tab.

It exists on the Jetcost site and on white-label sites, on every device
the flag's rules allow, and shows only while
[config/features/mal.md](/config/features/mal.md) is on. One sibling per
product: `MAL-FLIGHTS-INLINE-NOT-FOUND`, `MAL-CARS-INLINE-NOT-FOUND`.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the sponsored cards show on flight
searches with no results. With `0`, the no-results page shows none.

### MAX-PARTNERS
Number, default `3`. Maximum number of sponsored cards; fewer show when
fewer advertisers bid. `0` also means 3.
