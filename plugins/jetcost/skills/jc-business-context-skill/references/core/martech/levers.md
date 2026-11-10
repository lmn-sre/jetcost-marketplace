---
type: Operational Levers
description: "Martech operations tracked in operation logs, and the `internal_event_type` values that identify them on jc_operation_logs_data (source: gtm)."
tags: [martech, operation-logs]
internal_event_types: [tag-release]
timestamp: 2026-10-06T00:00:00Z
---

# Martech Operations

## `tag-release` — Tag Manager container publish

Source: `gtm`, `event_type: RELEASE`. A Google Tag Manager container
version published to production — every version is a release of the
tracking layer, so this is a fixed classification, not a judgment call.

`entity` is the short label of the container that was published:

| `entity` | Container | Scope |
|---|---|---|
| `WEB` | the main Jetcost web container | client-side tags on the site |
| `WGTM` | the second web container | client-side, newer setup |
| `SGTM` | the server-side container | tags fired server-side |
| `VERIFLIGHTS` | the veriflights.com web container | client-side tags on the veriflights site |

Each container serves exactly one business profile (see
[core/business/business-profiles.md](/core/business/business-profiles.md)):
`WEB`, `WGTM` and `SGTM` are jetcost, `VERIFLIGHTS` is veriflights. The
profile is also carried in `metadata` (`container.businessProfile`), so a
query can scope publishes to one profile without knowing the label list.

No market scope: a container is global, so `country` is always empty on
this source. What actually changed is not in the row — the version name,
written by whoever published, is the whole content (e.g. "Add OpenAI
pixel + remove some legacy tags"); the tag-level diff lives in GTM, and
`metadata` carries the direct link to that version.

## Why this is not `release`

Tech's code releases ([core/tech/levers.md](/core/tech/levers.md)) carry
`release`. A container publish is a different act with a different author
and a different blast radius, and an investigation almost always wants one
or the other, not the union — so the two have separate values and a query
for either returns only what it asked for.

## Reading a `tag-release` in an investigation

This is the lever to check first when a *measured* quantity moves without
a matching move in the business: conversions, a partner's attributed
clicks, a bidding signal, a consent-gated event. The publish timestamp is
the useful part — cross-reference it against the moment the metric broke.

Two limits worth knowing, both properties of what GTM's API exposes rather
than of the business:

- The timestamp is when the version was *created*. In GTM's normal flow
  publishing is what creates a version, so the two coincide; a version
  prepared in advance and published later is dated at preparation.
- A version created but never published is indistinguishable from a
  published one once a later version supersedes it. Rows are therefore
  "versions up to the one that reached production", which in practice is
  the same set as the publishes.

## Not yet tracked

Consent-management configuration, server-side container infrastructure and
any tagging done outside GTM have no operation-logs source. When one is
added, its `internal_event_type` values get documented here rather than
invented ahead of time.
