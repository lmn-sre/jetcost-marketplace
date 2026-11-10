---
type: Feature Flag
description: "Let users pick a whole country as the destination of a flight search and see the cheapest price found to each of its airports."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-TO-COUNTRY

Lets the user choose a whole country as the destination in the flights
search form: the destination suggestions then list countries next to
cities and airports, except when the form uses the geographic
suggester, which never lists countries. A search to a country opens a
page listing the country's airports that have a photo: first those with
a price found from the departure airport on the chosen dates, cheapest
first, each with its lowest price, then the others, without a price. A
card relaunches the search to that airport. The prices are not live:
they come from the market's earlier searches (see `SEARCH-DAYS`). On
phones a card can open the app instead, through
`INTERNAL-OIA-AIRPORT-TO-COUNTRY-CARD` of
[config/features/mobile-app-oia.md](/config/features/mobile-app-oia.md).
It exists on the Jetcost and white-label sites.

The search to a country has its own entry point, but it is guarded by
the same check as the search to everywhere, so it is closed while
[config/features/flights-to-everywhere.md](/config/features/flights-to-everywhere.md)
is off: with this flag on and that one off, the form offers countries,
but submitting a search to one ends on a not-found page.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the search form offers countries as
destinations and the page of flights to a country works. With `0`,
countries are not offered and that page returns a not-found page.

### SEARCH-DAYS
Number, default `10`. How many days back the page looks for prices: only
prices found on the market's searches of the last N days are shown, and
the page says so, in a note giving N. A larger value gives more
airports a price, with older prices. No other age limit applies: values
above 15 show prices older than the 15-day legal limit that binds SEO
pages (see
[core/product/seo-pages.md](/core/product/seo-pages.md)).
