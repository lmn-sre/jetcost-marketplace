---
type: Feature Flag
description: "Show expandable flight details on results for self-qualifying traffic quality."
tags: [feature]
timestamp: 2026-10-14T00:00:00Z
---

# DETAIL-CARD

Toggles the expandable detail view on flight result rows: additional itinerary information (flight times, stops, baggage, partner info) shown before the user clicks out to a partner.

See [core/product/detail-page.md](/core/product/detail-page.md) for what this feature is, why it exists, and why it is decided per market × platform. Where it is on right now is this flag's live state; when that changed is in its operation-log history.

## Configs

### ENABLED
Enables or disables the detail-card feature.

### DETAIL-MODAL-FULLSCREEN-ENABLED
When enabled, the detail view opens as a fullscreen modal instead of an inline expansion within the result row.

### OPEN-OFFERS-DROPDOWN
Deprecated — ignore. No longer has any effect.
