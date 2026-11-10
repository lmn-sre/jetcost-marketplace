---
type: Feature Flag
description: "Displays promotional boxes with general and placement-based rules."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# PROMOBOX

Named "Promobox Flights" in the backoffice. Switches on the sponsored
promoboxes of the flight results page, a MAL Core placement (see
[core/commercials/integration-types.md](/core/commercials/integration-types.md)),
and decides how many of each type show and where. When on, the results
page runs a MAL promobox auction on the search; each ad it returns is a
promobox with a type, the MAL network that sold it (see
[core/commercials/mal/networks.md](/core/commercials/mal/networks.md))
and the advertiser. Each type belongs to an area of the page, a pairing
kept outside this flag: `core`, inside the results list (the page shows
the types `sponsored-flight-itinerary`, `inline` and `click-to-call`
there), or `shoulder`, the right-hand column, desktop only
(`right-column-flight-itinerary` and `compare-right-shoulder`). The two
rule configs below then place them, and a promobox no rule places is not
shown. The page waits up to 20 seconds for the auction (fixed in code),
then places what has arrived, and reports to Argo
(`promobox_auction_complete`) how many promoboxes the auction returned
and how many the rules placed; the placed count includes right-column
boxes on phones and tablets, which are not rendered, and sponsored
itineraries hidden by the filters. A sponsored itinerary is hidden
while it does not match the filters the user has set.

Like every MAL placement, nothing shows while
[config/features/mal.md](/config/features/mal.md) is off: the auction
runs on its token. It exists on the Jetcost and white-label sites. The
flag is also sent to the mobile app with its settings, as
`mal.promoboxes.flights` (settings API v2+): on or off, and both rule
sets reshaped for the app; what the app does with them is decided inside
the app. The car results have their own flag,
[config/features/promobox-cars.md](/config/features/promobox-cars.md).

## Configs

### ENABLED
Boolean, default `0`. With `1`, flight results pages run the promobox
auction and place its promoboxes by the rules below. With `0`, no
promobox auction runs and no promobox shows on the flight results; the
other MAL placements are not affected.

### GENERAL-RULES
Caps per promobox type, empty by default. A list of entries, each a
promobox type and a maximum number (`maxElements`): the page never shows
more promoboxes of that type, counted over the whole page. A type with
no entry has no cap.

### PLACEMENT-RULES
The slots promoboxes can fill, empty by default: with no rule, no
promobox shows, even with the flag on. A list of entries, each one slot:
an area (`core` or `shoulder`), a position, and two lists, `priorities`
and `exclusions`, whose items name a promobox type and, optionally, a
network and an advertiser (any, when left out). In `core` the position
counts result rows from the top, `0` being above the first result; in
`shoulder` it orders the slots of the column. Slots are filled in order
of position, each with one promobox, and a promobox fills one slot only.
The candidates are the area's promoboxes whose type is still under its
cap, minus those matching an exclusion; the one matching the highest
priority wins, otherwise the auction's own order decides. With
`exclude_all` set on the slot, only promoboxes matching a priority can
fill it and exclusions are ignored. A slot no promobox can fill stays
empty.
