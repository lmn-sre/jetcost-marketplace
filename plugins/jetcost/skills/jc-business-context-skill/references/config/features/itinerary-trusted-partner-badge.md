---
type: Feature Flag
description: "Shows the trusted-partner badge on the offers of partners marked as trusted, in the flight detail view."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# ITINERARY-TRUSTED-PARTNER-BADGE

Shows a "trusted partner" badge, with an info popover explaining it,
next to the partner's name on the offers of the flight detail view (see
[config/features/detail-card.md](/config/features/detail-card.md)), for
the partners marked as trusted. Which partners are trusted is not set
here: the mark comes with the partner data of the search results, and
this flag switches the badge on or off for all of them at once. It also
decides the `trusted` value of `partner_badges` in the detail view's
`clickout_core_detail_page` event, and of `hero_partner_badges`, for the
first offer, in its `impression_core_detail_page` event.
Flights only, on the Jetcost site and on white-label sites, and only
where the detail view is on.

## Configs

### ENABLED
Boolean, default `0`. With `1`, trusted partners get the badge and are
reported as trusted in those events. With `0`, no offer gets the badge
and `trusted` is always false.
