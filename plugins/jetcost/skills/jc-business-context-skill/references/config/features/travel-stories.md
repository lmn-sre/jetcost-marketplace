---
type: Feature Flag
description: "Switches on the app's Travel Stories discovery surface and the validity and selection rules its content is served under."
tags: [feature]
timestamp: 2026-09-15T00:00:00Z
---

# TRAVEL-STORIES

Enables the story-format discovery surface in the app — themed profiles
of full-screen screens, reached from the home-screen carousel, whose
calls to action hand a complete search to the app. It is an app flag:
the web has no Travel Stories.

See [core/product/travel-stories.md](/core/product/travel-stories.md)
for what the surface is, how its content is structured, and how its
impression and click numbers should be read.

Placing the carousel on the app home screen is a separate flag,
[config/features/home-screen-elements.md](/config/features/home-screen-elements.md).

## Configs

### ENABLED
Master switch for the surface. Off by default, so a market has Travel
Stories only where a rule turns them on.

### CLUSTER-THRESHOLD
<!-- TODO: describe what this config controls -->

### IGNORE-VALIDITY
<!-- TODO: describe what this config controls -->

### MAX-DAYS-BEFORE-EXPIRATION
<!-- TODO: describe what this config controls -->
