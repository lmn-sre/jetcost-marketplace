---
type: Feature Flag
description: "Enables exit-unit advertising on cars results page."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# MAL-CARS-EXITUNIT-PAGE

The exit unit of the car rental results page: the cars sibling of
[config/features/mal-flights-exitunit-page.md](/config/features/mal-flights-exitunit-page.md),
the same desktop-only pop-under, opened by the user's first click on
the page outside the car rental cards, the search form and the
promoboxes, with the same limits: at most once every 20 minutes per
browser and market, never on the results of a search whose submit
already opened
[config/features/mal-cars-exitunit-form.md](/config/features/mal-cars-exitunit-form.md).
If no advertiser bids, the window shows the Jetcost car rental home page
instead.

It exists on the Jetcost site and on white-label sites, and shows only
while [config/features/mal.md](/config/features/mal.md) is on.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the pop-under is armed on the car rental
results page. With `0`, it never opens.
