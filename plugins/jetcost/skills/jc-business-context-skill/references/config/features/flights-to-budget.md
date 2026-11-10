---
type: Feature Flag
description: "Add a budget mode to the Jetcost flights search form, leading to a page of round-trip deals within a chosen price and month."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-TO-BUDGET

A budget mode for the flights search form of the Jetcost home page: a
switch turns the form into a departure airport, a month and a maximum
price, and its submit opens a page of round trips from that airport,
departing in that month, at or below that price. The page shows one card
per destination, cheapest first, with the destination's photo, the
price, the dates and the number of nights; a click relaunches the search
on those dates. Only destinations that belong to an active travel theme
are listed, and the prices are not live: they come from the market's
searches of the last 15 days, the legal limit on cached prices explained
in [core/product/seo-pages.md](/core/product/seo-pages.md). It exists on
the Jetcost site only.

## Configs

### BUDGET-LIST
List of numbers, default `100,200,300,500,1000`. The maximum prices the
budget picker offers, in the market's currency, each shown as "less than
X". The budget page accepts only these values: an address with another
value gets a not-found page.

### ENABLED
Boolean, default `0`. With `1`, the home page form shows the budget
switch and the budget page works. With `0`, the switch is not shown and
the budget page redirects to the travel themes home page, or to the
flights home page where there is none.

### SHOW-NEW-BADGE
Boolean, default `0`. With `1`, a "New" label points at the budget
switch of the home page form while budget mode is off. It is never shown
on the budget page itself.
