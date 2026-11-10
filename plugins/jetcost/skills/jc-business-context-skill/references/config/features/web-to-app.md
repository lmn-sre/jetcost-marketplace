---
type: Feature Flag
description: "Controls web-to-app promotion intercard with dynamic linking support."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# WEB-TO-APP

Named "[W2A] Intercard Fare Alert" in the backoffice. A fare-alert
invitation to the app on the flight results page: once the search is
complete, a fare-alert intercard appears in the result list and a bell
button appears next to the search summary. Both open an overlay whose
only action is a "download the app" button; no alert is created on web.
It shows on mobile and tablet layouts only (hidden on desktop), on the
Jetcost and white-label sites, and only on economy searches without
flexible dates.

See [core/product/w2a/other-tools.md](/core/product/w2a/other-tools.md)
for the fare alert tool among the W2A tools. The price-alert elements of
[config/features/flights-results-w2a-elements.md](/config/features/flights-results-w2a-elements.md)
are a separate flag.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the intercard, the bell and the overlay
are active on eligible searches. With `0`, none of them appears.

### INTERCARD-POSITION
Integer, default `7`. Position in the result list, counted from `0`,
above which the intercard is inserted: with `7` it sits above the eighth
flight card. When the list never reaches that position, neither the
intercard nor the bell appears.

### DYNAMIC-LINK
Dynamic link, default `w2a-fare-alert`. Name of the dynamic link behind
the overlay's "download the app" button; it carries the search ID
(`sid`) and the best total price found, not the route and dates the
other W2A links carry. A name with no matching dynamic link sends the
button to a not-found page.
