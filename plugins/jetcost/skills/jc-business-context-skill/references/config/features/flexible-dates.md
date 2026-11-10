---
type: Feature Flag
description: "Enable flexible date search with suggestion modal for cheaper alternatives."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLEXIBLE-DATES

The flexible-dates option of flight searches: next to each date the
user can pick the exact date, -1, +1, ±1, ±2 or ±3 days, and the search
then also covers the neighbouring dates. The choice is offered in the
search form of the Jetcost and white-label sites. The flag also decides
whether a flexibility chosen in the app reaches the search: where it is
off, app searches run on exact dates, although the app settings always
report flexible dates as available, up to 3 days. On the web, searches
with flexible dates get none of the nearby-dates, nearby-airports and
inspirational intercards (see
[config/features/inspirational-intercard.md](/config/features/inspirational-intercard.md)).

On the Jetcost site only, a suggestion can also point the user to the
option when the chosen departure is far enough ahead.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the search form offers the
flexible-dates choice and the chosen flexibility is sent with the
search, from web and app. With `0`, the choice is hidden and every
search runs on exact dates.

### SUGGESTION-MODAL-BW-THRESHOLD
Number, default `45`. Days from today to the chosen departure from
which the suggestion shows: with `45`, it shows for departures 45 days
ahead or more. Read only when `SUGGESTION-MODAL-ENABLED` is on.

### SUGGESTION-MODAL-ENABLED
Boolean, default `0`. Jetcost site only, and only with `ENABLED` on.
With `1`, once the user has picked the dates of a departure at least
`SUGGESTION-MODAL-BW-THRESHOLD` days ahead (both dates, on a return
search), the date picker dims the calendar and highlights the
flexible-dates choice; tapping outside dismisses it for good in that
browser. With `0`, no suggestion shows.
