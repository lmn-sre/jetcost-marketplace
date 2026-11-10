---
type: Feature Flag
description: "Shows promotional boxes for car rental offers with placement rules."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# PROMOBOX-CARS

Named "Promobox Cars" in the backoffice. The car rental counterpart of
[config/features/promobox.md](/config/features/promobox.md): when on,
the car results page runs a MAL promobox auction on the car search and
places the sponsored promoboxes it returns with the same two rule
configs, read the same way, and the same 20-second wait. What differs is
the types the page shows: `sponsored-car-rental`, `inline` and
`click-to-call` among the rental results (`core`), and
`compare-right-shoulder` in the right-hand column, desktop only
(`shoulder`). There is no matching against the user's filters and no
report of the auction to Argo. Nothing shows while
[config/features/mal.md](/config/features/mal.md) is off. It exists on
the Jetcost and white-label sites; unlike the flights flag, it is not
sent to the mobile app.

## Configs

### ENABLED
Boolean, default `0`. With `1`, car results pages run the promobox
auction and place its promoboxes by the rules below. With `0`, no
promobox auction runs and no promobox shows on the car results.

### GENERAL-RULES
Caps per promobox type, empty by default, as in
[config/features/promobox.md](/config/features/promobox.md): a list of
entries, each a type and a maximum number (`maxElements`) counted over
the whole page. A type with no entry has no cap.

### PLACEMENT-RULES
The slots promoboxes can fill, empty by default: with no rule, no
promobox shows, even with the flag on. Same shape and same filling order
as in [config/features/promobox.md](/config/features/promobox.md): each
entry is a slot with an area (`core` or `shoulder`), a position (in
`core`, result rows counted from `0` at the top), `priorities`,
`exclusions` and an optional `exclude_all`.
