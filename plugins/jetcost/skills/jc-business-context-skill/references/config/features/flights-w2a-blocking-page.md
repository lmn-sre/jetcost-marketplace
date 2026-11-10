---
type: Feature Flag
description: "Interrupt one flight search per browser session on web with a closable page that points the user to the app."
tags: [feature]
timestamp: 2026-11-09T00:00:00Z
---

# FLIGHTS-W2A-BLOCKING-PAGE

The W2A blocking page on web. When the user launches the N-th flight
search of their browser session (N is `SEARCHES-LIMIT`), the search does
not run: the user lands on a full-screen page that shows the searched
route and points to the app, with a button to the app and a "continue on
the web" action, also behind the close button, that runs the same search
on the web. Only that exact search can be blocked, and at most once per
browser session, which ends when the browser is closed: if that search
falls outside the booking-window clusters, no later search of the
session is blocked. Every flight search the site launches counts,
including the ones it relaunches by itself.

Who can meet the page is set through the feature's rules: site, market,
device and the session's campaign, through the `campaigns` dimension.
Nothing in code limits it to a device. It is never shown to the control
group of the `W2A-BLOCKING-ELEMENT` traffic control (see
[core/product/traffic-control.md](/core/product/traffic-control.md)).
Searches that the OIA fork hands to the app never reach it, while those
it sends back to the web go through it (see
[config/features/mobile-app-oia.md](/config/features/mobile-app-oia.md)).
It exists on the Jetcost site and on the white-label sites.

See [core/product/w2a/blocking-page.md](/core/product/w2a/blocking-page.md)
for why the blocking page exists and its revenue trade-off.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the page shows on the search set by
`SEARCHES-LIMIT`, under the conditions above and the booking-window
configs below, and flight searches are counted. With `0`, the page never
shows and searches are not counted.

### APP-LINK-NAME
String, default `blocking-page-w2a`. Name of the dynamic link behind the
page's app button; the link carries the blocked search. An empty value
does not hide the page: its app button is then left with no link. A name with
no matching dynamic link sends the button to a not-found page.

### BOOKING-WINDOW-BOUND
Boolean, default `0`. With `1`, the page shows only on searches whose
booking window is one of `BOOKING-WINDOW-CLUSTERS`, and never when that
list is empty. With `0`, the booking window is ignored.

### BOOKING-WINDOW-CLUSTERS
Multiple choice, empty by default, among `0_3`, `4_7`, `8_21`, `22_45`,
`46_90` and `over91` (91 days or more): days from today to the outbound
departure. The booking windows in which the page shows. Read only when
`BOOKING-WINDOW-BOUND` is on.

### SEARCHES-LIMIT
Integer, default `1`. Position, in the browser session, of the flight
search that gets the page: with `1`, the first search; with `3`, the
third. Only that search: if it is not eligible, the page does not show
later in the session. A value below `1` never shows the page.
