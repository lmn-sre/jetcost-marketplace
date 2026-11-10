---
type: Feature Flag
description: "Shows inline ads when no car results found, controlling partner count."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# MAL-CARS-INLINE-NOT-FOUND

The inline unit of the car rental results page: the cars sibling of
[config/features/mal-flights-inline-not-found.md](/config/features/mal-flights-inline-not-found.md),
the sponsored cards under the no-results message, shown when a car
rental search finds no offers. Unlike on flights, a card carries no
text or price from the advertiser: the advertiser's logo and name, a
fixed Jetcost title with the searched locations and dates, and a "visit
site" button.

It exists on the Jetcost site and on white-label sites, and shows only
while [config/features/mal.md](/config/features/mal.md) is on.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the sponsored cards show on car rental
searches with no results. With `0`, the no-results page shows none.

### MAX-PARTNERS
Number, default `3`. Maximum number of sponsored cards; same as on
flights.
