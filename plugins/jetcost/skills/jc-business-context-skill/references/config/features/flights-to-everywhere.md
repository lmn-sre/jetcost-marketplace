---
type: Feature Flag
description: "Let users search flights from an airport to everywhere and see the cheapest price found to each country on their dates."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FLIGHTS-TO-EVERYWHERE

Adds "everywhere" as a destination of the flights search form. A search
to everywhere opens a page listing countries, cheapest first, each with
the lowest price found from the departure airport on the chosen dates;
countries with no price found come after them. Opening a country lists
its airports that have a photo, those with a price first, cheapest
first, then the others without a price, and a card relaunches the search
to that airport. The prices are not live: they come from the market's
earlier searches (see `SEARCH-DAYS`). On phones a card can open the app
instead, through `INTERNAL-OIA-AIRPORT-TO-EVERYWHERE-CARD` of
[config/features/mobile-app-oia.md](/config/features/mobile-app-oia.md).
It exists on the Jetcost and white-label sites.

The flag also gates three things outside that page: the search to a
country of
[config/features/flights-to-country.md](/config/features/flights-to-country.md),
whose entry point is guarded by the same check; the "everywhere"
destination that CMS editorial pages can preset in their search form;
and the search to everywhere that the MAL units of the flight search
form and results page (exit units, checkboxes, inline not-found) open
when no advertiser bids (see
[config/features/mal-flights-exitunit-form.md](/config/features/mal-flights-exitunit-form.md)).

## Configs

### ENABLED
Boolean, default `0`. With `1`, the search form offers "everywhere" as a
destination and the page above works. With `0`, the option is gone, the
searches to everywhere and to a country end on a not-found page, and
those MAL units lose that fallback.

### MOBILE-ITEMS-LIMIT
Number, default `4`. On phones and tablets, how many airports an opened
country shows before a "show more" link. On desktop all are shown.

### SEARCH-DAYS
Number, default `10`. How many days back the page looks for prices, for
the countries and for the airports of an opened country: only prices
found on the market's searches of the last N days are shown, and the
page says so, in a note giving N. A larger value gives more countries
a price, with older prices. No other age limit applies: values above 15
show prices older than the 15-day legal limit that binds SEO pages (see
[core/product/seo-pages.md](/core/product/seo-pages.md)).
