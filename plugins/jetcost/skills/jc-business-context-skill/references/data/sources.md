---
type: Data Concept
description: "The three ingestion paths that fill ClickHouse — Galera (production MySQL) imported nightly by maid, Argo realtime events streamed through Kafka, and third-party vendor APIs pulled on cron — and what each one implies about freshness, completeness of the trailing edge, whether a past day can change, and why reference attributes carry no history."
tags: [data]
timestamp: 2026-09-08T00:00:00Z
---

# Data Sources

## Overview

Everything queryable in ClickHouse got there through one of **three
ingestion paths**, and which one a table came through determines things
no metric definition will tell you: how recent a period can be read,
whether the trailing edge is missing or merely incomplete, whether a
past day can still change, and whether an attribute describes the
period under analysis or only the world as of last night.

This is provenance, not computation. What a field *means* lives in
[data/metrics.md](/data/metrics.md) and the ClickHouse semantic layer
skill; the specific traps that follow from *when* data becomes
complete live in [data/query-caveats.md](/data/query-caveats.md). This
file is the layer underneath both: where the rows came from in the
first place.

## The Three Sources

| Source | What it is | Route into ClickHouse | Cadence |
|---|---|---|---|
| **Galera** | The MySQL cluster production runs on — written by the site frontend as users browse | `maid`, the internal import tool | Nightly |
| **Argo** | Internal realtime event collector, in the spirit of Google Analytics — applications declare events as they happen | Kafka topic, consumed directly by a dedicated ClickHouse engine | Continuous |
| **Third-party APIs** | Vendor reporting APIs — Google Ads, Google Analytics, Google Ad Manager, Apple Ads, and others | Per-vendor download jobs on cron | Scheduled, per vendor |

## Galera — Production MySQL, Imported Nightly by `maid`

Galera is the operational database, not an analytical one: the site
frontend writes to it during a user's visit, which is what makes it the
system of record for the funnel itself. `maid` is the internal tool that
imports it into ClickHouse every evening.

`maid` loads a table in one of **two modes**, and the difference is the
part worth knowing:

- **Insert (append)** for log-shaped fact tables — the ones that record
  something that happened, at the grain it happened. Each run adds the
  new rows; rows already loaded are not rewritten by the import.
- **Truncate-and-reload** for reference tables — the registries that
  describe *what* the facts refer to: partners, campaigns, markets,
  configuration. The whole table is replaced with its current state on
  every run.

Three consequences:

- **There is no intraday Galera data.** The most recent complete day is
  yesterday. A query that includes today returns nothing, or a partial
  slice if the run has already touched it — either way, **not a drop**,
  and never evidence of one.
- **Reference tables have no past.** They describe the world as of the
  last import, so a historical breakdown by a reference attribute is
  labelled with *today's* answers: a renamed campaign appears under its
  new name for periods when it had the old one, a partner whose deal
  changed reads with the current deal, and anything deleted upstream is
  simply gone and can no longer be resolved at all. Fact rows keep the
  key they were written with; the reference table only knows the
  present.
- **Append-only is a statement about the load, not a guarantee of
  finality.** That a loaded row isn't rewritten doesn't make a recent
  period final — figures that depend on information arriving later
  still fill in afterwards, the CPA conversion lag being the standing
  example (see [data/query-caveats.md](/data/query-caveats.md) and
  [data/revenue-fields.md](/data/revenue-fields.md)).

## Argo — Realtime Events via Kafka

Argo is the internal event-collection application: instead of a
normalised transactional model, it records **events as they occur**,
the same shape of thing Google Analytics collects. The emitting
application produces onto a Kafka topic and ClickHouse consumes that
topic directly through a dedicated engine — there is no scheduled job
in the path.

- **It is the only source that can answer "what is happening right
  now."** Events are queryable within seconds to minutes of being
  emitted.
- **Its trailing edge is incomplete rather than absent**, which is the
  opposite failure mode from Galera's. A read taken now contains
  whatever has arrived so far, so two reads of the same recent window
  can legitimately disagree, and the most recent minutes always
  undercount. Let a window settle before treating it as a level.
- **An ingestion interruption shows up as a hole, not as a failed
  job.** Because the load is a continuously running consumer rather
  than a nightly run that either succeeded or didn't, a gap in a
  realtime series is a question about the pipeline for that window, not
  automatically a change in user behaviour.
- **Don't mix Argo and Galera counts of the same phenomenon in one
  figure.** When something is observable through both routes, the two
  are collected by different mechanisms at different moments and are
  not expected to reconcile exactly. Pick one source for an analysis
  and stay in it.

## Third-Party APIs — Cron Pulls from Vendor Reporting

Spend, delivery and vendor-side performance data are downloaded from
each vendor's own reporting API by scheduled jobs — Google Ads, Google
Analytics, Google Ad Manager, Apple Ads among them — and landed in
ClickHouse as-is.

- **A past day can change here, unlike anywhere else.** The vendor's
  numbers for a recent period are provisional: attribution windows
  close, invalid traffic gets filtered out, reports get restated. The
  copy in ClickHouse is only as final as the vendor's report was at the
  moment it was pulled, so the same day re-pulled later can differ.
  A vendor-sourced delta on a recent period is not yet a finding.
- **The definitions are the vendor's, not Jetcost's.** A vendor's
  session, click or conversion is counted by its own rules and its own
  dimensions, which do not line up with the funnel in
  [data/metrics.md](/data/metrics.md). This is precisely why marketing
  cost reaches sessions through allocation rather than a join — see
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md).
- **Each vendor has its own cadence and its own lag.** "Third-party" is
  not one freshness guarantee; how stale a given vendor's most recent
  day is depends on that vendor.
- **Personal fields are deliberately not imported.** Where a vendor's
  API exposes data identifying an individual, it is excluded at the
  pull, so a column visible in the vendor's own UI can be absent here
  by design rather than by oversight.

## Reading a Number: What Changes by Source

| | Galera via `maid` | Argo via Kafka | Third-party APIs |
|---|---|---|---|
| Written by | site frontend | the emitting application | the vendor |
| Latency | previous day | seconds to minutes | vendor's own report lag |
| Trailing edge | absent (today missing) | present but undercounting | present but provisional |
| Can a past day change? | not by the load itself; late-arriving figures still fill in | no | yes — vendor restatement |
| History of attributes | fact tables yes, reference tables no | events carry their own payload | as the vendor reported it |

Which specific ClickHouse table comes through which path is a fact
about the datamarts, documented in the ClickHouse semantic layer skill
rather than asserted here — this file describes the paths, not the
inventory.
