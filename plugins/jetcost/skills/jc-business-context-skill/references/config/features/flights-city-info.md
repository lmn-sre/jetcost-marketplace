---
type: Feature Flag
description: "Show a box of key facts about a destination or route (cheapest price and month, flight time and frequency, airlines) on Jetcost airport and route SEO pages."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-CITY-INFO

A "city info" box on three kinds of SEO pages of the Jetcost site (see
[core/product/seo-pages.md](/core/product/seo-pages.md)): flights from
an airport, flights to an airport, and flights on an airport route. Its
tiles give facts about the city or route: the cheapest price of the last
15 days, the cheapest month to fly, the average flight time, the average
number of direct flights per week, the airlines that fly it most (up to
three), and the earliest and latest departure times. The figures come
from Jetcost's BI data service: a tile with no figure is left out, and
the box is not shown when there is none. The flag can be targeted by the
visitor's country, from the IP address, as well as by market. It exists
on the Jetcost site only; on white-label sites the flag has no effect.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the box shows on those pages whenever
there are figures for them. With `0`, it never shows.
