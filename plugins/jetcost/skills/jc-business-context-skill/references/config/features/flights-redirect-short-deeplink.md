---
type: Feature Flag
description: "Make flight and car offers carry a short id of the partner deeplink, stored in Redis, instead of the full encrypted URL; read by the search backend, not by the site."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-REDIRECT-SHORT-DEEPLINK

Named "Short Deeplinks" in the backoffice. The format of the partner
deeplink that flight and car offers carry, and that a click hands to
the partner redirect. It is read by the search backend when it builds
flight and car results, not by the site's code nor by the redirect.
With the flag on, the search backend stores the partner URL in Redis
under a 16-character id and the offer carries only that id; with it
off, the offer carries the full encrypted URL. The redirect recognises
a short deeplink by the 16-character length of its `ush` parameter, so
it resolves both formats whatever the flag says. The flag therefore
changes the deeplink format on the Jetcost and white-label sites and in
the app, even though the site does not read it. Rules can also target
app version: the search backend checks the version only on app
requests, so a rule scoped on app version with no site constraint also
applies to the web.

## Configs

### ENABLED
Boolean, default `0`. With `1`, offers carry the 16-character id of a
partner URL stored in Redis. With `0`, they carry the full encrypted
partner URL. The redirect resolves either format.
