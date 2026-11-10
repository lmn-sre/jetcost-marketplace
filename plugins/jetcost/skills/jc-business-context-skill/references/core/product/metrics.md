---
type: Metric Glossary
description: "Product's own app-side metrics: First Opens, the app revenue components, ARPU per install cohort, and return sessions as a retention proxy."
tags: [product]
timestamp: 2026-10-13T00:00:00Z
---

# Product Metrics

App-side metrics that exist because the app is acquired and monetised
as a cohort, not as a stream of sessions. They build on the shared
funnel in [data/metrics.md](/data/metrics.md) — read that first — and
are almost always sliced by where the install came from: a W2A tool
(see [core/product/w2a/index.md](/core/product/w2a/index.md)), a paid
app-install campaign, or direct.

## First Opens

The number of first app sessions — installs — in the period. This is
the cohort-defining event: an install cohort is the set of users whose
First Open falls in the same period.

Also the conversion action app-install campaigns optimise against, via
the install signals in
[core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md),
which carry no economic value.

## App revenue components

An install cohort's revenue is read as the sum of three streams already
defined in
[core/business/revenue-streams.md](/core/business/revenue-streams.md):
Core clickout revenue, MAL Core revenue, and Media revenue. **Rev
Total** is their sum, and it's the numerator ARPU uses — not Core
alone, because the point of the metric is what an app user is worth in
total, across every way the app earns.

## ARPU — Average Revenue Per User

```
ARPU = Rev Total / First Opens
```

Revenue per acquired app user, for a given install cohort. Two
properties worth being explicit about, because both make a naive read
misleading:

- **It's a cohort metric, not a period metric.** The numerator is
  all-time revenue from users acquired in the period, not revenue
  earned in the period. A young cohort has had less time to earn, so
  comparing this month's ARPU against last year's without controlling
  for cohort age compares maturity, not quality.
- **The denominator counts installs, not active users.** A cohort with
  poor retention shows a low ARPU for the same reason as a cohort with
  poor monetisation.

## ARPU by cohort age

The way around the maturity problem: revenue per cohort is tracked at
fixed ages — D15, D30, D60, D90, M6, Y1, M18 (15/30/60/90/180/365/548
days from first session) — with each window only including cohorts old
enough to have completed it. That's what makes an early and a late
cohort comparable at all. See
[data/analysis-types.md](/data/analysis-types.md) for the convention.

## Return sessions

Sessions from users of a cohort coming back within the window, tracked
alongside installs and revenue as a **retention proxy**. It's what
separates the two explanations for a weak ARPU above: low return
sessions point at retention, healthy return sessions with low revenue
point at monetisation.
