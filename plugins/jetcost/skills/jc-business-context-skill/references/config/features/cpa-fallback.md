---
type: Feature Flag
description: "Hold CPA partner offers out of flight results, admitting them only when the result set would otherwise stay thin."
tags: [feature]
timestamp: 2026-09-14T00:00:00Z
---

# CPA-FALLBACK

Withholds offers from **CPA partners** on the flight results page and
admits them only when the search would otherwise return almost nothing.

See [core/commercials/cpa-fallback.md](/core/commercials/cpa-fallback.md)
for what this is, why it works this way, and how it shows up in click and
search data.

## Configs

### ENABLED
Enables or disables the CPA fallback. With it off, CPA partners take part
in the results like any other partner.

### MAX-ITINERARIES
Itinerary threshold that decides the outcome. CPA offers are admitted only
if the number of displayed itineraries is still at or below this value once
every queried partner has answered; above it they are dropped. Lower values
make the fallback rarer, higher ones let CPA offers into progressively
better-populated pages.

### SEND-MKTG-SIGNALS
Whether a click on an admitted CPA offer fires the marketing signals —
server-side and client-side GTM, see
[config/features/meta-tag.md](/config/features/meta-tag.md). It applies to
these clicks only; ordinary clicks are unaffected by this config.
