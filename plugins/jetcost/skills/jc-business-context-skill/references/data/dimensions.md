---
type: Data Convention
description: "The common breakdown dimensions used to slice any metric — Business Profile/Website, Country, Macro Area, Device, Context (web vs app), Platform (operating system) and Traffic Type — with their raw field names and how they combine."
tags: [data]
timestamp: 2026-10-13T00:00:00Z
---

# Common Dimensions

## Overview

Any metric in [data/metrics.md](/data/metrics.md), or in a function's
own `metrics.md`, can be sliced by these dimensions — shared
vocabulary, not owned by a single function, same reasoning as
[data/metrics.md](/data/metrics.md) itself. `agents/daily-report/db.js`'s
`fetchFunnelMetrics` only breaks down by country today (the only slice
that agent actually needs), but Business Profile/Website,
Country/Device/Context/Platform/Traffic Type are the shared vocabulary any
function adding its own breakdown should reuse rather than reinventing.

## Business Profile, Website Type, Website

Three **nested** fields describing which business and which property a
session belongs to, widest first. They are routinely collapsed into "the
site"; they are not the same thing.

```
businessProfile    jetcost | veriflights | meta-spinner
  └── websiteType  jetcost profile  -> jetcost | whitelabel | app
                   veriflights      -> veriflights
                   meta-spinner     -> multi-destinations
        └── website  one value per property
```

- **`businessProfile`** — the business model. Three values, and they are
  three structurally different businesses, so mixing them makes any rate
  meaningless. Default scope for any analysis is `jetcost` alone, which
  is the overwhelming majority of the business; see
  [core/business/business-profiles.md](/core/business/business-profiles.md)
  for what the other two are and why the default is a business statement
  rather than a shortcut.
- **`websiteType`** — the property layer inside the profile. **Only the
  `jetcost` profile has more than one value**, so any core-site vs
  white-label vs app cut is implicitly a cut within that profile. See
  [core/business/whitelabels.md](/core/business/whitelabels.md) for the
  white-label layer.
- **`website`** — the individual property.

Three things that catch people out:

**`website` is not a domain for the core site.** Every per-market domain
of the core site collapses into the single value `jetcost`, and the app
into `jetcost-mobile-app` — one value each, covering every market. Only
white-label rows carry one value per domain. So `website` separates white
labels from each other but **never** separates the core site by market —
use [Country](#country) for that.

**`websiteType = 'app'` and `context = 'app'` are the same set**, exactly:
every other `websiteType` value is web-only. So
`websiteType` is a strict refinement of [Context](#context--web-vs-app)
— it splits web into core site vs white label vs the other profiles'
single sites, and leaves app untouched. Use `context` when the question
is web vs app; use `websiteType` only when the web-side split matters.

**A profile's name is not its `websiteType` value.** `meta-spinner`'s
sites carry `websiteType = 'multi-destinations'`. Don't filter a profile
by a `websiteType` string that looks like its name.

## Country

The market a session/click is attributed to. Raw field: `country`.
See [core/business/markets.md](/core/business/markets.md) for the
market classification (CPC-leaning vs CPA-leaning) built on top of
it, and [data/query-caveats.md](/data/query-caveats.md) for the
UK/GB non-ISO exception.

## Macro Area

The grouping of markets Jetcost reads the business by. Raw field:
`macroArea`, three values: **English speaking**, **Europe**, **Rest of
the World**. Its finer variant `businessView` splits the six main
markets out of the first two (TOP 6 - English speaking, TOP 6 - Europe)
and rolls up exactly into it. Both are a property of the country, so
any market sits in exactly one Macro Area.

Don't confuse it with `region`, a purely geographic grouping by
continent (AFRICA, APAC, EMEA, LATAM, NORAM). The two cut the same
markets differently because they answer different questions: Mexico is
North America geographically but sits with Rest of the World in the
business view, while Ireland is Europe there despite being
English-language. "Macro area" always means `macroArea`. The
per-country mapping lives in the ClickHouse semantic layer skill.

## Device

The device form factor. Raw field: `device` — values `desktop` /
`phone` / `tablet` (verified on `datamart.jc_sessions_datamart_view`,
2025-01-01 to 2026-08-15). **Independent of Context**: an app
session can run on a tablet — `context = app` + `device = tablet` is
a real, observed combination (~44k sessions between 2026-01-01 and
2026-08-15), not a contradiction.

Don't confuse this with `deviceType`, a separate, *derived* field
that folds Context into the device form factor for convenience
rather than tracking it: `context = app` sessions always collapse to
`deviceType = app` regardless of the underlying phone/tablet
hardware, and `context = web` sessions carry `deviceType = desktop`
or `deviceType = mobile`, with `tablet` rolling into `desktop`. So
`deviceType` and `context` *are* perfectly nested — only `app`/`app`,
`web`/`desktop`, `web`/`mobile` occur — and `deviceType` alone can
never distinguish an app session's actual device. Use `device` for
the plain device-form-factor dimension; use `deviceType` only when
the context-collapsed convenience value is actually what's wanted
(e.g. some pro-rata allocations key on it — see
[data/pro-rata-allocation.md](/data/pro-rata-allocation.md)).

For marketing reads by device, `deviceType = app` is not a device of
its own: app sessions are often the continuation of a mobile ad click
(W2A, `/oia/`), so a SEM device ROAS groups `mobile` and `app`
together against `desktop` — see
[core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md#bid-management-methodology).

## Context — Web vs App

Whether the session happened on the website or the mobile app. Raw
field: `context`, values `app` / `web`. Independent of Device (see
above) — but see [Device](#device) for the caveat that `deviceType`,
unlike `device`, is not independent of this field.
See [core/product/web-vs-app.md](/core/product/web-vs-app.md)
for the behavioural, funnel, and revenue differences this drives
(currently a stub — the field-level anchor above doesn't yet have
the business detail filled in).

**This dimension is `context`, not `platform`.** A separate `platform`
field exists — described next — and it does not carry the value `app`.
The two are easy to swap for one another, which is why they sit side by
side here.

## Platform — Operating System

Which operating system the session ran on. Raw field: `platform` —
values `web` / `ios` / `android`.

**It is a strict refinement of [Context](#context--web-vs-app)**, not a
dimension that combines with it: `platform = 'web'` is the same set as
`context = 'web'`, and `platform IN ('ios', 'android')` is the same set
as `context = 'app'`. So Platform adds exactly one thing over Context —
it splits app into the two stores — and crossing the two produces a
diagonal, not a grid. (A handful of app rows do carry
`platform = 'web'`, all of them with zero qualified sessions; the
equivalence holds exactly for any qualified-session analysis, which is
every analysis.)

**Filtering on the wrong one of the two fails silently.** They share the
spelling `web` and disagree on the other value: `context` says `app`,
`platform` never does. `platform = 'app'` matches nothing, raises no
error, and returns an empty result indistinguishable from a legitimate
zero. Filter on `context` when the question is web vs app; reach for
`platform` only when iOS and Android have to be told apart — which is
the only question Context cannot answer.

## Traffic Type — Paid vs Not Paid

Whether the session came from a paid marketing channel. Raw field:
`lastClickNotDirectCampaignPaidVsNotPaid`, business-facing alias
`paidVsNotPaid`. Feeds `paidSessions`/`notPaidSessions` in
[data/metrics.md](/data/metrics.md). Marketing's
[traffic taxonomy](/core/marketing/traffic-taxonomy.md) uses it to split
campaign traffic into paid and not paid.
