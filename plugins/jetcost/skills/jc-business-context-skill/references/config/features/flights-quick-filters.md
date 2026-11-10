---
type: Feature Flag
description: "Enable quick filter capsules for airlines, price clusters, and stops on results."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-QUICK-FILTERS

One-tap filter blocks at the top of the flight results filters, above
the detailed filters of
[config/features/flights-filters.md](/config/features/flights-filters.md):
in the sidebar on desktop layouts, at the top of the filter panel on
smaller ones. Four blocks exist: direct flights only, departure-time
windows for the outbound and return flights, the most relevant
airlines, and price ranges (budget, standard, premium). The web site
decides which blocks appear and in which order; what each block offers,
and whether it has anything to offer, comes built with the search
results, so three of the configs below are read by the search backend,
not by the site. The search backend builds the blocks only with
`ENABLED` at `1`, twice: on the offers shown (`quick_filters`) and on
the base set of offers (`quick_filters_base`). The departure-time
windows are fixed in code: night, morning, afternoon and evening.
Flights only, on the Jetcost and white-label sites.

## Configs

### BADGE-ORDER
Ordered list among `direct`, `time-selection`, `relevant-carriers-ids`,
`range-price` and `fare-baggages`; with no rule it is `direct`,
`time-selection`, `relevant-carriers-ids`, `range-price`. The blocks
that appear, in this order; a block left out does not appear.
`fare-baggages` matches no block and is ignored. Leaving out
`time-selection` also hides the departure-time chip of the mobile filter
bar.

### ENABLED
Boolean, default `0`. With `1`, the search backend builds the blocks
and those of `BADGE-ORDER` appear. With `0`, none appears, and on
smaller layouts the sorting options inside the filter panel are not
rendered either, which leaves those layouts with no control to change
the sort order.

### PRICE-CLUSTER-RANGE
Ordered list of `name-percentile` pairs, backoffice default
`budget-30,standard-60,premium-90`; the names are free. The price bands
of the price block. The search backend sorts the offers' displayed
prices and builds the bands in sequence: the first starts at the
cheapest price, each ends at its percentile (linear interpolation,
rounded), and the next starts where the previous one ends. With the
backoffice default, budget runs from the cheapest price to the 30th
percentile, standard from there to the 60th and premium to the 90th;
prices above the last percentile fall in no band. A band is active when
at least one price falls in it. With no rule setting it, the search
backend uses an empty list (whatever the backoffice default), so there
are no bands.

### PRICE-CLUSTER-THRESHOLD
Number, default `10`. The minimum spread, in percent, between the
cheapest and the most expensive price: when
`(1 − cheapest / most expensive) × 100` is at or below it, the search
backend computes no band, and every band arrives with no bounds and
inactive. Not read by the web site, which shows the bands it receives
and greys out the inactive ones.

### TOP-AIRLINES-COUNT
Number, backoffice default `3`. The maximum number of airlines in the
airlines block (`relevant_carriers`). The search backend ranks airlines
by the number of itineraries operated by that airline alone, adds the
itineraries of child airlines to their parent, and leaves out airlines
with none. With no rule setting it, the search backend uses `0`
(whatever the backoffice default), so the block lists no airline.
