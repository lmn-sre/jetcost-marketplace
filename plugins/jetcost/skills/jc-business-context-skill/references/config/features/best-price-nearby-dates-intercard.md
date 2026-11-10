---
type: Feature Flag
description: "Show best-price flight deals across nearby dates in intercard."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# BEST-PRICE-NEARBY-DATES-INTERCARD

An intercard in the flight result list offering the searched route on
dates near the searched ones, never on the searched departure date nor,
on a return search, the searched return date. Each deal is the cheapest
price earlier searches on the same market found for those dates; only
deals cheaper than the cheapest price of the current search are kept,
cheapest first. Clicking a deal starts that search. On web the intercard
loads once the search is complete with results, never shows on searches
with flexible dates, and stops appearing for the rest of the browser
session once the user has clicked one of its deals. On web it can also
carry the price navigator, a fold-out list or grid of prices around the
searched dates (`ENABLE-PRICE-NAVIGATOR` and the `PRICE-NAVIGATOR-*`
configs): it lives inside the intercard, so it shows only when the
intercard has deals.

It exists on the Jetcost and white-label sites and in the app: the app
settings carry its on/off state (`intercards.nearby_dates_enabled`
from settings v2; settings v1 sends it as `airportsIntercardsEnabled`,
swapped with the nearby-airports key), and the app API returns the same
deals with `ROW-POSITION`; the price navigator is web only. Whether or
not the flag is on, the flight search event sent to Braze also carries
these deals: up to six from the web (`intercards.nearbyDates`), and from
the app only the cheapest one, as a search command
(`route_nearby_dates_command_api`). The intercard push campaigns of
[core/marketing/crm.md](/core/marketing/crm.md) are app pushes.

Rules can also target persona, app platform and app version. Persona
rules apply to the configs below when the deals are computed and to the
app's combined intercard request, not to the web's on/off check;
platform and version rules apply only to the on/off state in the app
settings.

## Configs

### DEALS-LIMIT
Number, default `3`. Maximum number of deals in the intercard. The web
shows at most three whatever the value; the app receives up to this
many.

### ENABLE-PRICE-NAVIGATOR
Boolean, default `0`. Web only. With `1`, the intercard adds the price
navigator on economy-class searches; a price in it starts that search.
On desktop it is a grid of departure dates, and return dates on a return
search, up to two days either side of the searched ones, which the user
can shift, shown at most twice
per browser session and only when enough of it has prices (see
`PRICE-NAVIGATOR-HIDING-PRICE-PERCENTAGE`). On mobile it is a list of
prices grouped by week, built from the other `PRICE-NAVIGATOR-*`
configs. With `0`, the intercard shows its deals only.

### ENABLED
Boolean, default `0`. With `1`, the intercard is requested on eligible
web searches, and the app settings and the app's combined intercard
request report it as on. With `0`, it never shows, and neither does the
price navigator.

### ROW-POSITION
Number, default `5`. Position in the result list, counted from `0`,
above which the intercard is inserted: with `5` it sits above the sixth
flight card. When the list never reaches that position, the intercard
does not appear. Also sent to the app with the deals.

### TRAVELER-TYPES
String, default `leisure|leisure_strict|undefined|unknown`. Not read by
the web site or by the app backend: an older app settings service sent
it to the app, the current ones do not. By its name and values, it
listed the traveller types the intercard was meant for.

### TRIP-TYPES
String, default `round_trip|one_way`. Not read by the web site or by the
app backend, like `TRAVELER-TYPES`. By its name and values, it listed
the trip types, return and one-way, the intercard was meant for.

### FLEXIBLE-DATES
Number, default `2`. How many days before or after the searched
departure date, and return date on a return search, the intercard looks
for deals.

### MAX-TRIP-DURATION
Number, default `3`. Return searches only: how many days longer than the
searched trip a deal can last.

### MIN-TRIP-DURATION
Number, default `3`. Return searches only: how many days shorter than
the searched trip a deal can last.

### PRICE-NAVIGATOR-FLEXIBLE-DATES
Number, default `3`. Mobile price navigator only: how many days before
or after the searched departure date, and return date on a return
search, its list covers. The searched dates themselves are left out.

### PRICE-NAVIGATOR-HIDING-PRICE-PERCENTAGE
Number, default `0.8` in the backoffice, `0` in the site's code. Desktop
price navigator only: the share of the grid that must have a price for
the navigator to show, as a fraction of its cells less one, rounded:
with `0.8` and a five-by-five grid, 19 priced cells. Where no rule sets
it the site uses `0`, so the grid shows whenever it loads, even with no
price in it.

### PRICE-NAVIGATOR-MAX-TRIP-DURATION
Number, default `3`. Mobile price navigator only, return searches: how
many days longer than the searched trip an entry of its list can last.

### PRICE-NAVIGATOR-MIN-TRIP-DURATION
Number, default `3`. Mobile price navigator only, return searches: how
many days shorter than the searched trip an entry of its list can last.

### PRICE-THRESHOLD-PERCENT
Number, default `0.10`. Has no effect: the code that selects the deals
reads it under a misspelled code, so a deal only has to be cheaper than
the cheapest price of the current search, whatever the value. By its
name, it is the minimum discount on that price a deal should offer, as a
fraction: `0.10` for 10%.
