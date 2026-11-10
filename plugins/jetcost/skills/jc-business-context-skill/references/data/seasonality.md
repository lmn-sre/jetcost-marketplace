---
type: Data Convention
description: "Describes Jetcost's annual and weekly traffic seasonality patterns and how they affect WoW/YoY reads."
tags: [data]
timestamp: 2026-07-22T00:00:00Z
---

# Seasonality

## Overview

Jetcost traffic and revenue follow predictable seasonal patterns
at two granularities: annual and weekly. Understanding these
patterns is essential for interpreting metric movements correctly —
a drop in August is not the same as a drop in February.

## Annual Seasonality

### Summer Peak

The strongest traffic and revenue period of the year.
July and August are consistently the highest-volume months,
driven by leisure travel demand across all major European markets.

Performance in this window sets a significant portion of the
full-year result. Anomalies here have a disproportionate impact
on YTD metrics.

### Holiday Periods

Secondary peaks occur around major holiday windows:
- **Easter** — timing shifts year to year; creates a spike in
  searches and clicks in the weeks before the holiday
- **Christmas / New Year** — late December shows strong search
  activity for January travel; the holiday days themselves
  tend to be low-traffic
- **National holidays** — market-specific. Long weekends in
  individual countries often produce short spikes in relevant
  markets

### Low Season

January and February are structurally the weakest months.
Post-holiday travel demand drops sharply. YoY comparisons
in this period tend to be less meaningful for strategic
decisions, though they are still tracked.

## Weekly Seasonality

Traffic and revenue are not evenly distributed across the week.

**Weekdays outperform weekends.** Friday, Saturday, and Sunday
consistently show lower session volumes and click volumes than
Monday through Thursday. This pattern is stable across markets
and seasons.

When interpreting daily or WTD metrics, weekend days should
be weighted accordingly. A WTD figure that includes more weekend
days than the reference period may understate underlying
performance.

## Implications for Analysis

- Always compare same day-of-week or same week-of-year to
  control for these effects (see [data/analysis-types.md](/data/analysis-types.md))
- Flat or slightly negative WoW during a holiday window may
  indicate stable underlying performance, not a real decline
- Strong WoW during a post-holiday recovery week may reflect
  base effects, not genuine growth
- When reviewing daily anomalies, check whether the day falls
  on a weekend, a public holiday, or near a known seasonal peak
  before escalating
