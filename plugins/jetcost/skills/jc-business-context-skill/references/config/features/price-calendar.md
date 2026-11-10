---
type: Feature Flag
description: "Colour each day of the Jetcost flight date picker by how prices for a departure on that day compare on the route."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# PRICE-CALENDAR

Price bars in the flight date picker. Once origin and destination are
chosen, each day of the calendar gets a green, orange or red bar by how
prices for a departure on that day have compared on the route, from
cheaper to more expensive, with a legend running from one to three
currency symbols and an information tooltip. No price is shown, and a
day with no data has no bar. The colours come from a price calendar
service, per market, route and trip type (one-way or return), and are
keyed on the departure date only: on a return search the same colours
stay on the calendar while the user picks the return date. They are
fetched when the date picker opens on a route it has not loaded yet.
The colour of the chosen dates is recorded as `date_color` on the
search tracking events: `green`, `yellow`, `red` or `none` per date,
joined by `_` on a return search, or `not_seen` when the calendar never
loaded that route. It exists on the Jetcost site only; on white-label
sites the flag has no effect.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the date picker shows the price bars as
described above. With `0`, the calendar has no bars and no legend, and
the search events carry no `date_color`.
