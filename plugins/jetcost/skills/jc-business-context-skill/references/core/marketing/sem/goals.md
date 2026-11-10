---
type: Marketing Concept
description: "SEM daily goals — the weekly plan marketing sets for SEM cost, revenue and GP, by day and by country cluster, for two perimeters (SEM-only and ALL traffic), and how to read it against actuals."
tags: [marketing]
timestamp: 2026-10-15T00:00:00Z
---

# SEM Goals

## Overview

SEM goals are the **weekly plan for paid search**. For every day of a
Jetcost week (Sunday to Saturday) and every
[Country Cluster](/core/marketing/sem/dimensions.md), marketing sets a
target for cost, revenue and gross profit — the reference a week's SEM
results are read against, cluster by cluster, before deciding whether to
pull one of the [levers](/core/marketing/sem/levers.md).

Marketing produces one file per week and loads it into ClickHouse. How to
query it — schema, field mapping, ready-made goal vs actual queries — is in
`skills/jc_sem_goals_skill`, not here; this file states what goals are.

## Two perimeters

Every goal is set twice:

- **SEM** — only the traffic paid search brought in, i.e. sessions whose
  lastClickNotDirect channel group is paid search (see
  [data/attribution.md](/data/attribution.md)): the SEM leaf of the
  [traffic taxonomy](/core/marketing/traffic-taxonomy.md).
- **ALL** — all the traffic of the cluster, whatever the channel: the
  cluster's whole-business result, of which SEM is one part.

GP is always revenue minus cost in each perimeter, the same SEM GP defined
in [metrics.md](/core/marketing/sem/metrics.md); it is never set on its own.

Both perimeters use the same cluster names, but the rule that assigns a
session to a cluster has changed across the files. Up to week 38 of 2026,
SEM followed the market the campaign targets and ALL the session's market.
From week 39 both follow the session's market (country and language), so
ALL contains SEM in every cluster. The lastClickNotDirect Country Cluster,
which the sem-goals dashboard compares against, follows the campaign's
target on paid traffic: a goal built on the session's market differs from
it there, mostly on the Canadian and US clusters, where campaigns buy
outside their own market.

Goals cover the clusters marketing actively plans. NORDICS (Denmark,
Norway, Sweden, Finland) is one of them from week 41 of 2026, when it was
taken out of RoW. OTHER-EU has no goal: in a goal vs actual comparison it
shows up as actuals without a target.

## How a week's goals are built

The method is not fixed. Each file states its own methodology — which past
weeks it averages, how it scales them to the portfolio's weekly target, how
it profiles the week by day — and that text is the only explanation of
where a given week's numbers come from. Read it before interpreting a week.

A file is also not made only of targets. When it is built after the week
has started, the days already closed are filled with actual data; older
files hold forecasts or plans carried forward from a previous week. Each
day says which kind of number it carries, and only the goal rows are
targets to be measured against.

## Reading goals against actuals

- Goals are written when the file is built. Revenue keeps being revised
  after that (late conversions, allocations — see
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md)), so a gap
  between a goal and the revenue measured today can be partly revision, not
  only performance. Cost does not move, and lines up exactly.
- Compare sums over the same closed days. A full-week target against a
  week still in progress is not a miss.
- When a cluster misses its goal, the operation logs are where to look for
  the lever that moved.
