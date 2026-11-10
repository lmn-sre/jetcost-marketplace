---
type: Operational Levers
description: "Product operations tracked in operation logs, and the `internal_event_type` values that identify them on jc_operation_logs_data (sources: abtest-logs, feature-logs)."
tags: [product, operation-logs]
internal_event_types: [enable-abtest, disable-abtest, update-abtest-rules, update-feature-config, unknown]
timestamp: 2026-09-18T00:00:00Z
---

# Product Operational Levers

What an A/B test is, and how the sessions it exposed are segmented in
the data, is covered in [core/product/abtests.md](/core/product/abtests.md);
this file covers only the operations recorded against one.

## `enable-abtest` — A/B test enabled

Source: `abtest-logs`, `event_type: ABTEST_STATUS_CHANGE`. A test in
admin3's abtest tool was switched from disabled to enabled. Marks the start
of the window during which the test can affect users — relevant as a
timestamp to cross-reference against funnel/conversion changes on the
`entity` (the test's code) from that point on.

## `disable-abtest` — A/B test disabled

Source: `abtest-logs`, `event_type: ABTEST_STATUS_CHANGE`. The reverse of
`enable-abtest` — a test switched from enabled back to disabled, marking the
end of its active window.

## `update-abtest-rules` — A/B test targeting changed

Source: `abtest-logs`, `event_type: ABTEST_STATUS_CHANGE`. The set of
website/country/language/device combinations a test targets was changed —
one or more rules added and/or removed — without necessarily changing
whether the test is enabled. Distinct from `enable-abtest`/`disable-abtest`:
those flip the test's overall on/off state, this narrows or widens *who*
sees it while it's running. Doesn't indicate direction (widening vs.
narrowing exposure) on its own — check `metadata.rules` (or the row's own
`country`, for a single dimension tuple) to see the resulting scope.

## `update-feature-config` — feature-flag configuration changed

Source: `feature-logs`, `event_type: FEATURE_CHANGE`. Something changed in
the configuration of the feature flag named by `entity` (its feature code,
the same one the file for it under
[config/features/index.md](/config/features/index.md) documents): either the
profile that is live was switched, or the profiles, rules and rule items
that define the feature's behaviour were edited.

**It is one lever on purpose, and covers both of those.** admin3
distinguishes them internally, but they are the same business act — someone
changing how a feature behaves — and in practice an edit is usually the
first half of an activation made minutes later, so splitting them would
scatter a single operation across two values.

**A row carries the author's own note about the change and nothing more.**
The field-level detail — which profile became active, which rule was
edited — stays in admin3 and is not mirrored into the operation log. What
these rows answer is *which feature was touched, and when*, which is what
makes them worth cross-referencing against a metric that moved; for what
exactly changed, go to admin3. The note itself is only as informative as
the person chose to make it, and falls back to a generic "Changes Recap"
when they wrote nothing.

This source carries **no market scope**: admin3 doesn't expose which
countries a feature change applied to, so every row's `country` is `ALL`.
That is a limitation of the source, not a statement that the change was
global — a change restricted to two markets looks identical here to one
that wasn't. Whether the scope can be exported is an open question with
tech.

## `unknown`

**`abtest-logs` only** — `feature-logs` classifies with a single constant and
so has nothing left over to fall back on. Same fallback as every other
source's taxonomy: the raw record didn't match
either recap shape this importer currently classifies (see
`agents/import-operation-logs/importers/abtest-logs.js`) — a status change
("Change Abtest Recap" with a "Status changed from X to Y" log line) or a
rules change ("Change Rules Recap" with "Added Rule ..."/"Removed Rule ..."
log lines). If a new shape shows up, it belongs here as a new value, not
folded into an existing one.
