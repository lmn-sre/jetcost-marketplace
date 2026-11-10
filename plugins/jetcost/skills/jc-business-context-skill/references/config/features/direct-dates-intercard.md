---
type: Feature Flag
description: "Suggest nearby dates with a direct flight on the searched route, in a results intercard shown when the search has no direct flight."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# DIRECT-DATES-INTERCARD

An intercard in the flight result list offering the searched route on
nearby dates that have a direct flight: dates for which earlier searches
on the same market found a direct price, never the searched departure
date nor, on a return search, the searched return date. Deals are ordered
by that direct price, cheapest first, but each one shows the cheapest
price found for its dates, direct or not, and there is no condition on
the price of the current search. Clicking a deal starts that search. On
web the intercard loads once the search is complete and only when its
results contain no direct flight; it also shows on searches with
flexible dates, and stops appearing for the rest of the browser session
once the user has clicked one of its deals.

It exists on the Jetcost and white-label sites and in the app: the app
settings carry its on/off state (`intercards.direct_dates_enabled`,
settings v2 and later), and the app API returns the same deals with
`ROW-POSITION`, though the app's combined intercard request leaves this
intercard out. Whether or not the flag is on, the flight search event
sent to Braze also carries these deals: up to six from the web
(`intercards.directDates`), and from the app only the cheapest one, as
a search command (`route_direct_command_api`), and only when the app
reports that the search found no direct flight. The intercard push
campaigns of [core/marketing/crm.md](/core/marketing/crm.md) are app
pushes.

Rules can also target persona, CTR category, app platform and app
version. Persona rules apply to the configs below when the deals are
computed, not to the on/off checks; platform and version rules apply
only to the on/off state in the app settings; CTR-category rules never
match, since no code passes a category.

## Configs

### DEALS-LIMIT
Number, default `3`. Maximum number of deals in the intercard. The web
shows at most three whatever the value; the app receives up to this
many.

### ENABLED
Boolean, default `0`. With `1`, the intercard is requested on eligible
web searches, and the app settings report it as on. With `0`, it never
shows.

### ROW-POSITION
Number, default `3`. Position in the result list, counted from `0`,
above which the intercard is inserted: with `3` it sits above the fourth
flight card. When the list never reaches that position, the intercard
does not appear. Also sent to the app with the deals.

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
