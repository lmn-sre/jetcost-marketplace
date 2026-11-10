---
type: Feature Flag
description: "The detailed filters of the flight results page, and the order of the filters and of the mobile filter chips."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-FILTERS

The detailed filters of the flight results page: in the sidebar on
desktop layouts, in the filter panel on smaller ones, where a bar of
filter chips above the results also opens them. They narrow the results
by stops, transport type, trip dates and nights, flight duration, price,
airports, stopover airports, payment-method fees (ordered by
[config/features/filter-payment-methods.md](/config/features/filter-payment-methods.md)),
airlines, flexible fares and partners; each filter shows only when it
applies, for example trip dates only on flexible-date searches. The
one-tap blocks above them are
[config/features/flights-quick-filters.md](/config/features/flights-quick-filters.md).
Flights only, on the Jetcost and white-label sites; the app does not
read it.

## Configs

### SORT
Ordered list of filter names, by default `flex-fares`, `stops`,
`transports`, `trip-duration`, `departure-days`, `duration`, `time`,
`price`, `airports`, `pmfees`, `carriers-ids`, `partners`,
`stopover-airports`. The order of the filters in the panel and of the
filter chips on smaller layouts; a filter left out of the list does not
appear at all. `time` has no filter of its own in the panel: it only
places the chip that opens the departure-time block of the quick
filters. `SORT` does not order the results: the search backend does,
see [core/product/sorting.md](/core/product/sorting.md).

### ENABLED
Boolean, default `1`. When the feature is marked *always enabled* in
the backoffice, `ENABLED` has no effect: every eligible request gets the
feature on. Whether it is marked so is live state — check the feature
state, not this file. `SORT` applies either way. Without the mark, `0`,
or no rule setting it, would leave the filter panel on its loading
placeholder, with no filter in it: the quick filters and, on smaller
layouts, the sorting options of the panel disappear too.
