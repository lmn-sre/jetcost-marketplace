---
type: Feature Flag
description: "Offer a multi-city choice in the Jetcost flight search form that sends the user to an external multi-city search."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# MULTI-CITY

Adds a "multi-city" choice to the trip-type selector of the flight
search form, next to return and one-way. Jetcost does not search
multi-city trips itself: choosing it opens a modal with a "continue"
and a "stay here" button. "Continue" opens `REDIRECT-URL` in a new tab,
with the site language added to the path and the user's Jetcost session
as the `sub1` tracking parameter; "stay here" closes the modal and
leaves the form as it was. It was built to redirect to Kiwi.com. It
exists on the Jetcost site only; on white-label sites the flag has no
effect.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the multi-city choice and its modal
appear in the search form, provided `REDIRECT-URL` is set. With `0`, the
selector offers return and one-way only.

### REDIRECT-URL
String, empty by default. Address of the external multi-city search
that "continue" opens, without the language: a `/` and the site
language are added to it. Left empty, the multi-city choice does not
appear even with `ENABLED` on.
