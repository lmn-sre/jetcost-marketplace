---
type: Feature Flag
description: "Show a modal asking the user to refresh the flight or car results after a set time on the results page."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# REFRESH-MODAL

A modal on the flight and car results pages asking the user to refresh
the results once `INACTIVITY-TIME` minutes have passed since the page
was served, whatever the user does meanwhile: despite the name, it no
longer tracks activity. The page behind it stops scrolling, and every
way out of the modal, close buttons included, relaunches the same
search, recorded with the search source `inactivity_refresh`. On phones
the relaunched flight search can open the app instead, through
`INTERNAL-OIA-INACTIVITY-REFRESH` of
[config/features/mobile-app-oia.md](/config/features/mobile-app-oia.md).
On Jetcost flight results the modal can also carry an email opt-in
form, when `REFRESH-MODAL-EMAIL-MARKETING` of
[config/features/email-marketing.md](/config/features/email-marketing.md)
is on. It exists on the Jetcost and white-label sites.

The app receives `ENABLED` and `INACTIVITY-TIME` with its settings, from
settings v7, as `results_page.flights.inactivity_tracking` and
`results_page.cars.inactivity_tracking`; what it does with them is decided
inside the app. The three web push configs are not read by the site.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the modal opens on flight and car
results pages after `INACTIVITY-TIME`. With `0`, it never opens. Also
sent to the app.

### SEND-WPN
Boolean, default `0`. Not read by the site: it switched on a web push
notification sent to inactive users, which the site no longer sends. Not sent to the app.

### INACTIVITY-TIME
Number, default `10`. Minutes, counted from when the results page was
served, after which the modal opens. Also sent to the app.

### WPN-CAP
Number, default `2`. Not read by the site: it capped how many of the
`SEND-WPN` notifications a browser received within
`WPN-COOKIE-DURATION-HOURS`.

### WPN-COOKIE-DURATION-HOURS
Number, default `24`. Not read by the site: it set the window over
which `WPN-CAP` counted; despite its name, the old code counted it in
minutes.
