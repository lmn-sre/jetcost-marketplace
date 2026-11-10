---
name: jc-clickhouse-semantic-layer-skill
description: Semantic layer v2 for ClickHouse queries on Jetcost flight metasearch datamarts (sessions, searches, clicks, impressions, users). Covers revenue (Core CPC/CPA, MAL, Media), funnel metrics (STR, CTR, CR), ARPU, traffic attribution, partner performance, route-level analysis, impression-level offer analysis, and user funnel counts. MUST be used for any ClickHouse query to Jetcost data.
---

## Overview

This skill governs ALL ClickHouse queries to Jetcost datamarts.

**Dependencies:**
- jc_date_utils_skill skill
- clickhouse MCP connector

---

## 1. Critical Rules

⚠️  NEVER query fields directly if a computed metric exists
⚠️  NEVER substitute datamart sources — use ONLY specified tables
⚠️  NEVER deduce/infer structure from table/column names
⚠️  ALWAYS search BOTH `attributes.yml` AND `computed.yml` before declaring an attribute missing (see §3 Attribute Lookup Protocol)
⚠️  If an attribute is NOT in either file → STOP and ASK (see §7 Error & Ambiguity Handling)
⚠️  If user requests an unclear attribute → propose EXACT names from YAML files
⚠️  Query Rules (`query-rules.yml`) OVERRIDE Ambiguous Request Handling.
    If a `default_metric` rule resolves the ambiguity, apply it directly — do NOT ask the user.

---

## 2. Datamart Structure

### 2.1 The 5 Datamarts

| Datamart | Table | Grain | Data availability |
|----------|-------|-------|-------------------|
| sessions    | `datamart.jc_sessions_datamart_view` | Session-level aggregations. Strict superset of `datamart.jc_sessions_datamart` — same rows, every column the base table has, plus columns that exist on the view alone: **always query the view**, never the base table. `attributes.yml` is the authoritative list of what the view carries; this row deliberately does not enumerate it. | since **2019-01-01** |
| searches    | `datamart.jc_searches_datamart`    | Search-level aggregations | since **2019-01-01** |
| clicks      | `datamart.jc_clicks_datamart`      | Click-level aggregations | since **2019-01-01** |
| impressions | `datamart.jc_impressions_datamart` | Impression-level (each displayed offer/card) | ⚠️ **ROLLING: last 6 months + current month ONLY** |
| users       | `datamart.jc_users_datamart`       | Pre-aggregated unique user counts | since **2024-01-01** on `jetcost` — ⚠️ **later, and per business profile**, on the others |

### 2.1.1 Data Availability — check this BEFORE any historical query

Whenever the requested period goes back more than a few months, check
the window above FIRST, before writing the query.

⚠️ Out-of-window data does NOT raise an error. The query runs and
   returns ZERO rows, or a series truncated at the floor — which reads
   as a traffic collapse and is not one.

⚠️ **IMPRESSIONS IS A ROLLING WINDOW, NOT A START DATE.** It retains
   only the last 6 full months plus the current month, so the floor
   MOVES FORWARD every month. Any impression-level analysis older than
   that is IMPOSSIBLE: say so explicitly and STOP — never silently
   return the truncated slice, and never fall back to another datamart
   (clicks ≠ impressions, see §2.2).
   Verified 2026-09-10: `min(date)` = 2026-03-01.

⚠️ The other four are start dates, not retention windows: they move
   only if the datamart is rebuilt.

⚠️ **ON USERS THE START DATE IS PER BUSINESS PROFILE, AND IT IS NOT THE
   PROFILE'S LAUNCH DATE.** A new profile or website enters the users
   pipeline when it is onboarded into it, and the days already elapsed
   are not backfilled — so its first row lands some unannounced distance
   after the launch date given in the business context, while sessions
   cover the site from day one. The lag is not a constant: it has been
   both a single day and three full weeks of live daily traffic. Never
   read the two as the same date, and never infer the floor from a
   launch date. Establish it from the table itself, e.g.
   `SELECT businessProfile, min(date) FROM datamart.jc_users_datamart
   WHERE timeGrain = 'Daily' GROUP BY businessProfile`, and say so when
   a requested period starts before it.

   Two consequences, both of which return a plausible wrong number
   rather than an empty result:

   - The **first period of a profile is partial** — the monthly row is
     dated to the 1st whatever day the rows actually start, so a first
     month, week or MoM on it is an undercount that looks complete.
   - A **`firstSessionDate` cohort can pre-date the floor**, because
     that attribute is a lifetime property computed from session
     history, not from this table's rows. Such a cohort holds only the
     users who came back after the floor — everyone who stopped before
     it has no row anywhere — so it is survivorship-truncated, not
     merely late. Do not size it, and do not run retention on it.

⚠️ **Row presence ≠ column presence.** A date inside the window does
   not guarantee the COLUMNS existed then — many are far more recent
   than the datamart itself (e.g. on impressions `otherOffers` is an
   empty array before 2026-07-01; `isSelfTransfer` is web-only since
   2026-06-25). Always check the per-column availability notes in
   `attributes.yml` on top of the table window.

⚠️ **Reference attributes have no history.** Partner, campaign and
   market registries are truncate-and-reload, so a breakdown of an old
   period is labelled with TODAY's registry (renamed campaigns, current
   deals, deleted entries unresolvable). Flag this whenever a
   historical breakdown uses a reference dimension.

⚠️ **A period can be in window and still be incomplete.** When a
   partner feed, a source system or a pipeline breaks, the period's
   rows can be missing, partial or wrong while the query still runs
   normally. `data-incidents.yml` lists those periods and what was
   recovered; rule R024 says how to carry them in an answer.

**Source of truth** — the catalog.

### 2.2 Dimension Hierarchy (CRITICAL)

```
┌─────────────────────────────────────────────────────────────┐
│  DIMENSIONS ARE HIERARCHICAL (except users)                 │
│                                                             │
│  KEY CONCEPT:                                               │
│    impression = itinerary DISPLAYED to a user               │
│    click      = specific OFFER clicked by the user          │
│    (one itinerary can have 1+ offers)                       │
│                                                             │
│                    sessions (base)                          │
│                        │                                    │
│                    searches                                 │
│                    ╱        ╲                               │
│              clicks          impressions                    │
│                                                             │
│  clicks      →  HAS dimensions from: searches + sessions    │
│  impressions →  HAS dimensions from: searches + sessions    │
│  searches    →  HAS dimensions from: sessions               │
│  sessions    →  base dimensions only                        │
│                                                             │
│  ⚠️ clicks and impressions are SIBLINGS (both inherit       │
│     from searches+sessions). They are NOT related to        │
│     each other and CANNOT be joined.                        │
│                                                             │
│  ⚠️ IMPRESSIONS = LOW PRIORITY. Use ONLY when the user      │
│     explicitly asks about impressions / displayed           │
│     itineraries. For generic questions (revenue, clicks,    │
│     partner perf), ALWAYS prefer the main funnel:           │
│     sessions → searches → clicks.                           │
│                                                             │
│  ⚠️ To avoid redundancy, dimensions in attributes.yml are   │
│     listed ONLY at their lowest level (sessions first).     │
│     If you need a dimension for impressions, check          │
│     sessions and searches too!                              │
│                                                             │
│  ──────────────────────────────────────────────────────     │
│  users → FULLY INDEPENDENT datamart. Does NOT participate   │
│          in the hierarchy above. Has its own dimension set. │
│          Use ONLY for USER-BASED questions (user counts,    │
│          unique visitors, new/returning, user funnel).      │
└─────────────────────────────────────────────────────────────┘
```

**Example:** `country` is listed under `sessions` in attributes.yml, but it's also available when querying `searches`, `clicks`, and `impressions` (NOT users — users lists all its dimensions explicitly).

**Exception — inheritance is not 100% uniform.** A few dimensions declared on an ancestor do not exist on every descendant. Each datamart declares its own exceptions in attributes.yml under `not_inherited_dimensions`; **check that list before assuming an inherited dimension is available.** Today there are three. `impressions` does not carry the event-scoped search ranks (`searchRankPerUser`, `searchRankPerSession`, and their Flight/Car/Dp variants) even though `searches` declares them — use `userSearch*RankPerUser` there for the per-user counters, and note the per-session ones have no equivalent on impressions at all. And the three `*CountryCluster` dimensions declared on `sessions` are physical columns of `datamart.jc_sessions_datamart_view` alone, so `searches`, `clicks` and `impressions` all exclude them. Likewise the seven `firstSessionFirstFlightSearch*` dimensions (route and booking window of the user's first flight search) exist only on the sessions tables: `searches`, `clicks` and `impressions` exclude them too — there, use the bare `countryFrom`/`iataFrom`/`bookingWindow`… columns of the current search.

### 2.3 Users Datamart (special rules)

```
┌─────────────────────────────────────────────────────────────┐
│  USERS DATAMART — MANDATORY RULES                           │
│                                                             │
│  USE ONLY for USER-BASED questions:                         │
│  "how many users", "unique visitors", "new vs returning",   │
│  "user funnel", "user counts by step/country/etc."          │
│  For everything else → use the main funnel datamarts.       │
│                                                             │
│  1. ALWAYS filter by timeGrain (Daily/Weekly/Monthly).      │
│     Without this filter, data is MEANINGLESS (duplicated).  │
│                                                             │
│  2. The `users` column is ALREADY a pre-aggregated count.   │
│     Use SUM(users) to aggregate across dimensions.          │
│                                                             │
│  3. ALWAYS filter by `step` to specify the funnel stage.    │
│     Steps: 01. Session Qualified → 02. Flight Search →      │
│            03. Flight Impression Detail Page →              │
│            04. Flight Click Core → 05. Flight Booking       │
│                                                             │
│  4. This datamart is INDEPENDENT — it does NOT inherit      │
│     dimensions from any other datamart. ALL its dimensions  │
│     are listed explicitly in attributes.yml.                │
└─────────────────────────────────────────────────────────────┘
```

### 2.4 Metrics Are NOT Hierarchical

```
┌─────────────────────────────────────────────────────────────┐
│  METRICS ARE NOT HIERARCHICAL                               │
│                                                             │
│  Each metric belongs to ONE specific datamart.              │
│  Read computed.yml precisely for each metric's source.      │
│                                                             │
│  ⚠️ You cannot mix metrics from different datamarts in      │
│     a single query. Datamarts are final, pre-aggregated     │
│     structures — they CANNOT be joined to each other.       │
│     If a request needs metrics from multiple datamarts,     │
│     run separate queries and combine results in the output. │
│                                                             │
│  ⚠️ The users datamart has only ONE metric: `users`.        │
│     It is pre-aggregated — use SUM(users) and ALWAYS        │
│     filter by timeGrain and step.                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. File Structure & Attribute Lookup Protocol

### 3.1 Files

| File | Contents |
|------|----------|
| `attributes.yml`  | Physical columns for each datamart (dimensions + metrics) |
| `computed.yml`    | Calculated dimensions and metrics (derived from attributes or other computed) |
| `segments.yml`    | Pre-defined WHERE conditions for common analysis patterns |
| `query-rules.yml` | Automatic rules to be applied to every extraction |
| `data-incidents.yml` | Periods in which data in ClickHouse is missing, incomplete or wrong, and what was recovered (applied by R024) |

### 3.2 Attribute Lookup Protocol (MANDATORY)

When resolving ANY dimension or metric requested by the user:

1. Search BOTH files, always, in this order:
   - `attributes.yml`  → physical columns
   - `computed.yml`    → derived dimensions/metrics (dictGet, CONCAT, CASE, formulas)

2. NEVER stop at the first file. A dimension may exist only as computed
   (e.g., Sub-Continent, Route, isSameLocationCustom) even when a related
   physical column exists in attributes.yml (e.g., countryFrom, continentFrom).

3. Search pattern: grep across BOTH files for the requested term AND its
   common variants (e.g., "subContinent" → also "sub-continent", "subRegion",
   "Sub-Continent").

4. Only AFTER both files return no match → apply Unknown Attribute Request
   handling (see §7).

⚠️ Computed dimensions are first-class citizens of the semantic layer.
   Treating `attributes.yml` as authoritative alone is a BUG.

---

## 4. Conventions

### 4.1 Week Convention: Sunday-Based

```
┌─────────────────────────────────────────────────────────────┐
│  WEEK CONVENTION: SUNDAY-BASED                              │
│                                                             │
│  The default week in Jetcost datamarts runs from            │
│  SUNDAY to SATURDAY. It is NOT the ISO week (ISO starts     │
│  on Monday): it only shares ISO's year rule — the week      │
│  across 1 January belongs to the year holding at least 4    │
│  of its days (2026-01-01 → 202553, 2024-12-29 → 202501).    │
│  In SQL: yearWeek = toYearWeek(date, 6); the date the       │
│  week starts on = toStartOfWeek(date, 6) (no column).       │
│                                                             │
│  Two week fields exist:                                     │
│  • yearWeek         → Sunday-based (Sun–Sat) ← DEFAULT      │
│  • Year Week Monday → Monday-based (Mon–Sun), i.e. the      │
│                       real ISO week, computed via           │
│                       dictGet('config.dict_week',           │
│                       'yearWeekMonday', tuple(date))        │
│                                                             │
│  ⚠️ When working with weekly ranges (WTD, WoW, weekly       │
│     breakdowns), ALWAYS use yearWeek (Sunday-based).        │
│                                                             │
│  ⚠️ jc_date_utils_skill functions (getWeekNumber,           │
│     getWTDRange, getStartOfTheWeek, getPreviousWTDRange)    │
│     are already aligned with yearWeek (Sunday-based).       │
│                                                             │
│  Format: YYYYWW (e.g., 202608 = week 8 of 2026,             │
│          starting Sunday 2026-02-22)                        │
└─────────────────────────────────────────────────────────────┘
```

**Example — filtering by week:**
```sql
-- WTD using yearWeek
WHERE yearWeek = 202608 AND qualifiedSession = true

-- Or equivalently using date range from jc_date_utils_skill
WHERE date BETWEEN '2026-02-22' AND '2026-02-24' AND qualifiedSession = true
```

**Example — WoW comparison:**
```sql
-- This week vs last week
WHERE yearWeek IN (202607, 202608) AND qualifiedSession = true
GROUP BY yearWeek
```

---

## 5. Query Workflow

Steps to follow for every extraction:

### Step 1 — Load the semantic layer files

Use the `view` tool to read each companion file in the same directory as this `SKILL.md`:
- `attributes.yml`
- `computed.yml`
- `segments.yml`
- `query-rules.yml`
- `data-incidents.yml`

### Step 2 — Calculate dates using /jc-date-utils-skill

```bash
cp date-utils.js /home/claude/calc-dates.js   # from /jc-date-utils-skill
echo "console.log('Yesterday:', getYesterday());" >> /home/claude/calc-dates.js
node /home/claude/calc-dates.js
```

For weekly ranges, follow the Sunday-based convention (§4.1).

### Step 3 — Apply Query Rules

Load `query-rules.yml`. For each rule where `active: true`:

- **Check scope**: does the rule's `scope` match the datamart being queried? (`all` matches everything; a list matches any datamart it contains)
- **Check type**:
  - `default_filter` / `default_exclusion` → add condition to the WHERE clause
  - `default_metric` → use the specified metric when the user's request is ambiguous
  - `default_behavior` → apply the behavior described in `description` and `notes`
- **Override**: if the user's request explicitly contradicts a rule, the user's request wins (and report the override).
- **Report**: in the output, always list which rules were applied.

Output format:
```
📋 Regole applicate:
- R001: Revenue default = revenueCurrent
- R002: qualifiedSession = true
```

If no rules were applied, report: `📋 Nessuna regola applicata.`

If a rule is overridden, report it explicitly:
```
⚠️ R001 overridden: utente ha richiesto revenueOperational invece di revenueCurrent
```

### Step 4 — Build the query using ONLY semantic layer definitions

See §6 for construction patterns.

### Step 5 — Execute via ClickHouse MCP connector

---

## 6. Query Construction

### 6.1 Using Computed Metrics

Each metric in `computed.yml` specifies:
- `source`: which datamart table to query
- `expression`: the SQL expression to use (take it as-is, it already includes any mandatory conditions such as `qualifiedSession` filters via `sumIf`)

**Example — web_sessions:**
```sql
SELECT SUM(sessions) as web_sessions
FROM datamart.jc_sessions_datamart_view
WHERE context = 'web'
  AND qualifiedSession = true
  AND date BETWEEN '2025-01-01' AND '2025-01-07'
```

### 6.2 Using Calculated Ratios

Metrics with `formula` instead of `expression` are calculated from other metrics. Query the component metrics first, then compute the ratio.

**Example — web_STR:**
```sql
-- Query both components, then divide
web_STR = web_search / web_sessions
```

### 6.3 Using Segments

Segments are pre-defined WHERE conditions. Add their `condition` to your query.

**Example — organic traffic:**
```sql
WHERE sessionCampaignChannelGroup = 'organic-search'
```

---

## 7. Error & Ambiguity Handling

### 7.1 Unknown Attribute Request

If user asks for something not in `attributes.yml` nor in `computed.yml` (after applying the Attribute Lookup Protocol, §3.2):

1. **STOP immediately**
2. Say: "This attribute is not defined in the semantic layer. Did you mean: [suggest similar names]?"
3. **NEVER** guess or explore the database schema

### 7.2 Generic / Ambiguous Metric Names

If user requests a metric using a GENERIC name (e.g., "revenue", "clicks", "sessions"):

1. **First**, check `query-rules.yml` for a `default_metric` rule that resolves the ambiguity.
   If one applies → use it directly and report the rule.
2. **Otherwise**:
   - **STOP immediately**
   - Search BOTH `attributes.yml` AND `computed.yml` for ALL metrics containing that term
   - List the exact metric names found and ask which one to use
   - **NEVER** assume or pick one autonomously

**Example — "revenue":**
```
User: "show me yesterday's revenue"
Wrong: assume revenueCurrent without checking rules
Right: R001 applies (Revenue default = revenueCurrent) → use revenueCurrent and report R001.

If no rule applied, ask:
"The semantic layer contains multiple revenue metrics:
- revenueCurrent (delayed 1-2 days, more accurate)
- revenueOperational (used for traffic acquisition, real-time)
- revenueEcpc (eCPC-based estimate)
Which one do you want?"
```

### 7.3 Missing Breakdown / Decomposition

If user requests a breakdown (e.g., by Core/MAL/Media) and a metric for one component is NOT in the semantic layer:

1. **STOP immediately**
2. Report which metrics exist and which are missing
3. **NEVER** invent calculations (e.g., "Media = Total - Core - MAL")
4. Ask user how to proceed

**Example — revenue by type:**
```
User: "show me revenue by Core, MAL and Media"
Wrong: calculate Media as difference
Right: "Found revenueCurrentCore and revenueCurrentMal,
but there is no revenueCurrentMedia metric in the semantic layer.
How do you want to proceed?"
```

### 7.4 Connection Timeout

1. **STOP immediately**
2. Say: "ClickHouse connection timeout. Check VPN."
3. Do not retry automatically