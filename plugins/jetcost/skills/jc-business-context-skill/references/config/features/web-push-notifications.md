---
type: Feature Flag
description: "Chose the engine that sends the web push notifications, Jetcost's own (WPN) or Braze; no code reads it any more, so its configs no longer have any effect."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# WEB-PUSH-NOTIFICATIONS

Used to choose which engine sends the web push notifications: Jetcost's
own web push (WPN) or Braze. Braze has not been used for web push for a
long time, and no code reads the flag any more: not the web site, which
stopped in 2023, not the search backend, not the internal push tool that
sends the notifications. Changing any of its configs has no effect. The
web push opt-in, the request for the browser's notification permission,
is fixed in code and runs on the Jetcost and white-label sites whatever
the flag says. Until the user has answered it, it is asked on every page
except the partner redirect pages, once the user has accepted both the
technical and the marketing consents of the cookie banner, and
subscriptions always go to Jetcost's internal push tool (see
[core/marketing/crm.md](/core/marketing/crm.md)). The consent it asks
for is `wapn`, the same one the app asks for — see
[data/consents.md](/data/consents.md).

## Configs

### ENABLED
Boolean, default `0`. No longer has any effect: it was the on/off switch
of the feature.

### ENGINE
Select, default `jetcost`, between `jetcost` and `braze`. No longer has
any effect: it chose the engine that sends the web push, Jetcost's own
web push (WPN) or Braze. Subscriptions always go to the internal push
tool, never to Braze.

### POPUP-BLACKLIST
List of page names, by default the flight and car partner redirect
pages. No longer has any effect: it was the list of pages where the
opt-in popup was not shown. Those pages are now fixed in code, and are
the partner redirect pages, MAL ones included.
