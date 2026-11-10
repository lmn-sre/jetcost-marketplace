---
type: Feature Flag
description: "Switches on the AdSense for Search text-ad blocks of the web results, SEO, flights-to-everywhere and editorial pages, with their placement and the traffic gates that withhold them."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# AFS — AdSense for Search

The AdSense for Search (AFS) blocks of the web site: Google text ads
matched to a search query, shown on the flight and car results pages,
on the flight SEO pages
([core/product/seo-pages.md](/core/product/seo-pages.md)), on the
flights-to-everywhere pages and on the CMS editorial pages that include
an AFS component. `ENABLED` is the master switch; each surface then has
a switch, an ad unit ID and layout configs, some of them shared between
surfaces (see below), and three gates withhold blocks from part of the
traffic. A block shows only when it also has
its surface's ad unit ID (a `UNIT-ID-*` config, sent to AdSense as the
block's channel), a publisher ID and a query. The query is a
translation on the results and flights-to-everywhere pages (filled with
the searched cities on results), the page's destination or title on SEO
pages, and the component's own query on editorial pages. Blocks load
only after the visitor has answered the cookie banner. See
[core/media/afs.md](/core/media/afs.md) for what this
revenue stream is.

It works on Jetcost and on the white-label sites; the web pages shown
inside the app have no place for a block, and the native app does not
read the feature. Desktop and mobile are told apart by the feature's
device rules, not by separate configs. On the flight SEO pages the AFS
block shares its spot with the AdUp Tech banner of
[config/features/web-ads.md](/config/features/web-ads.md): whenever the
page shows no AFS block, whatever the reason, it requests the AdUp Tech
slot instead, if `FLIGHT_SEO_ADUPTECH` is ticked there.

## Configs

### ENABLED
Boolean, default `0`. Master switch for every AFS block of the site:
with `0`, none shows, whatever the other configs say.

### BREAKPOINT-RESULTS-CARS
Number, default `0`. Same as `BREAKPOINT-RESULTS-FLIGHTS`, on the car
results page; ignored when `ON-SHOULDER-RESULTS-CARS` is on.

### BREAKPOINT-RESULTS-FLIGHTS
Number, default `0`. Where the AFS block sits on the flight results
page: `0` above the results, a positive N after the first N results
(the block waits until more than N results have loaded or the search
has completed), a negative value below the whole list. Ignored when
`ON-SHOULDER-RESULTS-FLIGHTS` is on; the flights-to-everywhere pages
always show their block in the side column.

### DISABLED-ON-PAID-TRAFFIC-LANDING-PAGE
Boolean, default `0`. With `1`, visitors from paid traffic, whatever
the source ([core/marketing/traffic-taxonomy.md](/core/marketing/traffic-taxonomy.md)),
see no AFS block on the page view that opens their session, whichever
page that is; blocks show from the next page view on. A page view that
opens a new session mid-visit, after the inactivity or midnight cut of
[data/sessions-and-users.md](/data/sessions-and-users.md), counts as a
landing too.

### DISABLED-SEO-BY-USER-COUNTRY
Boolean, default `0`. With `1`, the SEO block (flight SEO pages and the
SEO component of editorial pages) is hidden from visitors whose IP
address is in the site's own market country; visitors from other
countries, and those whose country is unknown, still see it. On the
flight SEO pages those local visitors get the AdUp Tech banner instead,
if WEB-ADS allows it.

### ENABLED-ON-PAID-GOOGLE-ONLY
Boolean, default `0`. With `1`, AFS blocks show only in sessions from
paid traffic whose campaign source is Google; everyone else, organic
traffic included, sees none. Applies to every surface.

### ENABLED-RESULTS-CARS
Boolean, default `0`. Shows the AFS block on the car results page and
on the car editorial pages that include an AFS component.

### ENABLED-RESULTS-FLIGHTS
Boolean, default `0`. Shows the AFS block on the flight results page,
on the flights-to-everywhere pages (in their side column) and on the
flight editorial pages that include an AFS component.

### ENABLED-SEO-FLIGHTS
Boolean, default `0`. Shows the AFS block on the flight SEO pages —
airline, airport, country and route pages — and the SEO AFS component
of the editorial pages, car ones included. With `0`, the flight SEO
pages show the AdUp Tech banner in its spot, if WEB-ADS allows it.

### NUMBER-RESULTS-CARS
Number, default `0`. Same as `NUMBER-RESULTS-FLIGHTS`, for the block of
the car results page and of the car editorial pages.

### NUMBER-RESULTS-FLIGHTS
Number, default `0`. How many ads the block asks AdSense for (its
`number` setting, sent as is) on the flight results page, the
flights-to-everywhere pages and the flight editorial pages.

### NUMBER-SEO-FLIGHTS
Number, default `0`. How many AFS blocks fill the SEO spot of the
flight SEO pages and of the editorial pages, side by side on wide
screens and stacked on narrow ones; each block holds one ad. `0` counts
as one.

### ON-SHOULDER-RESULTS-CARS
Boolean, default `0`. Same as `ON-SHOULDER-RESULTS-FLIGHTS`, on the car
results page.

### ON-SHOULDER-RESULTS-FLIGHTS
Boolean, default `0`. With `1`, the AFS block of the flight results
page leaves the results list for the side column, and
`BREAKPOINT-RESULTS-FLIGHTS` is ignored.

### PUB-ID
String, empty by default. AdSense publisher ID every block is requested
for. Left empty, the publisher ID of the site's domain configuration
(`afs.pub_id`) is used; with neither, no block shows.

### SEO-QUERY-FROM-PAGE-TITLE-FLIGHTS
Boolean, default `0`. Query of the AFS block on the flight SEO pages,
which decides the ads it gets: with `0`, the translation
`afs.query_seo_flights` filled with the page's destination city, or the
page title when that translation comes out empty; with `1`, the page
title. Editorial pages keep their component's own query either way.

### STYLE-ID
String, empty by default. ID of the AdSense search style (the look of
the text ads) applied to every block. When it is set, the publisher ID
is sent with the `partner-` prefix that styled requests use.

### UNIT-ID-CARS-PUB
String, empty by default. Ad unit ID of the blocks of the car editorial
pages, both their results-style and their SEO component.

### UNIT-ID-CARS-RESULTS
String, empty by default. Ad unit ID of the block on the car results
page.

### UNIT-ID-FLIGHTS-F2E
String, empty by default. Ad unit ID of the block on the
flights-to-everywhere pages.

### UNIT-ID-FLIGHTS-PUB
String, empty by default. Ad unit ID of the blocks of the flight
editorial pages, both their results-style and their SEO component.

### UNIT-ID-FLIGHTS-RESULTS
String, empty by default. Ad unit ID of the block on the flight results
page.

### UNIT-ID-FLIGHTS-SEODETAIL
String, empty by default. Ad unit ID of the blocks on the flight SEO
pages.
