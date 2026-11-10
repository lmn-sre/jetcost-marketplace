---
type: Operational Levers
description: "Tech operations tracked in operation logs, and the `internal_event_type` values that identify them on jc_operation_logs_data."
tags: [tech, operation-logs]
internal_event_types: [release, app-release, waf-rule-change]
timestamp: 2026-11-05T00:00:00Z
---

# Tech Operations

## `release` — Code release

Source: `gitlab`, `event_type: TAG`. A tag pushed to a repository in the
GitLab group — every tag is a release, so this is a fixed classification,
not a judgment call. No performance effect by itself; relevant as a
timestamp to cross-reference against anomalies elsewhere (a release can
explain an unexpected change in tracking, funnel behavior, or any other
metric that shifted right after one landed).

This value covers **code** releases only. Publishing a Google Tag Manager
container is a release of the tracking layer, owned by a different function
and carrying its own value, `tag-release` — see
[core/martech/levers.md](/core/martech/levers.md). A root-cause
investigation into something that started measuring differently usually
wants that one, not this. Nor does it cover the mobile apps reaching
users: that is `app-release`, below.

## `app-release` — Mobile app release

Source: `manual-app`, `event_type: MANUAL_ENTRY`. A new version of the
Android or iOS app published on its store, declared by hand with its
version and the features it brings — `entity` is `app:android` or
`app:ios`. Kept apart from `release` because the two happen at different
moments: app code is tagged first, and the version reaches users only when
the store publishes it, days later and at a time no system of ours records.
For anything users can see, the store publication is the date that
matters.

Fixed classification, like `release`: every row is the same business act.
No performance effect by itself; a timestamp to line up against an app
metric that moved after it — app sessions, conversion on app, the share of
traffic per platform (see [core/product/web-vs-app.md](/core/product/web-vs-app.md)).
One version usually ships on both platforms the same day, as two rows with
partly different features. An app version is one build for every market,
so these rows carry no country.

**The release date is not the date a version appears in the data.** Two
things make the two diverge, both normal:

- **Adoption is incremental.** Users update on their own schedule and many
  never do, so a new version's traffic ramps up over days and weeks while
  older versions keep running alongside it. An effect builds up gradually
  rather than landing on the release date, and is diluted by the share of
  users still on an older version.
- **A version has traffic before its release.** The tech team tests every
  build on real devices before publishing it, so sessions carrying a
  version can show up days before that version's `app-release` row. They
  are internal test traffic, not an early rollout.

So a mismatch between the app versions seen in the data and these release
dates — a version with sessions before its release, an old version still
active long after a newer one shipped — is expected and is **not** a data
inconsistency. Don't report it as one. Use the release date to tell when a
version became available to users, and the version's traffic share to tell
how much of the app it actually reaches.

## `waf-rule-change` — Cloudflare WAF rule change

Source: `cloudflare-waf`, `event_type` the Cloudflare audit-log action
(`RULESETS_UPDATE`, `RULESETS_CREATE`, `RULESETS_DELETE`). A write to a
zone's WAF rules: custom rules, rate limiting rules or managed rules.
Redirect, transform, cache and configuration rules run on the same
Cloudflare engine but are not WAF decisions, and are not tracked. Every
write is the same business act — the firewall's behaviour on a site was
changed — so this is a fixed classification; whether a rule was created,
updated, deleted or reordered is in the row's summary, not in a separate
value.

Like `release`, no performance effect by itself, and the most common
explanation for an unintended one. A rule that challenges or blocks too
broadly drops real traffic before it reaches the site: sessions and
searches fall, and tracking calls answered with a challenge are lost rather
than delayed. A rule that lets traffic through can do the opposite — a
rise that is recovered measurement, or newly admitted bot traffic, not
business growth. Read a row as a timestamp to line up against a funnel or
traffic metric that moved the same day, on the zone it names.

One row is one zone. Most rules are managed as a template applied to every
Jetcost domain at once, so a single change usually arrives as one row per
zone, within minutes; the summary layer collapses them into one row naming
the change and the number of zones. A zone is a domain, not a market, so
these rows carry no country.

## Not yet tracked

Other infrastructure changes with real business impact — DNS records,
cache purges, Cloudflare rules outside the WAF — have no operation-logs
source yet. When one is added, its `internal_event_type` values get
documented here rather than invented ahead of time.
