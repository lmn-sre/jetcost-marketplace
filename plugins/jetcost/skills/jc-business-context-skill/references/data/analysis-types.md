---
type: Data Convention
description: "Defines the standard comparison periods (WoW, WTD, MoM, MTD) used consistently across all teams, and the fixed cohort-age windows used when the subject is a cohort rather than a calendar span."
tags: [data]
timestamp: 2026-09-03T00:00:00Z
---

# Analysis Types and Time Periods

## Overview

Most analyses at Jetcost are comparative: a metric is only
meaningful when set against a reference point. The standard
reference periods are defined below and used consistently
across all teams and reports.

## Standard Comparison Periods

### WoW — Week over Week

Compares a given week (or day within it) against the immediately
preceding week — not the same week one year prior. The most common
short-term comparison.

Used to detect trends and short-term anomalies. Unlike MoM below,
this does not control for seasonality — a holiday window, a shifted
travel-season peak, or a post-holiday recovery week can each produce
a misleading WoW delta on their own (see
[data/seasonality.md](/data/seasonality.md)).

### WTD — Week to Date

Compares the current week from its start up to today against
the same span in the reference period (typically prior year).

Useful mid-week to assess how the current week is tracking
before it closes.

### MoM — Month over Month

Compares a full month against the same month one year prior.
Used for closed-period reporting and strategic reviews.

Note: MoM at Jetcost conventionally means **same month, prior
year** — not the immediately preceding calendar month — unless
explicitly stated otherwise. This is because comparing
January to February, for example, is structurally misleading
due to seasonality.

### MTD — Month to Date

Compares the current month from its start up to today against
the same span in the reference period (prior year).

Used for in-month tracking and pre-closing estimates.

## Notes on Reference Periods

All YoY comparisons use the **same calendar week / same calendar
month, prior year** as the baseline, not a rolling 7-day or
30-day window. This controls for seasonality and day-of-week
effects, which are significant in travel metasearch.

When comparing periods that span a year boundary or contain
anomalous events (e.g. COVID years, major fare disruptions),
the reference period should be noted explicitly in the analysis.

## Cohort-Age Windows

The periods above compare calendar spans. A **cohort** — a set of users
acquired in the same period — can't be read that way: at any given
moment the recent cohorts have had less time to produce revenue than
the older ones, so a calendar-aligned comparison of cohorts measures
maturity rather than performance.

The convention for those is **fixed windows measured from the cohort's
own start**: D15, D30, D60, D90, M6, Y1, M18 —
15/30/60/90/180/365/548 days since the first session. Each window
includes only the cohorts old enough to have completed it, which is
what makes an early and a late cohort comparable in the first place.

Used today for app install cohorts (see
[core/product/metrics.md](/core/product/metrics.md)), but the
convention isn't app-specific — it applies to any cohort-shaped
question.

## Audience

These analyses are used across all teams: Business Strategy,
Marketing, Product, and Management. The same period definitions
apply regardless of the team or report type.
