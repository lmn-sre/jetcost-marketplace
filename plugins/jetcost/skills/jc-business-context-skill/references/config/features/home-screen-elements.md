---
type: Feature Flag
description: "Control visibility and positioning of home screen sections like deals, stories, and watched items."
tags: [feature]
timestamp: 2026-07-22T00:00:00Z
---

# HOME-SCREEN-ELEMENTS

<!-- TODO: describe what this feature does -->

## Configs

### BACKGROUND-COLOR-DEALS
<!-- TODO: describe what this config controls -->

### BACKGROUND-COLOR-MEDIA-BANNER
<!-- TODO: describe what this config controls -->

### BACKGROUND-COLOR-TRAVEL-STORIES
<!-- TODO: describe what this config controls -->

### BACKGROUND-COLOR-WATCHED-CARS
<!-- TODO: describe what this config controls -->

### BACKGROUND-COLOR-WATCHED-FLIGHTS
<!-- TODO: describe what this config controls -->

### ENABLED
<!-- TODO: describe what this config controls -->

### PLACEMENTS-POSITION
An ordered list of the elements to show on the app home screen — among
them `media_banner`, `travel_stories`, `deals`, `watched_flights`,
`watched_cars`, `ups`. It decides both presence and order: an element
left out of the list does not appear, whatever its own feature flag
says. `travel_stories` is the entry point to the Travel Stories
carousel — see
[core/product/travel-stories.md](/core/product/travel-stories.md) — so a
market can have that feature enabled and still show nothing, because
this list omits it.

### BACKGROUND-COLOR-UPS
<!-- TODO: describe what this config controls -->
