---
type: Feature Flag
description: "Displays context-aware web-to-app promotion button with app links."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# WEB-TO-APP-SMART-BUTTON

Named "[W2A] Smartbutton" in the backoffice. A "get the app" button in
the site header, on every page of the Jetcost and white-label sites that
shows the header. Nothing in code limits it to a device: the feature's
device rules decide where it shows. The dynamic link behind it depends
on the page, with one config each for the cars pages, the flight results
page and every other page; on the flight results page the link carries
the current search, so the app opens on it. A name with no matching
dynamic link sends the button to a not-found page.

See [core/product/w2a/other-tools.md](/core/product/w2a/other-tools.md)
for the smart button among the W2A tools.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the button shows in the header. With
`0`, it does not.

### APP-LINK-HOME-CARS
String, default `smartbutton-car-hp-w2a`. Dynamic link used on every
page of the cars section, not only its homepage: cars results and cars
landing pages too.

### APP-LINK-HOME-FLIGHTS
String, default `smartbutton-flight-hp-w2a`. Dynamic link used on every
page outside the cars section other than the flight results page: the
flights homepage, but also flight landing pages and any other page with
the header.

### APP-LINK-RESULTS-FLIGHTS
String, default `smartbutton-flight-rp-w2a`. Dynamic link used on the
flight results page; the link carries the search, so the app opens on
it.
