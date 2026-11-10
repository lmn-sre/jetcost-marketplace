---
type: Feature Flag
description: "Show non-blocking W2A invitations on flight results (sidebar, in-feed row, toast, save icon) that open an app download modal."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-RESULTS-W2A-ELEMENTS

Four non-blocking W2A elements on the flight results page, each inviting
the user to the app with something the app offers and the web does not:
three are price-alert invitations, one is a "save this flight" icon.
None of them does anything on web. Each one opens the same W2A modal, in
its price-alert or save-flight wording: a QR code and store badges on
desktop, a button that opens the app on mobile. The QR code and the
button use the element's own dynamic link, which opens the app on the
same search; the save icon's link also carries the flight and its price.

| Surface | Where | Switched on by | Booking window |
|---|---|---|---|
| Sidebar | price-alert toggle in the results sidebar, desktop layout only | `SIDEBAR-ENABLED` | never bound |
| In-feed row | price-alert toggle between flight cards | `IN-FEED-POSITIONS` | `IN-FEED-BOOKING-WINDOW-BOUND` |
| Toast | price-alert card at the bottom of the screen | `TOAST-ENABLED` | `TOAST-BOOKING-WINDOW-BOUND` |
| Save icon | on each flight card and in the flight detail | `BOOKMARK-ENABLED` | never bound |

The toggles are not real switches: they turn on, open the modal and
turn back off when it closes.

Unlike the blocking page and
[config/features/flights-results-w2a-bottom-sheet.md](/config/features/flights-results-w2a-bottom-sheet.md),
these elements are also shown to the control group of the
`W2A-BLOCKING-ELEMENT` traffic control (see
[core/product/traffic-control.md](/core/product/traffic-control.md)).
They exist on the Jetcost site only; on white-label sites the flag has
no effect. See [core/product/w2a/index.md](/core/product/w2a/index.md)
for why W2A tools exist and how their effect is measured.

## Configs

### ENABLED
Boolean, default `0`. Master switch: with `0` no element shows, whatever
the other configs say; with `1`, each element follows its own configs.

### APP-LINK-NAME-BOOKMARK
String, default `itinerary-bookmark-w2a`. Name of the dynamic link the
modal uses when opened from the save icon. An empty value hides the save
icon; a name with no matching dynamic link sends the user to a not-found
page.

### APP-LINK-NAME-IN-FEED
String, default `fare-alert-inline-w2a`. Name of the dynamic link the
modal uses when opened from the in-feed row. An empty value hides the
in-feed row.

### APP-LINK-NAME-SIDEBAR
String, default `fare-alert-price-indicator-w2a`. Name of the dynamic
link the modal uses when opened from the sidebar. An empty value hides
the sidebar element.

### APP-LINK-NAME-TOAST
String, default `fare-alert-assistant-like-w2a`. Name of the dynamic
link the modal uses when opened from the toast. An empty value hides the
toast.

### BOOKING-WINDOW-CLUSTERS
Multiple choice, empty by default, among `0_3`, `4_7`, `8_21`, `22_45`,
`46_90` and `over91` (91 days or more): days from today to the outbound
departure. The booking windows in which the in-feed row and the toast
show, each only when its own `IN-FEED-BOOKING-WINDOW-BOUND` or
`TOAST-BOOKING-WINDOW-BOUND` is on. The list is shared, so the two
cannot be bound to different windows.

### BOOKMARK-ENABLED
Boolean, default `0`. With `1`, a heart-shaped save button appears on
each flight card (except intercard itineraries) and in the flight
detail, and the share button next to it loses its text and keeps only
its icon. The button saves nothing: it opens the modal in its
save-flight wording.

### IN-FEED-BOOKING-WINDOW-BOUND
Boolean, default `0`. With `1`, the in-feed row shows only on searches
whose booking window is one of `BOOKING-WINDOW-CLUSTERS`, and never when
that list is empty. With `0`, the booking window is ignored.

### IN-FEED-POSITIONS
List of integers, default `0`. Positions in the result list, counted
from `0`, above which the in-feed row is inserted: `0` places it above
the first flight card. Duplicates are ignored; positions beyond the end
of the list fold into a single row after the last card once the search
is complete. An empty list switches the in-feed row off.

### SIDEBAR-ENABLED
Boolean, default `0`. With `1`, a price-alert toggle appears in the
results sidebar, on desktop layouts only. It sits inside the price
indicator card when that card is on screen (see
[config/features/book-now-price-indicator.md](/config/features/book-now-price-indicator.md)),
otherwise in its own card at the top of the sidebar.

### TOAST-BOOKING-WINDOW-BOUND
Boolean, default `0`. With `1`, the toast shows only on searches whose
booking window is one of `BOOKING-WINDOW-CLUSTERS`, and never when that
list is empty. With `0`, the booking window is ignored.

### TOAST-ENABLED
Boolean, default `0`. With `1`, a price-alert card appears once results
are visible: at the bottom right on desktop, across the bottom of the
screen on mobile. Its button opens the modal without dismissing the
card; closing the card hides it for the rest of the browser session.
