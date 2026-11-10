# Config Overview

## Overview

`config/` documents Jetcost's mutable configurations — feature flags and
partner deals — but it holds **metadata about them**, not the
configurations themselves (those live in the actual systems: the
feature-flag service, the deal management tool). This folder answers
"what does this flag/deal do and why," which the raw config value alone
doesn't tell you.

## Areas

- [config/features/](/config/features/index.md) — one file per feature flag, what it
  controls and its levers.
- [config/partners/](/config/partners/index.md) — deal metadata per partner (currently just
  the template).
