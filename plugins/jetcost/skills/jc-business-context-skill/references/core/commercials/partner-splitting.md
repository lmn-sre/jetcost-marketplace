---
type: Commercial Technique
description: "How Jetcost applies differentiated deal economics on a dimension the system doesn't natively support: registering multiple 'artificial' partnerCodes for one real counterparty, activated mutually exclusively per scenario."
tags: [commercials]
timestamp: 2026-08-05T00:00:00Z
---

# Partner Splitting (Artificial Partners)

## Overview

The registry has one commercial deal per `partnerCode`. When a negotiated
deal needs to differentiate economics along a dimension the registry has
no native field for, the workaround is to register **multiple
`partnerCode`s for what is really a single counterparty** — one base
code plus one or more suffixed variants, each able to carry its own
deal terms. At runtime, activation logic shows exactly one variant per
navigation scenario — never more than one at a time for the same
context.

This is not the same thing as a channel-tracking tag. Each variant is a
distinct entry in the registry and can be priced independently; the
split exists specifically *because* the system can't express "one deal,
different rate depending on X" any other way.

## Known dimensions split this way

- **Web vs. App**: base code plus an `_APP` variant (e.g. `PARTNER` /
  `PARTNER_APP`).
- **Local vs. non-local traffic**: base code plus geography-scoped
  variants (e.g. `PARTNER_US` / `PARTNER_NONUS`). Verified example: the
  `SMARTFARES` group splits into `SMARTFARES_US` (traffic from CR, US,
  PR, CA) and `SMARTFARES_NONUS` (traffic from EC, DO, GT, UY, HN, BR,
  and others) — the two never overlap on `countryUser`.

These two are illustrative, not exhaustive — the same technique can be
used for any dimension the registry doesn't support natively.

## Reading this in data

- `groupCode` stays the same across a partner's variants — it's still
  one commercial relationship at the group level (see
  [config/partners/index.md](/config/partners/index.md)). The split shows up in
  `partnerCode` only.
- **Don't assume a suffix is just a tag.** Before merging a variant back
  with its base partner in an analysis, check whether its terms
  (`businessModel`, rate) actually differ — collapsing them silently can
  average together two different deals.
- When aggregating "this partner"'s performance, decide explicitly
  whether to sum across all its variants or keep them separate.
  Because activation is mutually exclusive per scenario, summing is
  usually the right call for a *volume* read (the variants partition
  the same underlying traffic) — but not for a *rate* read (eCPC,
  payoff), where blending two different negotiated terms produces a
  number that isn't any partner's actual rate.
