---
type: Operational Levers
description: "The marketing levers that are not tied to one channel or buying platform, and the `internal_event_type` values that identify them on jc_operation_logs_data, whichever source reported the row."
tags: [marketing, operation-logs]
internal_event_types: [campaign-status-change]
timestamp: 2026-10-15T00:00:00Z
---

# Marketing Operational Levers

## Overview

A lever is the business act, not the platform it was pulled on. The
levers in this file mean the same thing on every channel marketing buys
on, so each one has a single `internal_event_type` whichever source
reported the row: an importer reading the platform's own change history
(`gads`), or a person declaring the operation by hand (`manual-marketing`)
on a platform no importer reads.

Which platform and which campaign a row is about is carried by the row
itself, in `source` and `entity`, never by the lever. Splitting a lever
per platform would scatter one business act across several values and
force every query to know the list.

The levers that only exist on SEM — bid targets, device modifiers,
budgets, AI Max assets — are in
[sem/levers.md](/core/marketing/sem/levers.md), which builds on this
file: read both for the full marketing taxonomy.

## Levers

| Lever | `internal_event_type` | Effect |
|---|---|---|
| **Campaign status** | `campaign-status-change` | Pause → stops all spend on the campaign immediately, blunter than any budget or bid change. Enable → resumes it. |

### `campaign-status-change` — Campaign status

Scoped to one campaign, on any marketing platform. One value covers both
directions: whether a row is a pause or an enable is in its summary,
never a separate `internal_event_type` each.

How it reaches the operation logs depends on the platform:

- **Google Ads** (`source: gads`) — read automatically from the change
  history. The campaign's `status` flips between `ENABLED`, `PAUSED` and
  `REMOVED`, and the summary carries the old → new value. No learning
  period in either direction.
- **Platforms with no importer** (`source: manual-marketing`) — declared
  by hand by the marketing team, with the platform and the campaign family
  in `entity` (`criteo:remarketing`), and the direction — and the single
  campaign, when only one was touched — in the summary. Criteo is the case
  today.

**Read an enable as the start of spend, not of its effect.** On a
platform that builds its audience or learns its bidding after the
switch-on, traffic and cost can ramp up over the following days rather
than appear on the day itself, and the first day of attributed sessions
can trail the first day of cost when campaign tracking lands later.
When matching an enable to a metric that moved, look at the days after
it, not only the day itself.
