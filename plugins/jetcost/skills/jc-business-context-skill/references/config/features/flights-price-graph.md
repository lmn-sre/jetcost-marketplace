---
type: Feature Flag
description: "Show a chart of the average price per month on the SEO page of a flight route."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-PRICE-GRAPH

A chart on the SEO page of an airport route (see
[core/product/seo-pages.md](/core/product/seo-pages.md)): the average
price of each month, starting from the current one, with the cheapest
and the most expensive month highlighted. The figures come from
Jetcost's BI data service; with none for the route, the chart is not
shown. When the chart shows, the page's structured data for search
engines also gains a `Dataset` block with the same monthly averages. The
flag can be targeted by the visitor's country, from the IP address, as
well as by market. It exists on the Jetcost and white-label sites.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the chart, and its structured data,
show on route pages whenever there are figures for the route. With `0`,
neither shows.
