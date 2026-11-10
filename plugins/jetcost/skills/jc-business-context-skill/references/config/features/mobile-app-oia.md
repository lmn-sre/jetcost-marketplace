---
type: Feature Flag
description: "Hands mobile-web flight searches to the app from chosen touchpoints, and picks which app screen external open-in-app links to airport pages open."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# MOBILE-APP-OIA

OIA stands for **open-in-app**: links that open the app, where it is
installed, on what the user was about to see on the mobile web. Named
"[OIA] Internal & External" in the backoffice, the flag drives both
kinds:

- **Internal OIA**, from the sites' own web pages: a flight search
  launched from a touchpoint whose `INTERNAL-OIA-*` toggle is on is not
  run on the web but redirected to an open-in-app link. A phone with the
  app opens the search in the app; on a phone without it, the link sends
  the search back to the web, which runs it as usual. Searches handed to
  the app skip the W2A blocking page; those sent back go through it.
- **External OIA**: open-in-app links to an airport-from, airport-to or
  route page, such as the mobile landings of SEM campaigns (see
  [core/marketing/sem/index.md](/core/marketing/sem/index.md)). Opened by
  the app, they open the app screen picked by the `*-BEHAVIOUR` configs;
  without the app, the web page. Open-in-app links to the homepage and to
  the flights product page have no config.

Each `INTERNAL-OIA-<touchpoint>` toggle has a `-CMPG` companion, read
only when the toggle is on: the campaign the open-in-app link carries as
`utm_content`. Left empty, the link carries
`<country>_<language>_internal_oia_<source>_<jc|wl>` instead: legacy
country code (`uk` for Great Britain), the touchpoint's search source
given with each toggle below, `jc` on the Jetcost site and `wl` on white
labels. The link carries the session identifiers only with the `meas`
consent (see [data/consents.md](/data/consents.md)), and what the app
receives also names the welcome element of `OIA-WELCOME-ELEMENT` in
[config/features/mobile-app-welcome-element.md](/config/features/mobile-app-welcome-element.md),
except on shared-link openings, which carry none.
The feature works on phones only, and never for crawlers or on
TravelMeta and travel-tools traffic, whatever its rules; it is coded for
the Jetcost site and white-label sites alike. See
[core/product/w2a/index.md](/core/product/w2a/index.md) for why moving
users to the app matters, and
[data/query-caveats.md](/data/query-caveats.md) for how OIA reopens
behave in cost attribution.

## Configs

### AIRPORT-FROM-BEHAVIOUR
Select, `landing` (default) or `prefill`. What the app opens on an
external OIA link to an airport-from page (flights from one airport):
with `landing`, the app's airport-from landing screen, whose content is
set by
[config/features/landing-screens-airport-from-elements.md](/config/features/landing-screens-airport-from-elements.md);
with `prefill`, the flight search form with the departure airport filled
in. When the app itself asks for the prefilled form (request header
`X-OIA: 1`), it gets it whatever this config says.

### AIRPORT-ROUTE-BEHAVIOUR
Select, `landing` (default) or `prefill`. The same choice for a route
page (flights between two airports): `landing` opens the app's route
landing screen
([config/features/landing-screens-airport-route-elements.md](/config/features/landing-screens-airport-route-elements.md)),
`prefill` the search form with both airports filled in. Either way the
app also gets the dates the link carries, when they are valid (departure
not in the past, return after departure). `X-OIA: 1` forces the prefill
here too.

### AIRPORT-TO-BEHAVIOUR
Select, `landing` (default) or `prefill`. The same choice for an
airport-to page (flights to one airport): `landing` opens the app's
airport-to landing screen
([config/features/landing-screens-airport-to-elements.md](/config/features/landing-screens-airport-to-elements.md)),
`prefill` the search form with the arrival airport filled in. `X-OIA: 1`
forces the prefill here too.

### INTERNAL-OIA-AIRPORT-TO-COUNTRY-CARD
Boolean, default `0`. With `1`, flight searches launched on a phone from
the destination cards of the flights-to-a-country pages (F2C, see
[config/features/flights-to-country.md](/config/features/flights-to-country.md))
are handed to the app. Source `airport_to_country_card`.

### INTERNAL-OIA-AIRPORT-TO-EVERYWHERE-CARD
Boolean, default `0`. The same for the destination cards of the
flights-to-everywhere pages (F2E, see
[config/features/flights-to-everywhere.md](/config/features/flights-to-everywhere.md)).
Source `airport_to_everywhere_card`.

### INTERNAL-OIA-BLOCKING-PAGE
Boolean, default `0`. No longer has any effect: searches leaving the W2A
blocking page keep the source of the search they come from, so no search
is matched to this toggle.

### INTERNAL-OIA-DIRECT-DATES-INTERCARD
Boolean, default `0`. The same for the direct-dates intercard (see
[config/features/direct-dates-intercard.md](/config/features/direct-dates-intercard.md)).
Source `direct_dates_intercard`.

### INTERNAL-OIA-INACTIVITY-REFRESH
Boolean, default `0`. The same for the search relaunched by the refresh
modal of the web flight results (see
[config/features/refresh-modal.md](/config/features/refresh-modal.md)).
Source `inactivity_refresh`.

### INTERNAL-OIA-INSPIRATIONAL-INTERCARD
Boolean, default `0`. The same for the inspirational intercard (see
[config/features/inspirational-intercard.md](/config/features/inspirational-intercard.md)).
Source `inspirational_intercard`.

### INTERNAL-OIA-NEARBY-AIRPORTS-INTERCARD
Boolean, default `0`. The same for the nearby-airports intercard (see
[config/features/best-price-nearby-airports-intercard.md](/config/features/best-price-nearby-airports-intercard.md)).
Source `nearby_airports_intercard`.

### INTERNAL-OIA-NEARBY-DATES-INTERCARD
Boolean, default `0`. The same for the nearby-dates intercard (see
[config/features/best-price-nearby-dates-intercard.md](/config/features/best-price-nearby-dates-intercard.md)).
Source `nearby_dates_intercard`.

### INTERNAL-OIA-NEW-DEALS
Boolean, default `0`. The same for the new-deals boxes, such as the one
on the airport-to pages: with `1`, tapping a deal on a phone opens the
search in the app, where it is installed, instead of on the web. Source
`new_deals`.

### INTERNAL-OIA-PRICE-NAVIGATOR
Boolean, default `0`. The same for the price navigator, the fold-out of
prices inside the nearby-dates intercard
([config/features/best-price-nearby-dates-intercard.md](/config/features/best-price-nearby-dates-intercard.md)):
with `1`, tapping a price on a phone opens the search in the app, where
it is installed, instead of on the web. Source `price_navigator`.

### INTERNAL-OIA-SEARCH-FORM
Boolean, default `0`. The same for the web flight search form. Source
`search_form`.

### INTERNAL-OIA-SHARE-LINK
Boolean, default `0`. The same for a shared flight-search link opened on
the web: the app opens on the shared itinerary. Source `shared_link`.

### INTERNAL-OIA-THEME-CARD
Boolean, default `0`. The same for the cards of the theme pages. Source
`theme_card`.

### ENABLED
Boolean, default `1`. Internal OIA checks it before handing a search
to the app; the external links do not, but their `*-BEHAVIOUR`
configs fall back to their defaults while the feature is off. When the
feature is marked *always enabled* in the backoffice, `ENABLED` has no
effect: every eligible request gets the feature on. Whether it is marked
so is live state — check the feature state, not this file. Here,
eligible means meeting the phone-only conditions above. Without the
mark, `0`, or no rule setting it (whatever the backoffice default), would hand no search
to the app and leave external links on the `landing` default, since
every config falls back to its default.

### INTERNAL-OIA-AIRPORT-TO-COUNTRY-CARD-CMPG
String, empty by default. Campaign of the open-in-app link of the F2C
cards.

### INTERNAL-OIA-AIRPORT-TO-EVERYWHERE-CARD-CMPG
String, empty by default. Campaign of the open-in-app link of the F2E
cards.

### INTERNAL-OIA-BLOCKING-PAGE-CMPG
String, empty by default. No longer has any effect, like
`INTERNAL-OIA-BLOCKING-PAGE`.

### INTERNAL-OIA-DIRECT-DATES-INTERCARD-CMPG
String, empty by default. Campaign of the open-in-app link of the
direct-dates intercard.

### INTERNAL-OIA-INACTIVITY-REFRESH-CMPG
String, empty by default. Campaign of the open-in-app link of the
refresh-modal relaunch.

### INTERNAL-OIA-INSPIRATIONAL-INTERCARD-CMPG
String, empty by default. Campaign of the open-in-app link of the
inspirational intercard.

### INTERNAL-OIA-NEARBY-AIRPORTS-INTERCARD-CMPG
String, empty by default. Campaign of the open-in-app link of the
nearby-airports intercard.

### INTERNAL-OIA-NEARBY-DATES-INTERCARD-CMPG
String, empty by default. Campaign of the open-in-app link of the
nearby-dates intercard.

### INTERNAL-OIA-NEW-DEALS-CMPG
String, empty by default. Campaign of the open-in-app link of the
new-deals boxes.

### INTERNAL-OIA-PRICE-NAVIGATOR-CMPG
String, empty by default. Campaign of the open-in-app link of the price
navigator.

### INTERNAL-OIA-SEARCH-FORM-CMPG
String, empty by default. Campaign of the open-in-app link of the search
form.

### INTERNAL-OIA-SHARE-LINK-CMPG
String, empty by default. Campaign of the open-in-app link of shared
flight-search links.

### INTERNAL-OIA-THEME-CARD-CMPG
String, empty by default. Campaign of the open-in-app link of the theme
cards.
