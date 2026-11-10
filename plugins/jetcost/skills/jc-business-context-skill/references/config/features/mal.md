---
type: Feature Flag
description: "Master switch of MAL on web and app, with the settings every MAL unit shares: the auction token, the ad disclosure and the Jetcost redirect page for sponsored promoboxes."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# MAL

The master switch of MAL, Jetcost's auction layer for sponsored
placements (see
[core/commercials/mal/overview.md](/core/commercials/mal/overview.md)),
and the settings every MAL unit on a page shares. On web, on the Jetcost
site and on white-label sites, each MAL Media placement has its own flag
per product (checkboxes, search-form exit unit, results-page exit unit,
inline not-found unit, e.g.
[config/features/mal-flights-exitunit-form.md](/config/features/mal-flights-exitunit-form.md)),
and none of them shows while this flag is off. The sponsored promoboxes
(MAL Core) have flags of their own,
[config/features/promobox.md](/config/features/promobox.md) and
[config/features/promobox-cars.md](/config/features/promobox-cars.md),
but their sponsored boxes come from MAL auctions, which run on this
flag's token: with this flag off, they disappear too.

The flag is also sent to the mobile app with its settings (on or off,
token, ad disclosure, redirect page); what the app does with it is
decided inside the app.

## Configs

### DSA-INFO-ENABLED
Boolean, default `0`. With `1`, MAL units carry an ad disclosure: an
"Ad" or "Sponsored" label, mostly with an info tooltip naming the
advertiser, on the sponsored promoboxes, on the inline not-found cards
and over the checkbox placement. With `0`, these labels are not shown.
Also sent to the app, by the newer versions of its settings service.

### ENABLED
Boolean, default `0`. With `1`, MAL is on: the placement flags can show
and the other configs apply. With `0`, the page gets no MAL token and
the `mauction` SDK refuses every auction: no MAL placement shows and the
web sponsored promoboxes disappear too. The promobox flags
([config/features/promobox.md](/config/features/promobox.md)) do not
depend on this one, but their sponsored boxes come from MAL auctions.
The other configs fall back to their defaults.

### GATEWAY-REDIRECT-ENABLED
Boolean, default `0`. With `1`, a click on a sponsored promobox, flights
or cars, goes through a Jetcost redirect page before the advertiser's
site: the page names the partner, hands the click's value, encrypted, to
the tag layer and then forwards the user. With `0`, MAL sends the user
straight to the advertiser. The other MAL placements are not affected.
Also sent to the app, with the addresses of the two redirect pages, by
the newer versions of its settings service.

### TOKEN
String. The publisher token MAL requires on every auction; the site
sets it on every MAL unit and sends it to the app. With no rule setting
it, the token is empty and no MAL auction can run.
