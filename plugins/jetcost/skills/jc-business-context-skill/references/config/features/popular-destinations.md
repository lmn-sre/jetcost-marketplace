---
type: Feature Flag
description: "Show a hand-picked list of destinations, with photo and link, in a box on the Jetcost flights home page."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# POPULAR-DESTINATIONS

A "popular destinations" box on the Jetcost flights home page: a
hand-picked list of destination cities, each with its photo, its country
and a link to the page of flights to that city. The list and its order
are `IATAS`. The box also holds the `destination_right` ad slot (see
[config/features/web-ads.md](/config/features/web-ads.md)), which is not
shown when the box is not. It exists on the Jetcost site only; on
white-label sites the flag has no effect.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the box shows the destinations of
`IATAS`. With `0`, the box and its ad slot are not shown.

### IATAS
List of airport or city codes (IATA), empty by default. The destinations
of the box, in the order given. A code with no valid airport or no photo
on the site is left out without notice, and an empty list hides the box.
The same destinations are left out of the "most searched cities" link
box of the same page, so a city is not listed twice.
