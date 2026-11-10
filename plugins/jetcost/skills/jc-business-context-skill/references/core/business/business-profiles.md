---
type: Business Concept
description: "The three business models Jetcost runs side by side — jetcost, veriflights and meta-spinner — what each one is for, and why every default analysis is scoped to the first."
tags: [business]
timestamp: 2026-09-15T00:00:00Z
---

# Business Profiles

## Overview

Jetcost runs **three different business models** on one data platform.
`businessProfile` is the field that separates them, and it is the widest
partition in the data — wider than brand, domain or platform. It answers
"which business is this session part of?", not "which site was it on".

| Profile | What it is | Live since |
|---|---|---|
| `jetcost` | Flight (and car) comparison — the original portal | before the data starts |
| `veriflights` | Airline-only comparison, under validation | 2026-02-24 |
| `meta-spinner` | A MAL-Media-only portal, no real search | 2026-06-24 |

Analysis defaults to `jetcost` alone. That default encodes a business
fact rather than a convenience: `jetcost` is roughly 99% of the business,
and the other two are recent experiments still at validation scale.

See [data/dimensions.md](/data/dimensions.md) for the field itself and
its relationship to `websiteType` and `website`.

## jetcost

The comparison site the company was built on: flights first, cars
secondary. The subject of everything else in this bundle unless a file
says otherwise.

It is the **only profile with more than one property layer**:

- **the core site** — `www.jetcost.com`, declined into one domain per
  market;
- **the white labels** — full-feature clones of the site under a
  different skin, used as a testing ground for changes too risky to make
  on the core brand. See
  [core/business/whitelabels.md](/core/business/whitelabels.md);
- **the mobile app** — see [core/product/web-vs-app.md](/core/product/web-vs-app.md).

`veriflights` and `meta-spinner` have **neither an app nor white
labels**: each is a single site. So any app-vs-web or white-label cut is
implicitly a cut inside this profile.

## veriflights

A new business idea under validation: still flight comparison, but
showing **airlines only, no OTAs**. The pitch is honesty about price —
clearer fare conditions, displayed prices that survive to checkout, and
none of the practices that make an OTA's advertised fare diverge from
what the user actually pays.

It is at validation scale, so read its funnel as validation telemetry
rather than performance: the question it answers is whether the idea
works, not how well it is doing.

It runs on a **single site in a single market**: `veriflights.com`,
Italy, in Italian. So an Italian comparison against `jetcost` is the
only like-for-like reading available — there is no second market to
average with, and any country breakdown of this profile has exactly one
row.

## meta-spinner

A portal built for one purpose: monetising the OTAs Jetcost deliberately
keeps off its own brand. Some partners are genuine revenue opportunities
while being "dirt" for the Jetcost user experience — meta-spinner
captures that value without exposing the core brand to it.

It is **not a comparison site and runs no real searches**: the site
essentially opens other partners in new tabs, and its only monetisation
is MAL Media (see [core/commercials/mal/overview.md](/core/commercials/mal/overview.md)). Its search
count is not low, it is **exactly zero**, and its Core click count is
zero too — by construction, verified in data.

So every funnel metric that assumes a search step — STR, CTR, CR, Payoff
— is **undefined here**, not broken and not a data gap. Its `websiteType`
is `multi-destinations`, not `meta-spinner`; the profile name and the
site's own type value do not match.

Like `veriflights` it is one site in one market: `multi-destinations.com`,
the United States, in English. Note that the two experiments therefore sit
in different markets, so a comparison between them is also a comparison of
two countries.

## Why the default scope is not cosmetic

The three models are structurally different — one has a monetised funnel,
one has a funnel it doesn't yet monetise, one has no funnel at all — so
mixing them doesn't produce a bigger number, it produces a meaningless
one. Any rate computed across profiles is a weighted average of
incompatible denominators.

The volumes make this harmless in practice today, but that is a property
of the experiments' current size, not of the data model. If either
profile grows, an unscoped query starts silently diluting the metric it
claims to measure.
