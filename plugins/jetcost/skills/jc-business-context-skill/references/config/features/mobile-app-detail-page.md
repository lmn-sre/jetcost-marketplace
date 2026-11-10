---
type: Feature Flag
description: "Shows detailed itinerary preview before partner click-through on mobile app."
tags: [feature]
timestamp: 2026-08-13T00:00:00Z
---

# MOBILE-APP-DETAIL-PAGE

The mobile app equivalent of the web detail-card: shows additional itinerary details before the user clicks out to a partner.

See [core/product/detail-page.md](/core/product/detail-page.md) for what this feature is and why it exists. See also [config/features/detail-card.md](/config/features/detail-card.md), the web-side counterpart.

## Configs

### ENABLED
Enables or disables the detail page feature on mobile app.

### LAYOUT-TYPE
Controls how the detail view is presented. Possible values:
- `offers_top` — offers listed at the top of the detail view
- `offers_bottom` — offers listed at the bottom of the detail view
- `trips_collapsed` — trip segments shown in collapsed state
- `trips_expanded` — trip segments shown expanded by default

### VISIBLE-OFFERS
Controls how many (or which) offers are visible in the detail view (e.g. only the best offer, top N, or all available offers).
