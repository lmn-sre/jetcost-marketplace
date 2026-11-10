---
type: Product Concept
description: "What an A/B test is at Jetcost: how its perimeter is defined, how exposed sessions are segmented in the data, and why its active window is not continuous."
tags: [product, data]
timestamp: 2026-10-13T00:00:00Z
---

# A/B Tests

## Overview

Jetcost runs A/B tests on the product surface: a change is exposed
to part of live traffic while the rest keeps the current behaviour,
so the two can be compared on real sessions instead of on opinion.
Sorting is the usual example — see
[core/product/sorting.md](/core/product/sorting.md) — but any product
behaviour can be put behind a test.

This file describes what a test is and how it shows up in the data.
It deliberately says nothing about experiment design or how a result
is judged.

An A/B test is not the only way a session can be held apart from the
rest of the traffic: traffic controls keep a stable control group
away from behaviour that is already live, independently of any test.
See [core/product/traffic-control.md](/core/product/traffic-control.md).

## A Test's Perimeter Is a Set of Rules, Not a Market List

A test targets a set of rules, each one a combination of **website,
country, language and device**. A test is therefore scoped to
specific properties, not to markets: two tests said to run "on IT"
may be running on different sites within the same market, and one
test's perimeter routinely spans several of the white labels the
company operates.

Describing a test by its markets is a useful shorthand and an
approximation. When the exact perimeter matters — above all when
comparing a test against the traffic it did *not* touch — read the
rules, not the summary.

## Exposure Is Recorded on the Session

Assignment happens per session, and the session carries the test it
was exposed to (`abTestId` on the sessions datamart). Sessions can
therefore be segmented into inside and outside a given test, and any
funnel or revenue metric read for either side.

A session that was never in a test carries no test identifier. This
matters more than it looks: when a test is not running, *no* session
carries it, and the test's slice is simply empty for those days.

## The Active Window Is Not Continuous

A test is not a run with a start and an end. It is switched on,
switched off, switched back on, and rescoped while live — each of
those moments being a product lever recorded in the operation logs
(see [core/product/levers.md](/core/product/levers.md)).

Two consequences for anyone reading a test's numbers:

- **A gap is not missing data.** Days with no sessions on a test are
  days the test was off. Nothing was lost and nothing needs
  reloading.
- **The days at each edge are partial.** A test switched on or off
  part-way through a day leaves that day with only a fraction of its
  usual exposure, which is not comparable to a full day on either
  side.

The on/off history is the operation logs' job to answer, and it
should be consulted before a test's series is read as a trend. The
query-side symptoms of both points, and how to tell them apart from
a genuine data problem, are covered in
[data/query-caveats.md](/data/query-caveats.md).
