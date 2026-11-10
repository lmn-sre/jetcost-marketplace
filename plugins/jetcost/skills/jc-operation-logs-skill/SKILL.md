---
name: jc-operation-logs-skill
description: "Explains what Jetcost's operation logs are — the second pillar of Jetcost context, alongside business context MD files and the ClickHouse semantic layer — and how to query them via the ClickHouse MCP connector. Covers the raw event table (mcp_utils.jc_operation_logs_data) and the daily/batch summary table (mcp_utils.jc_operation_logs_summary_data) — schema, known sources/departments/event types, the internal_event_type business classification (and where its meaning is documented in the jetagents domain bundle), metadata JSON parsing, per-source start dates (before which a source simply has no data), and common query patterns. MUST be used whenever a user asks what operation logs are, what changed/happened on a given day for Jetcost's marketing, martech, tech, or commercial teams, or wants to query, audit, or reconstruct a timeline of actions taken by people/systems at Jetcost."
---

## Overview

Operation logs are the **second pillar** of Jetcost's context (alongside
business context MD files — pillar 1 — and the ClickHouse semantic layer for
factual data — pillar 3, see `jc-clickhouse-semantic-layer-skill`).

They record **operations taken by people and systems at Jetcost**: GitLab
releases, Google Tag Manager container publishes, Cloudflare WAF rule
changes, Google Ads campaign/budget/bid changes, commercial rule changes, and
similar events from
other internal systems over time. Unlike the semantic
layer (which describes *what happened to users* — sessions, clicks, revenue),
operation logs describe *what actions were taken by the team or by automated
systems*, and are the natural place to look when a question is really "what
changed, and why."

**Dependencies:**
- ClickHouse MCP connector
- `jc-date-utils-skill` (for any date-range/period logic — always use it
  instead of hand-rolling date math)

---

## 1. Critical Rules

⚠️ NEVER treat the source/department/event_type list in §3 as exhaustive —
   it is a living log; new sources get added over time. If you see a value
   not listed here, just describe it based on the data, don't assume it's an error.
⚠️ ALWAYS distinguish `occurred_at` (when the action actually happened,
   as reported by the source system) from `logged_at` (when it was ingested
   into this table). Use `occurred_at` for any "what happened when" analysis.
⚠️ `metadata` is a raw JSON string whose shape is **source-specific**
   (a GitLab tag payload looks nothing like a Google Ads change event). Don't
   assume a common structure — inspect a few rows for that `source` first if
   you haven't seen it before, then extract with `JSONExtractString` /
   `JSONExtractRaw`.
⚠️ If asked for "operation logs" without further detail, default to
   `jc_operation_logs_summary_data` for a fast narrative overview, and drop
   down to `jc_operation_logs_data` (optionally via `raw_ids`) when the user
   needs event-level detail.
⚠️ This is a genuine gap-reporting surface too: if you find entries that are
   inconsistent, contradictory, or missing fields needed to interpret them,
   that's a `jc-context-feedback-skill` trigger (pillar: `operation_logs`).
⚠️ NEVER treat `event_type` and `internal_event_type` as the same thing.
   `event_type` is the source system's own raw vocabulary (e.g. Google Ads'
   `CAMPAIGN`), and can be ambiguous on its own — `CAMPAIGN` alone covers
   several different business actions. `internal_event_type` is Jetcost's own
   business classification of the row, computed at import time. See §3.1 for
   where each value's actual business meaning is documented.
⚠️ Each source has a **start date** before which it simply has no data —
   see §2.4 for the per-source table. An empty result for a range reaching
   before a source's start means **that period was never imported**, not "no
   events happened," and reporting one as the other is the single easiest way
   to be confidently wrong with these tables. Check your date range against
   the table in §2.4 before concluding "nothing changed".

---

## 2. The Two Tables

### 2.1 `mcp_utils.jc_operation_logs_data` — raw events

One row per individual operation/event. This is the audit-trail granularity.

| Column         | Type     | Meaning |
|----------------|----------|---------|
| `id`           | UInt64   | Row id |
| `source`       | String   | System the event came from (e.g. `gitlab`, `gads`, `commercial-logs`) |
| `department`   | String   | Owning team (e.g. `tech`, `marketing`, `commercials`) |
| `event_type`   | String   | Kind of operation, in the source system's own vocabulary (e.g. `TAG`, `CAMPAIGN_CRITERION`, `CAMPAIGN_BUDGET`, `CAMPAIGN`, `CORE_RULE`, `RULE`) |
| `internal_event_type` | String | Jetcost's own business classification of this row, computed at import time — see §3.1. `unknown` when not (yet) classified |
| `entity`       | String   | The specific thing the event is about (repo path + tag, campaign name, etc.) |
| `country`      | String   | Country the event applies to, if applicable (often empty for tech events). **ISO 3166-1 alpha-2, so the UK market is `GB`, not `UK`** — see the note under §4.6: this table does *not* follow the datamarts' non-standard `UK`. `ALL` when a change explicitly applies to every market — except on `feature-logs`, where *every* row is `ALL` because that source never states a scope; see §4.6 |
| `occurred_at`  | DateTime | When the action actually happened (source system's own timestamp) |
| `summary`      | String   | Short, human-readable one-liner |
| `description`  | String   | Longer human-readable explanation (may be empty) |
| `metadata`     | String   | Raw JSON payload, source-specific shape — see §2.3 |
| `natural_key`  | String   | Dedup/idempotency key, built from source-specific identifiers (e.g. `source\|id\|tag\|commit_sha` for GitLab, `source\|customerId\|changeEventResourceName\|changeDateTime` for Google Ads) |
| `logged_at`    | DateTime | When this row was ingested into the table |
| `insertDateTime` | DateTime | Internal insert timestamp |

### 2.2 `mcp_utils.jc_operation_logs_summary_data` — daily/batch summaries

One row per **batch of related raw events**, grouped into a narrative
summary (e.g. "all desktop bid adjustments for US-EN campaigns on a given
day"). This is what you want for a quick daily/weekly recap without wading
through hundreds of raw rows.

| Column         | Type     | Meaning |
|----------------|----------|---------|
| `id`           | UInt64   | Row id |
| `source`       | String   | Same as raw table |
| `department`   | String   | Same as raw table |
| `day`          | String   | Calendar day the batch belongs to (`YYYY-MM-DD`) |
| `occurred_at`  | DateTime | Timestamp of the batch (typically the latest/anchor event in it) |
| `summary`      | String   | Short human-readable summary of the whole batch |
| `description`  | String   | Longer explanation of what the batch covers |
| `countries`    | String   | Comma-separated list of countries touched (e.g. `FR,IT,US`) |
| `internal_event_types` | String | Comma-separated distinct `internal_event_type` values (see §3.1) rolled up from this batch's raw rows — same convention as `countries`. Since 2026-10-23 a batch of `gads` or `commercial-logs` holds exactly one value (rows with different levers are never grouped together); older batches, and the deterministic groupings of other sources, can mix several (e.g. a budget change and a tCPA change on the same campaign) |
| `raw_ids`      | String   | JSON array of `id` values from `jc_operation_logs_data` that this summary rolls up — the bridge back to event-level detail |
| `natural_key`  | String   | Dedup/idempotency key for the batch |
| `logged_at`    | DateTime | Ingestion timestamp |
| `insertDateTime` | DateTime | Internal insert timestamp |

Note: the summary table has **no `event_type`/`entity`/`metadata`** — those
are collapsed into `summary`/`description`. `internal_event_types` (plural)
is the one exception carried up from the raw rows, as a rollup — see above.
A `commercial-logs` batch from 2026-10-23 on also covers a single
integration, named at the end of `summary` (e.g.
`… (TRAILINGTAB/STANDARD, 16 countries)`).
Go to the raw table (via `raw_ids`) when you need `event_type`/`entity`/`metadata`-level detail.

⚠️ **This table lags the raw table, and a day can be summarized in more than
one pass.** Two consequences worth knowing before you build anything on it:

- **The current day is never in it.** A day is summarized only once fully
  elapsed, so rows imported today reach this table with tomorrow's first
  import run. A question about today has to go to the raw table — reading
  this one would report today as empty for *every* source.
- **A day's summary rows are a set, not an ordered partition.** Raw rows can
  land in a day after it was first summarized (a re-run over a wider window,
  or a source like `gitlab` whose `occurred_at` is the commit date rather
  than the tag date, so an old commit tagged today lands in a past day). A
  later run summarizes exactly those stragglers without rewriting what was
  already there, so a day can hold more summary rows than one pass would
  produce, and `raw_ids` across them covers every raw row without lining up
  one-to-one with logical batches. Before 2026-09-17 those late rows were
  never summarized at all: if you are reading summary rows written before
  that date, a day can still be missing some of its raw rows entirely —
  count against the raw table when completeness matters.

### 2.3 `metadata` shape by source (examples seen so far)

- **`gitlab` / `TAG`**: `{"project":{"id","path_with_namespace"},"tag":{"name","message","target","commit_sha","commit_created_at","commit_title",...}}`
- **`gads` / `CAMPAIGN_CRITERION` / `CAMPAIGN_BUDGET` / `CAMPAIGN`**: `{"customer":{"resourceName","id","descriptiveName"},"campaign":{"resourceName","name"},"changeEvent":{"resourceName","changeDateTime","changeResourceType","changeResourceName","clientType","oldResource","newResource","resourceChangeOperation","changedFields",...}}`
- **`commercial-logs` / `CHANGED_CORE_RULE` / `CHANGED_NOT_CORE_RULE`**: `{"id","source":"core_rule"|"rule","vertical","group","partner","integration_type","integration_subtype","country","created_at","reason","info","logs":[...]}` — `reason` (added upstream on 2026-09-09) is the enum the change's author picks in admin3 and the field `internal_event_type` is derived from, so it's redundant with that column; it is empty on every record written before that date. `info` is the author's free-text reason and `logs[]` the field-level old → new lines, both of which are already on the row as `summary`/`description` (since 2026-10-23 `summary` is `info` followed by `(integration_type/integration_subtype)`; earlier rows carry the bare `info`). `CHANGED_NOT_CORE_RULE` means `source = 'rule'`, not a non-CORE integration: `rule` records are often on CORE integrations too — filter on `integration_type` for that. `entity` is `group.partner`. The endpoint also returns the admin account's name, which the importer strips before writing — do not expect it here.
- **`commercial-logs` / `CHANGED_DEAL`**: `{"id","source":"commissions_rule","vertical","group","partner","integration_type","integration_subtype","country","device","context","valid_from","expiry_date","business_model","value","currency","min_cpc","min_cpc_currency","cpa_percentage_min_threshold","cpa_percentage_max_threshold","types":[{"conversion_type","value","currency",...}]}` — the deal as it stands **after** the change; admin3 does not send the rule it replaced, so a row is never a before → after. `occurred_at` is `valid_from` (the day the deal takes effect, at 00:00 UTC), not when it was entered. Amounts are fixed-scale decimal strings (`"0.75000"`); on the `cpa%` models `value` is a percentage of ticket value even though `currency` is filled. `country` in metadata keeps admin3's `*` wildcard, while the column says `ALL`. `internal_event_type` is always `deal-change`.
- **`abtest-logs` / `ABTEST_STATUS_CHANGE`**: `{"id","test_model","test_model_code","rules":[{"website","country","language","device"},...],"variations":[{"id","model_id","name"},...],"scope","info","logs":[...]}` — top-level `id` is the log record's own id, not a test id. `variations[]` lists the test's variations with two ids: `model_id`, the variation of the test *model* (stable across runs, = `variation_id` in the live feature state, as the Jetcost Services connector's `features_*` tools show it), and `id`, the variation of the *run* in force at that record (= `abTestVariationId` on the datamarts; every re-activation of a test mints a new run with new ids, so join on `id` for exposure and on `model_id` for a test's whole history). Only present on records from 2026-07-02 on — the admin3 API no longer serves earlier ones, so older rows have no `variations` and can only be tied to a test run by name and timing. A `Change Rules Recap` record can already carry the ids of the run that the next activation will start (sorting-v2, 2026-08-27). Also note `country`/`language`/`device` live *inside* `rules[]`, one entry per website/country/language/device combination the test targets, not as top-level fields (an earlier version of this importer assumed a top-level `record.country` that never actually existed). `entity` is `test_model_code`; one raw row is written per distinct `rules[]` tuple, so `metadata` on every one of those rows is the *same* full record (all rules, verbatim) — filter into the specific rule you care about client-side. `country` on the row itself is `'ALL'` when that rule's own country is admin3's `'*'` (applies to every market) rather than a specific code.

- **`feature-logs` / `FEATURE_CHANGE`**: `{"id","feature_code","feature_name","created_at","info"}` — `info` is the author's free-text note about the change (defaulting to admin3's own `"Changes Recap"` when they wrote nothing) and is already on the row as `summary`, prefixed with the feature code — `summary` is `` `<feature_code>: <info>` `` (e.g. `FLIGHTS-WEB-TO-APP-BLOCKING-ELEMENT: DE off`), because this source is stored 1:1 into the summary table, which has no `entity` column; `description` is always empty for this source. The endpoint also returns a `logs[]` of field-level change lines that the importer deliberately does **not** store — admin3's internal object churn (`RuleItem #72840 created`, before/after JSON blobs) — so for what exactly changed, go to admin3, not to `metadata`. `entity` is `feature_code`, which is also the filename (lowercased) of that feature's own file under `domain/config/features/`. No market scope anywhere in the record, which is why every row's `country` is `ALL` — see §4.6. The endpoint also returns the admin account's name; the importer strips it before writing, so it does not appear here.

- **`gtm` / `RELEASE`**: `{"account":{"id"},"container":{"id","publicId","name","label","businessProfile","usageContext"},"version":{"id","name","description","fingerprint","deleted","live_at_import","tagManagerUrl"}}` — one row per published Google Tag Manager container version. `entity` is the container's short label (`WEB`, `WGTM`, `SGTM` for jetcost, `VERIFLIGHTS` for veriflights), which is also `container.label`; `container.businessProfile` is the business profile the container serves (same values as the datamarts' `businessProfile`: `jetcost`, `veriflights`) — filter on it with `JSONExtractString(metadata, 'container', 'businessProfile')` to scope GTM publishes to one profile, since operation logs have no business-profile column; `summary` is `` `<label>: <version name>` `` (e.g. `WEB: Add OpenAI pixel + remove some legacy tags`), because this source is stored 1:1 into the summary table, which has no `entity` column. `version.name` is written by whoever published and is the only description of what changed — GTM's API exposes no tag-level diff, so for that follow `version.tagManagerUrl` into GTM itself. `description` is almost always empty (nobody fills GTM's description field). `version.fingerprint` is the millisecond epoch `occurred_at` is derived from: it is the version's **creation** time, not its publish time (in GTM's normal flow publishing is what creates the version, so they coincide). `live_at_import` says this version was the live one when the row was imported — it is frozen at that moment and never rewritten, so several rows per container carry it; read it as "this version reached production", never as "this is live today". `country` is always empty: a container is global.

- **`cloudflare-waf` / `RULESETS_UPDATE` / `RULESETS_CREATE` / `RULESETS_DELETE`**: `{"zone":{"name"},"ruleset":{"id","kind","phase","version_before","version_after"},"interface","actor_type","changes":[{"op","rule","fields","before","after"}],"reordered"}` — one row per write to one Cloudflare zone's WAF rules. `entity` is the zone (a domain, e.g. `jetcost.it`, `fly-scanner.com`); `country` is always empty, since a zone is not a market. `ruleset.phase` says which WAF family: `http_request_firewall_custom` (custom rules), `http_ratelimit` (rate limiting), `http_request_firewall_managed` (managed rules). `changes[]` lists only the rules whose behaviour changed: `op` is `created` / `updated` / `deleted`, `fields` (on updates) names what changed among `action`, `expression`, `enabled`, `action_parameters`, `ratelimit`, `logging`, `description`, and `before`/`after` carry the rule's id and those fields, and an `expression` update also carries `expression_diff` (`{"added","removed","tokens_added","tokens_removed"}`: the atomic conditions added and removed, with the zone's name written as `<zone>`, and how many partner-token values were added or removed). A rule edited through Terraform gets a new id, so `before.id` and `after.id` differ on an update — pair rules by `rule` (the description), not by id. A rule renamed and changed in the same write appears as one `created` plus one `deleted`. `changes` is empty when a write left every rule as it was: `reordered: true` means only the evaluation order changed; otherwise it was a no-op re-apply. `interface` is `UI` for a dashboard edit and the API gateway's hostname for an API/Terraform one; `actor_type` is `user` or `system`. Who made the change is never stored. Partner tokens in expressions are masked as `token=<redacted>`. `summary` says what changed without naming the zone — e.g. `Updated WAF custom rule "Default - Challenge Unverified Bots - Score < 30": expression + not http.host contains "argo", + not http.host contains "sst"`, `Disabled WAF custom rule "…"`, `Created WAF custom rule "…" (skip)`; at most two conditions are named, then `+N more`, and partner tokens appear only as counts (`tokens +1`) — so that the summary table can collapse one change applied to many zones into one row: there, `summary` ends with `(N zones)` and `description` lists the zones, or, for a single zone, `summary` is prefixed with it.

- **`manual-marketing` / `MANUAL_ENTRY`**: `{"channel","sheet_row"}` — `channel` is the marketing platform (`criteo`, `bing`, ...), also the prefix of `entity`, which is `<channel>:<campaign family>` (e.g. `criteo:remarketing`); filter on `JSONExtractString(metadata, 'channel')` or `entity LIKE 'criteo:%'`. A single-campaign operation still carries the family in `entity` and names the campaign in `summary`. `sheet_row` is the row of the marketing sheet that declared it. `occurred_at` is always midnight UTC: the declaration is day-level, so never read the time of day. One sheet row covering several markets is one raw row per country (same `summary`), collapsed into one summary row with the countries rolled up.

- **`manual-app` / `MANUAL_ENTRY`**: `{"platform","version","sheet_row"}` — one row per mobile app version published on a store, declared in the `App Releases` tab of the same sheet. `platform` is `android` or `ios`, also the suffix of `entity` (`app:android`, `app:ios`); `version` is the semantic version (`4.49.0`). `summary` is `` `<Platform> app <version>: <feature>; <feature>; ...` `` with every feature the author listed, and `description` repeats them one per line. `internal_event_type` is always `app-release`. `occurred_at` is midnight UTC (day-level declaration), and `country` is empty: an app version is the same build in every market. The same version on both platforms is two rows, often with different features. Before lining these dates up against app versions in the datamarts, read `app-release` in `domain/core/tech/levers.md`: a version's traffic routinely starts before its release and lingers long after, and that is not an inconsistency to report.

Treat this list as a starting point, not a spec. When in doubt, run a quick
`SELECT metadata FROM ... WHERE source = 'X' LIMIT 3` and look at the actual
JSON before writing extraction logic.

### 2.4 Coverage start per source

Each source has a **start date**: the date from which it is imported.
**Do not look for records before it.** There are none, there is nothing to
recover, and why a given source starts where it does is a property of the
import rather than something you need to reason about — treat the date as
given.

| `source`          | `department`  | Data starts |
|-------------------|---------------|-------------|
| `abtest-logs`     | `product`     | 2026-05-04  |
| `gads`            | `marketing`   | 2026-07-22  |
| `commercial-logs` | `commercials` | 2026-06-01  |
| `gitlab`          | `tech`        | 2026-07-29  |
| `manual`          | any           | 2026-09-01  |
| `manual-marketing`| `marketing`   | 2026-10-06  |
| `manual-app`      | `tech`        | 2026-10-19  |
| `feature-logs`    | `product`     | 2026-09-01  |
| `gtm`             | `martech`     | 2026-09-01  |
| `cloudflare-waf`  | `tech`        | 2026-09-01  |

Last reviewed 2026-10-15. The dates are not in the order the sources were
added, and that is expected. A start date is never a statement about the
business: it doesn't mark when the business started doing the thing being
logged, only when we started keeping a record of it.

**A range that begins before a source's start date cannot be answered by
that source.** The empty result means the period was never imported — say
so explicitly. Reporting it as "nothing changed" is the single easiest way
to be confidently wrong with these tables.

These dates are **settled, not provisional**. If your range starts on or
after the date above, the source covers it and you don't need to re-derive
anything. If it starts before, the source cannot answer that period, and
no wider window or re-import will change it. An empty result before a
start date is the documented state of the world: report it as such rather
than going looking for a way to fill it in.

To read the current values off the table directly — or to check
`last_event`, which this table deliberately doesn't freeze:

```sql
SELECT source,
       min(occurred_at) AS coverage_starts,
       max(occurred_at) AS last_event,
       count() AS n
FROM mcp_utils.jc_operation_logs_data
GROUP BY source
ORDER BY coverage_starts
```

That answers both ends of the coverage question at once:

- `coverage_starts` **after** the start of your range → the source cannot
  answer the question for that period at all. Say so explicitly; do not
  report the empty result as "nothing happened". Note this is the first
  *stored event*, which can fall later than the source's start date above
  (today it does, on `feature-logs`) — the table is the authority on where
  coverage begins, so don't correct it from this query.
- `last_event` far in the past → either a genuinely quiet source or an
  importer that has stopped running. Volume is the hint (`gads` produces
  thousands of rows, `abtest-logs`, `feature-logs`, `gtm`, `manual`, `manual-marketing` and `manual-app` tens or fewer — a month
  of silence is unremarkable for those six and alarming for the former;
  `cloudflare-waf` comes in bursts of one row per zone, ~75 at a time, with
  quiet weeks in between), but the two
  cases are indistinguishable from these tables alone: name the ambiguity
  instead of resolving it silently.
- **A quiet `entity` is not a quiet source.** `gtm` tracks four containers
  and only one of them (`WEB`) publishes regularly — `WGTM` and `SGTM` last
  published months before this source started, so they legitimately have
  zero rows. Read per-container silence as "not touched", not as missing
  data.

---

## 3. Known source / department / event_type combinations

Snapshot at time of writing (do not treat as exhaustive — see §1):

| source            | department   | event_type(s)                              |
|-------------------|--------------|---------------------------------------------|
| `gads`            | `marketing`  | `CAMPAIGN_CRITERION`, `CAMPAIGN_BUDGET`, `CAMPAIGN` |
| `gitlab`          | `tech`       | `TAG`                                        |
| `gtm`             | `martech`    | `RELEASE`                                    |
| `cloudflare-waf`  | `tech`       | `RULESETS_UPDATE`, `RULESETS_CREATE`, `RULESETS_DELETE` |
| `commercial-logs` | `commercials`| `CHANGED_CORE_RULE`, `CHANGED_NOT_CORE_RULE` (activation changes; on rows written before 2026-08-04, the earlier names `CORE_RULE`, `RULE` for the same two things), `CHANGED_DEAL` (deal changes) |
| `abtest-logs`     | `product`    | `ABTEST_STATUS_CHANGE`                       |
| `feature-logs`    | `product`    | `FEATURE_CHANGE`                             |
| `manual`          | any (`media`, `tech`, ...) | `MANUAL_ENTRY`                 |
| `manual-marketing`| `marketing`  | `MANUAL_ENTRY`                               |
| `manual-app`      | `tech`       | `MANUAL_ENTRY`                               |

`manual` is the one source not pulled from an API: its rows are declared by
hand, in a YAML file in the jetagents repo, for operations on systems that
expose no API to read them back (an ad-server console, a CDN dashboard, a
vendor back office). `event_type` is always the constant `MANUAL_ENTRY` —
there's no source system whose vocabulary it could carry — and `department`
is whichever team performed the operation, so this source can appear under
any of them. Practical consequence when reading a timeline: this source is
only as complete as what someone chose to write down, so a gap in it means
either a quiet period or an intervention nobody wrote down.

`manual-marketing` is the same kind of source, filled by the marketing team
in a shared Google Sheet instead of the repo — today mostly Criteo campaign
switches, a platform with no importer. Every hand-declared source starts
with `manual`, so `source LIKE 'manual%'` returns all of them; the same
completeness caveat applies. `manual-app` is a third one, in another tab of
that sheet: the mobile app releases, dated on their store publication.

If you encounter a new `source`/`department`/`event_type` not listed here,
describe it based on the actual rows you see rather than guessing — and
consider flagging it via `jc-context-feedback-skill` so this list can be kept
up to date.

### 3.1 `internal_event_type` — business-meaning classification

`internal_event_type` is computed at import time by each source's importer
(in the jetagents repo, `agents/import-operation-logs/importers/*.js`) — it's
a curated classification, not a passthrough of `event_type`. The two can
differ a lot: gads' `event_type = CAMPAIGN` alone covers three different
`internal_event_type` values depending on which field actually changed
(`tcpa-adjustment`, `bidding-strategy-change`, `rename`).

⚠️ **`tcpa-adjustment` does not cover the whole tCPA lever.** A campaign
attached to a shared (portfolio) bidding strategy carries its target on
that strategy, and Google's Change History does not expose that resource
at all — verified, see `agents/import-operation-logs/CLAUDE.md` in the
jetagents repo. Every row here is a campaign-level change. Read a count as
"campaign-level tCPA moves", never as the lever's total activity, and
don't read a campaign's silence on this lever as inactivity — it may have
been moved onto a portfolio strategy (which does show up, as
`bidding-strategy-change`).

`troas-adjustment` is the newer sibling: marketing has moved part of the
fleet from tCPA to Target ROAS, so both are active at once on different
campaigns. A campaign runs on one objective or the other, never both — a
campaign **moving** between them is `bid-objective-change`, not an
adjustment of either, and the direction of the move reads off the summary.

⚠️ **`bidding-strategy-change` does not mean "the campaign changed how it
bids".** It only reports a campaign being attached to, or detached from, a
shared *portfolio* strategy. When a campaign swaps its own objective in
place, Google names only the target fields and not the strategy-assignment
ones, so the event never reaches this value — it reaches
`bid-objective-change`. Counting strategy changes on
`bidding-strategy-change` alone undercounts, and can return zero over a
window in which objectives really did move.

**Every value is kebab-case** — lowercase, hyphen-separated, never
underscores. Unlike `event_type` (which echoes each source system's own
`UPPER_SNAKE` vocabulary), `internal_event_type` is Jetcost's own, so it
has one spelling across every source, so an underscored value is not
something to work around — flag it via `jc-context-feedback-skill`.

**What each value means to the business lives in the jetagents domain
bundle, one file per department** (pillar 1, not this skill):

| `department` | Where to look | Coverage |
|---|---|---|
| `marketing` (`gads`) | `domain/core/marketing/levers.md` (every platform, incl. `manual-marketing` rows), extended by `domain/core/marketing/sem/levers.md` (SEM only) | `budget-adjustment`, `device-bid-adjustment`, `tcpa-adjustment`, `troas-adjustment`, `cpc-ceiling-adjustment`, `bid-objective-change`, `campaign-status-change`, `asset-upgrade` (real business levers), `bidding-strategy-change`, `rename` (technical events) |
| `tech` (`gitlab`, `manual-app`, `cloudflare-waf`) | `domain/core/tech/levers.md` | `release` (gitlab); `app-release` (manual-app); `waf-rule-change` (cloudflare-waf) |
| `martech` (`gtm`) | `domain/core/martech/levers.md` | `tag-release` |
| `commercials` (`commercial-logs`) | `domain/core/commercials/levers.md` | `activation-change`, `targeting-change`, `traffic-cut`, `deal-change` |
| `product` (`abtest-logs`, `feature-logs`) | `domain/core/product/levers.md` | `enable-abtest`, `disable-abtest`, `update-abtest-rules` (abtest-logs); `update-feature-config` (feature-logs) |
| `media` | *no taxonomy yet* | hand-declared operations only, `manual-entry` |
| any (`manual`, `manual-marketing`) | `domain/data/operation-log-classification.md` | `manual-entry`, plus any real lever the author declared |

`unknown` isn't automatically a data-quality problem — it means either the
importer hasn't been extended to classify that specific pattern yet, or no
taxonomy exists yet for that source at all, or the field a taxonomy reads
from didn't exist upstream when the row was written. That last case is why
every `commercial-logs` activation row (`CHANGED_CORE_RULE`/`CHANGED_NOT_CORE_RULE`) before **2026-09-09** is `unknown` and always
will be: admin3 only started sending the `reason` field that classifies them
on that date, and returns it empty for older records. A taxonomy can therefore start
later than its source's data does (§2.4) — don't read `unknown` rows from
that earlier stretch as unclassified work. On
`commercial-logs`, `unknown` also covers the case where the change's author
picked admin3's `other` reason, which deliberately has no
`internal_event_type` of its own; `metadata.reason` tells the two apart when
that matters. Same
"living log, not exhaustive" caveat as the rest of this section: if `unknown`
makes up an unexpectedly large share of a source you'd expect to be well
covered, that's worth flagging via `jc-context-feedback-skill` rather than
assuming it's fine.

⚠️ NEVER read `manual-entry` as a synonym for `unknown`. `unknown` means an
automated importer could not classify the row — a backlog item, and the
reason the `unknown` share of a source is worth measuring at all.
`manual-entry` means a person declared an operation that has no recurring
lever type — a terminal, correct state, never a gap. A hand-declared row is
never `unknown`, and an automated source never emits `manual-entry`. The
business meaning of both lives in
`domain/data/operation-log-classification.md`.

---

## 4. Common Query Patterns

All examples assume the ClickHouse MCP connector. Always scope with a date
range (use `jc-date-utils-skill` to compute it) — these tables grow
continuously. If that range reaches back more than a couple of weeks, check it
against §2.4's start dates first, so you can tell a source that has no data
for the period from one that had no activity in it.

### 4.1 Quick daily/weekly recap (start here for generic questions)

```sql
SELECT day, source, department, summary, description, countries
FROM mcp_utils.jc_operation_logs_summary_data
WHERE occurred_at >= now() - INTERVAL 7 DAY
ORDER BY occurred_at DESC
```

### 4.2 Activity breakdown by source/department/event_type over a period

```sql
SELECT source, department, event_type, count() AS n,
       min(occurred_at) AS first_seen, max(occurred_at) AS last_seen
FROM mcp_utils.jc_operation_logs_data
WHERE occurred_at >= now() - INTERVAL 30 DAY
GROUP BY source, department, event_type
ORDER BY n DESC
```

### 4.3 Drilling down from a summary batch to its raw events

```sql
-- 1. Find the summary row of interest and grab its raw_ids
SELECT id, day, summary, raw_ids
FROM mcp_utils.jc_operation_logs_summary_data
WHERE day = '2026-08-03' AND source = 'gads'
ORDER BY occurred_at DESC

-- 2. Use those ids to fetch the underlying raw events
SELECT id, entity, country, summary, description, metadata
FROM mcp_utils.jc_operation_logs_data
WHERE id IN (1115833361520282589, 14181182383820729699)  -- from raw_ids above
```

### 4.4 Extracting fields from `metadata` (Google Ads example)

```sql
SELECT
    entity AS campaign,
    country,
    occurred_at,
    JSONExtractString(metadata, 'changeEvent', 'changeResourceType') AS change_type,
    JSONExtractString(metadata, 'changeEvent', 'resourceChangeOperation') AS operation,
    summary
FROM mcp_utils.jc_operation_logs_data
WHERE source = 'gads' AND event_type = 'CAMPAIGN_BUDGET'
  AND occurred_at >= now() - INTERVAL 7 DAY
ORDER BY occurred_at DESC
```

### 4.5 Extracting fields from `metadata` (GitLab tag example)

```sql
SELECT
    entity AS repo_and_tag,
    occurred_at,
    JSONExtractString(metadata, 'tag', 'commit_sha') AS commit_sha,
    JSONExtractString(metadata, 'tag', 'commit_title') AS commit_title,
    summary
FROM mcp_utils.jc_operation_logs_data
WHERE source = 'gitlab' AND event_type = 'TAG'
ORDER BY occurred_at DESC
LIMIT 20
```

### 4.6 Filtering by country

```sql
SELECT day, summary, countries
FROM mcp_utils.jc_operation_logs_summary_data
WHERE has(splitByChar(',', countries), 'IT')
  AND occurred_at >= now() - INTERVAL 14 DAY
ORDER BY occurred_at DESC
```

**The UK is `GB` here.** `country` (raw) and `countries` (summary) are ISO
3166-1 alpha-2 throughout, normalised at import time. This is deliberately
*not* the spelling the datamarts use: their market fields (`country`,
`countryUser`, ...) carry the non-standard `UK`, the one non-ISO code across
~38 markets (`domain/data/query-caveats.md`, "UK / GB Country-Code Split",
enforced as `R015` in the semantic layer skill). The operation logs are a
newer table and use the standard instead.

Two consequences:

- A user asking about "the UK" here means `country = 'GB'`. `country = 'UK'`
  returns nothing.
- **Joining or comparing this column against a datamart market field needs
  the datamart side normalised**, or the UK silently drops out of the result:

```sql
-- operation logs joined to a datamart on market
... ON if(d.country = 'UK', 'GB', d.country) = l.country
```

Also note `ALL`, which is not a country code: it marks a change that
explicitly applies to every market (a cross-market GAds account, or an
admin3 rule whose own country is `'*'`). A country filter won't match it, so
include it explicitly when a market-level question should also surface
cross-market changes:

```sql
WHERE country IN ('GB', 'ALL')
```

⚠️ `ALL` does not mean the same thing on every source, so never count it
across sources as if it did.

- On `gads` and `abtest-logs` it is a statement about the change: it came
  from a cross-market account, or from a rule whose own country is `'*'`.
  The change really did apply everywhere.
- On `feature-logs` it is not a statement about the change at all. **Every
  row of that source is `ALL`** — admin3 never says which markets a feature
  change applied to, so there is nothing to put in the column and `ALL` is
  what it gets. A row is equally compatible with a change to one market and
  a change to all of them.

Two things follow for `feature-logs`. Never report a feature change as
global on the strength of this column. And a market-scoped filter like
`country IN ('GB', 'ALL')` will return *every* feature change ever made,
GB-related or not — a reasonable default, since any of them might have
touched GB, but treat them as candidates to check in admin3, not as
confirmed GB events. (The country codes that show up in those rows'
`summary` are prose the author typed, not data — don't parse them as scope
either.)

### 4.7 Filtering by business lever (`internal_event_type`)

See §3.1 for what each value means — e.g. every tCPA change across all
campaigns this week:

```sql
SELECT entity AS campaign, occurred_at, summary
FROM mcp_utils.jc_operation_logs_data
WHERE source = 'gads' AND internal_event_type = 'tcpa-adjustment'
  AND occurred_at >= now() - INTERVAL 7 DAY
ORDER BY occurred_at DESC
```

The summary table's `internal_event_types` is a comma-list, so use `has()`
the same way as the country filter above:

```sql
SELECT day, summary, internal_event_types
FROM mcp_utils.jc_operation_logs_summary_data
WHERE has(splitByChar(',', internal_event_types), 'tcpa-adjustment')
  AND occurred_at >= now() - INTERVAL 7 DAY
ORDER BY occurred_at DESC
```

---

## 5. Relationship to the other pillars

- **Business context (pillar 1)** — MD files explaining *why* things work the
  way they do at Jetcost (definitions, commercial models, product areas). See
  `jc-business-context-skill`. This is also where `internal_event_type`'s
  business meaning lives (§3.1) — this skill tells you the value is
  `tcpa-adjustment`, pillar 1 tells you what that means and why it matters.
- **Operation logs (pillar 2, this skill)** — a factual, timestamped record
  of *actions taken* by people and systems.
- **Snapshots (pillar 2, alongside this skill)** — where the levers stand
  *right now*, rather than how they moved. Today that is the live
  feature-flag state, the active A/B tests and the active partners, read
  through the Jetcost Services connector (`features_*`, `abtests_*`,
  `commercials_*` tools, Claude Desktop on the network/VPN): pair them with
  `feature-logs` / `abtest-logs` here, which say when and roughly what
  changed, while the snapshot gives the exact current result.
- **Semantic layer (pillar 3)** — the ClickHouse layer describing *user
  behavior and outcomes* (sessions, clicks, revenue). See
  `jc-clickhouse-semantic-layer-skill`.

Operation logs are most useful for root-cause investigations: e.g. "why did
CTR drop on this date" is a pillar-3 question, but "what changed on that date
that could explain it" is answered here — cross-reference `occurred_at` in
these tables against anomalies found in the semantic layer.

If you find gaps, inconsistencies, or undocumented `metadata` shapes while
using this skill, report them via `jc-context-feedback-skill`
(pillar: `operation_logs`) rather than silently working around them.
