---
type: Feature Flag
description: "Show a box of cheap flight deals from the user's departure airport on the Jetcost flights product page."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-PRODUCT-PAGE-DEALS

A deals box on the flights product page of the Jetcost site, the landing
page of the flights product. It lists cheap flights from the user's
departure airport in up to three tabs, round trip, one way and direct
flights, with up to 8 deals each: one per destination, cheapest first; a
click relaunches the search on that route and those dates. The prices
are not live: they come from the market's searches of the last 15 days,
the legal limit on cached prices explained in
[core/product/seo-pages.md](/core/product/seo-pages.md).

The departure airport is the one of the user's last search; without one,
the airport nearest to the user's location when the user has given the
marketing consent, otherwise the market's most searched departure
airport. The box shows only when at least one tab has 4 deals or more;
when the chosen airport has fewer, the market's most searched departure
airport is tried instead.
Both numbers, 4 and 8, are fixed in code. On phones a click on a deal
can open the app instead, through `INTERNAL-OIA-NEW-DEALS` of
[config/features/mobile-app-oia.md](/config/features/mobile-app-oia.md).
It exists on the Jetcost site only.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the product page shows the deals box
whenever there are enough deals. With `0`, it never shows.
