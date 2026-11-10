---
name: jc-sem-goals-skill
description: "Explains Jetcost's SEM daily goals — the weekly targets marketing sets for SEM cost, revenue and GP, split by day and by country cluster, for two perimeters (SEM-only and ALL traffic) — and how to query them on ClickHouse (mcp_utils.jc_sem_daily_goals_data). Covers the schema, which rows are real goals and which are forecasts/actuals/carry-overs (sourceType), the per-file methodology notes, known anomalous weeks, and how to compare goals against actuals from the sessions datamart (lastClickNotDirect attribution, country cluster mapping). MUST be used whenever a user asks about SEM goals or targets, weekly/daily goal pacing, goal vs actual for SEM or for a country cluster, or what the marketing plan for a given week was."
---

## Overview

SEM goals are the **weekly plan marketing sets for paid search**: for every
day of a Jetcost week (Sunday → Saturday) and every country cluster, a
target for cost, revenue and gross profit. Marketing produces one JSON file
per week and loads it into ClickHouse, where it lands in
`mcp_utils.jc_sem_daily_goals_data`. Each file also carries a free-text
`methodology` explaining how that week's targets were built.

Every row holds **two perimeters**:

| Perimeter | Fields | What it covers |
|---|---|---|
| **SEM** | `cost`, `rev`, `gp` | Traffic whose lastClickNotDirect channel group is `paid-search` |
| **ALL** | `costAll`, `revAll`, `gpAll` | All traffic of the cluster, every channel |

The business meaning of goals (who sets them, how they are used) lives in
the jetagents domain bundle at `core/marketing/sem/goals.md` — see
`jc-business-context-skill`. This skill is about reading the table.

**Dependencies:**
- ClickHouse MCP connector
- `jc-clickhouse-semantic-layer-skill` — for the actuals side of any goal vs
  actual comparison
- `jc-date-utils-skill` — for week boundaries; Jetcost weeks start on
  **Sunday**, which is also how goal files are cut

---

## 1. Critical Rules

⚠️ **Not every row is a goal.** `sourceType` says what the row actually is,
   and files are not homogeneous — see §3. A file built on a Monday can
   inject the already-closed Sunday as `actual`; older files hold
   `forecast`, `target` or `historical` rows. Always report which kind of
   row a number comes from, and never present an `actual` row as a target
   to beat.
⚠️ **Read the week's `methodology` before interpreting its numbers.** It
   changes every week (different baselines, different scaling, weeks
   excluded on purpose) and is the only explanation of where the targets
   come from. It is written in Italian; quote or summarise it in the user's
   language.
⚠️ **Deduplicate by load.** One file per week has been loaded once so far,
   but nothing prevents a reload. Always keep only the rows of the latest
   `insertDateTime` for a `yearWeek` (pattern in §4.1) — summing two loads
   doubles the plan silently.
⚠️ **`yearWeek` is `YYYYWW`** (e.g. `202638`), despite the column comment
   saying `YYYYMM`. For date logic use `date` / `weekStart`, never parse
   `weekLabel`: its format is free text and changes from file to file
   (`W29 (19-25 Jul 2026)`, `W36 (6 - 12 Sep 2026)`, and W32's label even
   says `W31`).
⚠️ **GP is always derived**: `gp = rev - cost` and `gpAll = revAll - costAll`
   on every row. Aggregate cost and revenue, then derive GP or ROAS from the
   sums — never average per-day ratios.
⚠️ **Cluster names are spelled differently from the datamart.** Goals write
   `US-ES EXT`, the sessions datamart writes `US-ES-EXT`. Normalise with
   `replaceAll(countryCluster, ' ', '-')` before any join (§2.2).
⚠️ **The same cluster name does not cover the same sessions in every
   file.** Up to W38 the SEM perimeter was split by the campaign's target
   market and ALL by the session's market; W39–W41 split both by the
   session's market (country + language). Split the actuals the way the
   week's file was split (§2.3), or per-cluster gaps mix performance with
   perimeter. Totals are not affected.
⚠️ An empty result for a week means **no file was loaded for it**, not a
   zero plan. Coverage starts at W29 2026 (week of 2026-07-19).

---

## 2. Table: `mcp_utils.jc_sem_daily_goals_data`

Grain: **one row per day × country cluster**, 16 clusters × 7 days = 112 rows
per week up to W40, 17 × 7 = 119 from W41 (which added `NORDICS`).

| Column | Type | Meaning |
|---|---|---|
| `yearWeek` | UInt32 | Jetcost week, `YYYYWW` |
| `weekStart` | Date | Sunday opening the week (derived from the days, not from `weekLabel`) |
| `weekLabel` | String | The file's own week label — display only |
| `goalFile` | String | Source file name (e.g. `sem_daily_goal_W38.json`), set by the loader |
| `methodology` | String | How the week's targets were built, ~1k chars, Italian, same on every row of a file |
| `date` | Date | Day the target refers to |
| `weekday` | String | `Sun`..`Sat`, redundant with `date` |
| `countryCluster` | String | Country cluster key from the file (§2.2) |
| `clusterOrder` | UInt8 | Order of the cluster in the file, 0-based — use it to sort clusters the way marketing presents them |
| `sourceType` | String | What the row is — `goal`, `actual`, `forecast`, … (§3) |
| `sourceNote` | String | Free-text note for that day, ~100 chars, starts with the `sourceType` token |
| `cost`, `rev`, `gp` | Decimal(18,4) | SEM perimeter, EUR |
| `costAll`, `revAll`, `gpAll` | Decimal(18,4) | ALL perimeter, EUR |
| `insertDateTime` | DateTime | When the file was loaded |

### 2.1 How the two perimeters map onto the datamart

Verified against `datamart.jc_sessions_datamart_view` on an `actual` day:

| Goal field | Datamart equivalent (`qualifiedSession = true`, `businessProfile = 'jetcost'`) |
|---|---|
| `cost` | `costProRataMktg`, `lastClickNotDirectCampaignChannelGroup = 'paid-search'` |
| `rev` | `revenueCurrentProRataTotal`, same filter |
| `costAll` | `costProRataMktg`, no channel filter |
| `revAll` | `revenueCurrentProRataTotal`, no channel filter |

How each perimeter is split into clusters depends on the week (§2.3).
Split the way the file was, costs reconcile to the euro; revenue reconciles
in direction but not to the
euro, because the file reads revenue at load time and the datamart keeps
revising it afterwards (late conversions, allocations). Expect a few percent
on the total and more on small clusters — that is not a data error on
either side. See `jc-clickhouse-semantic-layer-skill` for what
`revenueCurrentProRataTotal` includes (it is whole-business revenue, not
Core only).

### 2.2 Country clusters

The keys, in `clusterOrder`: `US-ES EXT`, `UK`, `FR`, `CA-FR`,
`US-EN LOC`, `US-EN EXT`, `CA-EN`, `US-ES LOC`, `LATAM`, `ES`, `PT`, `IT`,
`GERMANIC`, `NL`, `IE`, `NORDICS`, `RoW`. `NORDICS` (DK, NO, SE, FI, taken
out of `RoW`) exists from W41; the files before it have the other 16.

The names are those of the datamart's `*CountryCluster` columns
(definition in `jc-clickhouse-semantic-layer-skill`, `attributes.yml`), with
two differences:

- spaces instead of hyphens in the US keys — normalise before joining;
- the datamart also has `OTHER-EU`, which has **no goal** (nor did
  `NORDICS` up to W40). In a goal vs actual table it shows up as actuals
  without a target; say so rather than dropping it, or the actual total
  won't add up.

Same name does not mean same sessions: which sessions a cluster holds
depends on the key the file was built on (§2.3).

### 2.3 Which key splits the clusters

| Weeks | SEM perimeter | ALL perimeter | Checked on |
|---|---|---|---|
| W29–W38 | Campaign's target market (`lastClickNotDirectCampaignCountryDetail`, which is what `lastClickNotDirectCampaignCountryCluster` reads on paid traffic) | Session's market (country + language) | W37's Sunday `actual`: SEM within 80 EUR of the column on ~20.6k, ALL within 48 EUR of country + language |
| W39–W41 | Session's market (country + language) | Same | Sunday `actual` of W39, W40 and W41: both perimeters within 60 EUR of country + language on ~19–21k |

The files of the first group that name their method call it "v3
dashboard-aligned" (W29, W35–W37); W38 averages earlier files. From W39 the
methodology says "chiave unica": one key for both perimeters, so ALL
contains SEM on every row.

The country + language key, as the W39–W41 files apply it:

```sql
multiIf(
  lower(country) = 'us' AND lower(language) = 'es', if(ifNull(lastClickNotDirectCampaignLocalVsExt, 'local') = 'ext', 'US-ES-EXT', 'US-ES-LOC'),
  lower(country) = 'us' AND lower(language) = 'en', if(ifNull(lastClickNotDirectCampaignLocalVsExt, 'local') = 'ext', 'US-EN-EXT', 'US-EN-LOC'),
  lower(country) = 'fr' OR (lower(country) = 'be' AND lower(language) = 'fr'), 'FR',
  lower(country) = 'ca' AND lower(language) = 'fr', 'CA-FR',
  lower(country) = 'ca' AND lower(language) = 'en', 'CA-EN',
  lower(country) = 'uk', 'UK', lower(country) = 'it', 'IT', lower(country) = 'es', 'ES',
  lower(country) = 'pt', 'PT', lower(country) = 'ie', 'IE', lower(country) = 'nl', 'NL',
  lower(country) IN ('de', 'at'), 'GERMANIC',
  lower(country) IN ('ar', 'br', 'cl', 'co', 'mx', 'pe', 've', 'uy', 'bo'), 'LATAM',
  lower(country) IN ('dk', 'no', 'se', 'fi'), 'NORDICS',  -- W41 on; RoW before
  'RoW')
```

Against `lastClickNotDirectCampaignCountryCluster` it differs on paid
traffic, where the column follows the campaign's target market and the file
the session's: EXT and cross-market campaigns move cost between rows (on
2026-10-11, CA-EN SEM cost was 1,349 EUR in the file and 1,232 on the
column, CA-FR 1,227 against 1,340). On the rest of the traffic the two
mostly agree, except US LOC/EXT (the column reads it from the country
registry, the file from `lastClickNotDirectCampaignLocalVsExt`, LOC when
empty) and VE, UY, BO (LATAM in the file, `RoW` on the column).

The sem-goals dashboard has split both perimeters by
`lastClickNotDirectCampaignCountryCluster` since 2026-10-15, the single
definition in the view's DDL. Goals built on that column compare like with
like there; for W39–W41 its per-cluster gaps on CA-EN, CA-FR and the US
rows include the key difference above.

---

## 3. `sourceType` — what a row really is

Files built at different times carry different kinds of rows. Values seen
so far:

| Value | Meaning |
|---|---|
| `goal` | A target set for that day — the normal case for current weeks |
| `target` | Same intent as `goal`, older wording (W29) |
| `forecast` | A projection rather than a committed target |
| `historical` | A previous week's plan carried forward (W34 reuses W33) |
| `actual` | Real data from ClickHouse injected for a day already closed when the file was built (e.g. the Sunday of a file built on Monday) |

The list is not closed: if a new value appears, describe it from its
`sourceNote` and the week's `methodology` rather than assuming an error.

### 3.1 Weeks to read with care

- **W29–W37 were loaded together in mid-September 2026**, after the fact.
  Most of them are forecasts or mixed files, not goals in the strict sense;
  W36 is the first week made only of `goal` rows.
- **W32 is an exact copy of W31** with dates shifted by 7 days.
- **W34's SEM values are W33's**, carried forward unchanged.
- **W39 changes the cluster key** and **W41 adds `NORDICS`**, taken out of
  `RoW` (§2.3): a cluster's goals across either boundary cover different
  sessions, and so does a per-cluster average spanning it.

Exclude W32 and W34 from any "average of past goals" — counting them would
weigh the same week twice. Marketing's own W38 methodology does exactly
that.

---

## 4. Common Query Patterns

### 4.1 Latest load of a week (start here)

```sql
SELECT date, weekday, countryCluster, sourceType, cost, rev, gp, costAll, revAll, gpAll
FROM mcp_utils.jc_sem_daily_goals_data
WHERE yearWeek = 202638
  AND insertDateTime = (
    SELECT max(insertDateTime) FROM mcp_utils.jc_sem_daily_goals_data WHERE yearWeek = 202638
  )
ORDER BY date, clusterOrder
```

### 4.2 Weekly plan by cluster, plus the methodology

```sql
SELECT countryCluster,
       sum(cost) AS cost, sum(rev) AS rev, sum(gp) AS gp,
       sum(costAll) AS costAll, sum(revAll) AS revAll, sum(gpAll) AS gpAll,
       groupUniqArray(sourceType) AS sourceTypes
FROM mcp_utils.jc_sem_daily_goals_data
WHERE yearWeek = 202638
GROUP BY countryCluster
ORDER BY any(clusterOrder)
```

```sql
SELECT any(goalFile), any(weekLabel), any(methodology)
FROM mcp_utils.jc_sem_daily_goals_data
WHERE yearWeek = 202638
```

### 4.3 What is loaded, week by week

```sql
SELECT yearWeek, weekStart, any(goalFile) AS file,
       groupUniqArray(sourceType) AS sourceTypes,
       count() AS rows, uniqExact(insertDateTime) AS loads, max(insertDateTime) AS lastLoad
FROM mcp_utils.jc_sem_daily_goals_data
GROUP BY yearWeek, weekStart
ORDER BY yearWeek
```

`loads > 1` means a week was reloaded: use §4.1's dedup.

### 4.4 Goal vs actual by cluster

Use the week's date range from `jc-date-utils-skill`. Actuals follow §2.1.
The query splits actuals by `lastClickNotDirectCampaignCountryCluster`; for
a week built on another key (§2.3), put that week's key in its place.

```sql
WITH
  goals AS (
    SELECT replaceAll(countryCluster, ' ', '-') AS cluster, any(clusterOrder) AS ord, 1 AS hasGoal,
           sum(cost) AS goalCost, sum(rev) AS goalRev,
           sum(costAll) AS goalCostAll, sum(revAll) AS goalRevAll
    FROM mcp_utils.jc_sem_daily_goals_data
    WHERE yearWeek = 202638
      AND insertDateTime = (SELECT max(insertDateTime) FROM mcp_utils.jc_sem_daily_goals_data WHERE yearWeek = 202638)
    GROUP BY cluster
  ),
  actuals AS (
    SELECT lastClickNotDirectCampaignCountryCluster AS cluster,
           sumIf(costProRataMktg, lastClickNotDirectCampaignChannelGroup = 'paid-search') AS cost,
           sumIf(revenueCurrentProRataTotal, lastClickNotDirectCampaignChannelGroup = 'paid-search') AS rev,
           sum(costProRataMktg) AS costAll,
           sum(revenueCurrentProRataTotal) AS revAll
    FROM datamart.jc_sessions_datamart_view
    WHERE date BETWEEN '2026-09-20' AND '2026-09-26'
      AND qualifiedSession = true
      AND businessProfile = 'jetcost'
    GROUP BY cluster
  )
SELECT cluster,
       if(hasGoal, round(goalCost), NULL) AS goalCost, round(cost) AS cost,
       if(hasGoal, round(goalRev), NULL) AS goalRev, round(rev) AS rev,
       if(hasGoal, round(goalRev - goalCost), NULL) AS goalGp, round(rev - cost) AS gp,
       if(hasGoal, round(goalRevAll - goalCostAll), NULL) AS goalGpAll, round(revAll - costAll) AS gpAll
FROM goals
FULL OUTER JOIN actuals USING (cluster)
ORDER BY hasGoal DESC, ord, cluster
```

The `FULL OUTER JOIN` keeps `OTHER-EU` (and `NORDICS` up to W40: actuals,
no goal) in the output. ClickHouse fills the unmatched side of a join with `0`, not `NULL`,
which would read as a zero target rather than no target at all — hence the
`hasGoal` flag (the read-only connector refuses `SETTINGS join_use_nulls`).
For a week still in progress, restrict both sides to the closed
days, or the comparison pits a full-week target against a partial week.

### 4.5 Daily pacing within a week

Same as §4.4, grouped by `date` (and optionally cluster) instead of cluster
alone. Keep `sourceType` in the output: a day marked `actual` in the file
is not a target, and its "gap" only measures how much revenue was revised
since the file was built.

---

## 5. Relationship to the other pillars

- **Business context (pillar 1)** — `core/marketing/sem/goals.md` in the
  domain bundle says what goals are for; `core/marketing/sem/metrics.md`
  defines the SEM GP and ROAS they are expressed in.
- **Factual data (pillar 3)** — goals are a plan, the sessions datamart is
  what happened. Goal vs actual always joins this table with
  `jc-clickhouse-semantic-layer-skill`'s metrics, never with numbers
  re-derived by hand.
- **Operational state (pillar 2)** — when an actual misses its goal, the
  operation logs (`jc-operation-logs-skill`) are where to look for the
  lever that moved.

If you find a gap, an inconsistency or an undocumented `sourceType` while
using this skill, report it via `jc-context-feedback-skill`.
