---
type: Feature Flag
description: "Shows each partner's quality score, as a star rating, on the offers of the flight detail view."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# PARTNER-QUALITY-SCORE

Shows each partner's quality score on the offers of the flight detail
view (see [config/features/detail-card.md](/config/features/detail-card.md)):
under the partner's name, a score out of 5 with five stars filled to
match and the number of valid surveys behind it, or "not available" when
the partner has no score, plus an info popover linking to the terms and
conditions. Sponsored offers show no score. The scores come with the
partner data of the search results; this flag only shows them. Flights
only, on the Jetcost site and on white-label sites, and only where the
detail view is on.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the score shows on the non-sponsored
offers of the detail view as described above. With `0`, no score is
shown.
