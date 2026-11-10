---
type: Feature Flag
description: "Manages web advertising placements, GAM configuration, and intelligent refresh."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# WEB-ADS — Web Ads

The Google Ad Manager (GAM) banners of the web site: the display slots
of the flight and car home, results, SEO and redirect pages and of the
flights-to-everywhere, travel-theme and CMS editorial pages, the in-feed
banners inside the flight results list, and two kinds of interstitial —
Jetcost's own full-screen overlay, which the interstitial configs below
act on, and Google's out-of-page interstitial, which Google manages and
the interstitial configs do not touch: like any slot, it is requested
only when ticked in `GAM-PLACEMENTS`. A slot is requested only when three things
agree: the page declares it, it is ticked in `GAM-PLACEMENTS`, and the
site's theme has a size set for it in code. Slots load only after the
visitor has answered the cookie banner. See
[core/media/gam.md](/core/media/gam.md) for what this
revenue stream is.

It works on Jetcost and on the white-label sites, each theme with its
own slot sizes. Holidayiq has its own slots on the flight results page
(the "HiQ only" placements, with no in-feed banner, no Jetcost
interstitial and no refresh) and builds its ad unit paths without
country and language on its flight homepage and results page. The web
pages shown inside the app (the `jetcost-mobile-app` site) have no slot
sizes, so the flag has no effect there; banners in the native app are
[config/features/mobile-app-ads.md](/config/features/mobile-app-ads.md),
and AdSense for Search text ads are
[config/features/afs.md](/config/features/afs.md).

## Configs

### ADUPTECH-SUFFIX
String, empty by default. End of the GAM ad unit path of the two AdUp
Tech slots, `FLIGHT_RESULTS_ADUPTECH` and `FLIGHT_SEO_ADUPTECH`, through
which AdUp Technology serves its ads. It replaces `GAM-AD-UNIT-SUFFIX`
for those two slots: left empty, they get no suffix at all.

### ENABLED
Boolean, default `0`. Master switch: with `0`, no GAM slot is requested
on any page, whatever `GAM-PLACEMENTS` says.

### FLIGHT-INTERSTITIAL-HIDE-DELAY
Number, milliseconds, default `1000`. How long Jetcost's interstitial
stays up before the visitor can close it: once its banner has rendered,
the close button appears, and a click on the dark background closes the
overlay, only after this delay. Same value on the results and SEO pages.

### FLIGHT-RESULTS-INTELLIGENT-REFRESH
Boolean, default `1`. With `1`, banners of the flight results page that
stay in view are reloaded with a new ad, each reload being a new ad
request. A slot refreshes when a share of it set per slot in code is
visible, it has been on display for
`FLIGHT-INTELLIGENT-REFRESH-MIN-DISP-TIME` since its last load, and the
visitor has scrolled within the last two minutes. Only the slots marked
for refresh in code take part — on this page the top, side, bottom,
in-feed and sticky banners — and each request carries the slot's
refresh count as targeting (`rc`, up to "more than 10"). With `0`,
there is no timed reload; a banner is still requested again when the
screen crosses one of its size breakpoints, when the visitor changes
the cookie choice or, for an in-feed banner, when filters or sorting
change the itinerary it follows.

### FLIGHT-SEO-INTELLIGENT-REFRESH
Boolean, default `1`. The same refresh as
`FLIGHT-RESULTS-INTELLIGENT-REFRESH`, on the flight SEO pages
([core/product/seo-pages.md](/core/product/seo-pages.md)): airline,
airport, country and route pages, their lists and their not-found
pages. There the top right and sticky banners take part, and the top
banner on mobile only.

### FLIGHT-SEO-INTERSTITIAL-ENABLED-GCLID
Boolean, default `0`. With `0`, the flight SEO pages withhold Jetcost's
interstitial from a page view whose URL carries a `gclid`, that is a
landing from a Google Ads click; with `1`, it shows on those landings
too. Only the page view carrying the parameter is concerned: later SEO
pages without it can show the interstitial either way.

### GAM-AD-UNIT-PREFIX
String, empty by default. Start of every GAM ad unit path the site
requests. A path is the prefix, then
`<country>_<language>_<section>_<page>_<slot>`, then the suffix, all
lowercase and glued together, with the section in the singular
(`flight`, `car`, `theme`) and the slot's own underscores removed
(`top_center` becomes `topcenter`). Holidayiq's homepage and results
page drop country and language and add an underscore after the prefix.
GAM serves and reports by these paths, so changing the prefix moves
every request to different ad units.

### GAM-AD-UNIT-SUFFIX
String, empty by default. End of every GAM ad unit path (see
`GAM-AD-UNIT-PREFIX`), except the two AdUp Tech slots, which take
`ADUPTECH-SUFFIX` instead.

### GAM-PLACEMENTS
Multiple choice, empty by default: the allow-list of slots. Each option
is named product (`FLIGHT`, `CAR`, or `THEME_SEARCH` for the
travel-theme search pages), page (`HOME`, `RESULTS`, `SEO`, `F2E` for
flights-to-everywhere, `PUB` for the CMS editorial pages, `REDIRECT` for
the page shown on the way to a partner) and position. A slot is
requested only when it is ticked here, the page declares it and the
theme has a size for it: ticking a slot that no page declares does
nothing, and an empty list means no banner at all. `*_IN_FEED` are the
in-feed banners, `*_INTERSTITIAL` Jetcost's overlay, `*_GAMINTERSTITIAL`
Google's interstitial, the "HiQ only" options exist on Holidayiq only,
and `FLIGHT_RESULTS_MID_CENTER` sits in the flight detail, declared only
where [config/features/detail-card.md](/config/features/detail-card.md)
is available. `FLIGHT_SEO_ADUPTECH` is requested only on SEO pages that
show no AFS block, as the two share one spot.

### META-INTERSTITIAL-CLOSING-X-INTERNAL
Boolean, default `0`. Where the close button of Jetcost's interstitial
sits: with `1`, a plain grey X over the top right corner of the banner;
with `0`, a white round button outside the banner, above it (beside it
in landscape). Same on the results and SEO pages.

### FLIGHT-INTELLIGENT-REFRESH-MIN-DISP-TIME
Number, seconds, default `40`. Minimum time a banner must have been on
display since its last load before intelligent refresh can reload it,
so a slot refreshes at most once per this many seconds. Shared by the
results and SEO pages; read only where
`FLIGHT-RESULTS-INTELLIGENT-REFRESH` or `FLIGHT-SEO-INTELLIGENT-REFRESH`
is on.

### FLIGHT-RESULTS-BOTTOM-IN-FEED-POSITION
Number, default `9`. Where the bottom in-feed banner sits in the flight
results list: after that many results, counting result rows only, not
intercards or other cards inserted in the list. In-feed banners appear
once the search has completed. Matters only when
`FLIGHT_RESULTS_BOTTOM_IN_FEED` is ticked in `GAM-PLACEMENTS`.

### FLIGHT-RESULTS-MID-IN-FEED-POSITION
Number, default `6`. Same as `FLIGHT-RESULTS-BOTTOM-IN-FEED-POSITION`,
for the mid in-feed banner (`FLIGHT_RESULTS_MID_IN_FEED`).

### FLIGHT-RESULTS-TOP-IN-FEED-POSITION
Number, default `3`. Same as `FLIGHT-RESULTS-BOTTOM-IN-FEED-POSITION`,
for the top in-feed banner (`FLIGHT_RESULTS_TOP_IN_FEED`). Nothing keeps
the three positions apart: two banners set to the same position show
one above the other.

### SESSION-FLIGHT-RESULTS-INTERSTITIAL
Boolean, default `0`. With `1`, Jetcost's interstitial does not show on
the first flight results page of a session, only from the next one on
(see [data/sessions-and-users.md](/data/sessions-and-users.md)); with
`0`, it can show on every results page.
