---
type: Feature Flag
description: "Show a W2A sheet over the flight results while they load, inviting the user to continue the search in the app."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-RESULTS-W2A-BOTTOM-SHEET

A W2A sheet that slides up over the flight results page as soon as the
user lands on it, while the results are still loading. It compares the
app with the web, shows a live count of the offers found so far and
offers three ways out: "continue in the app", which opens the app on
the same search, "continue on the web" and a close button. It does not
block: the search
keeps running underneath, but the result cards stay hidden behind
placeholders while the sheet is open. The sheet closes by itself when
the search completes or its results fail to load, so it never covers
finished results.

It shows at most once per browser session, never on a search that is
already complete when the page opens, and never to the control group of
the `W2A-BLOCKING-ELEMENT` traffic control (see
[core/product/traffic-control.md](/core/product/traffic-control.md)). It
is laid out as a mobile bottom sheet, but nothing in code limits it to a
device: the feature's device rules decide where it shows. It exists on
the Jetcost site only; on white-label sites the flag has no effect.

It is not coordinated with
[config/features/flights-results-w2a-elements.md](/config/features/flights-results-w2a-elements.md):
the W2A toast cannot appear while the sheet is open, because it waits
for visible results, but it can appear once the sheet has closed.

See [core/product/w2a/index.md](/core/product/w2a/index.md) for why W2A
tools exist and how their effect is measured.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the sheet shows on the flight results
page under the conditions above and the booking-window configs below.
With `0`, it never shows.

### APP-LINK-NAME
String, default `open-results-in-bottom-sheet-w2a`. Name of the dynamic
link behind "continue in the app"; the link carries the search, so the
app opens on it. An empty value hides the sheet altogether; a name with
no matching dynamic link sends the button to a not-found page.

### BOOKING-WINDOW-BOUND
Boolean, default `0`. With `1`, the sheet shows only on searches whose
booking window is one of `BOOKING-WINDOW-CLUSTERS`, and never when that
list is empty. With `0`, the booking window is ignored.

### BOOKING-WINDOW-CLUSTERS
Multiple choice, empty by default, among `0_3`, `4_7`, `8_21`, `22_45`,
`46_90` and `over91` (91 days or more): days from today to the outbound
departure. The booking windows in which the sheet shows. Read only when
`BOOKING-WINDOW-BOUND` is on.
