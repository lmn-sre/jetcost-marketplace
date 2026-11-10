# Core Overview

## Overview

`core/` holds Jetcost's durable business knowledge — the material that
changes with the business itself, not with a sprint. It's organized by
**functional ownership**: each subfolder holds the knowledge owned by the
team that makes the decisions it documents.

## How to Decide Where a File Goes

A file belongs in the function that *owns* the decision it documents —
not every function it merely affects. [core/product/sorting.md](/core/product/sorting.md)
lives in product even though it drives commercial revenue, because
product owns the sorting decision.

Cross-cutting concepts used *identically* by every function (metrics,
attribution, seasonality...) don't live here — they live in
[data/](/data/index.md), one level up from `core/`. Litmus test: if you'd
duplicate a file's content unchanged into two functions, it's shared
and belongs in [data/](/data/index.md); if you'd adapt it per function, it belongs here.

A named feature or initiative with multiple related documents (like
[core/product/w2a/](/core/product/w2a/index.md)) is a subfolder inside the function that
implements it — not a sibling of the functions listed below.

## Functions

- [core/business/](/core/business/index.md) — company-level orientation: revenue model,
  funnel, markets, deal types.
- [core/commercials/](/core/commercials/index.md) — deal economics, partner
  lifecycle, and MAL (partner relationships and integrations, including the
  demand networks).
- [core/marketing/](/core/marketing/index.md) — acquisition channels (SEM, organic, CRM,
  other channels).
- [core/product/](/core/product/index.md) — the product surface (search, sorting, detail
  page, w2a).
- [core/media/](/core/media/index.md) — display advertising (banners) and data
  revenue, independent of the click funnel. MAL is not here: see
  [core/commercials/mal/](/core/commercials/mal/index.md).
- [core/tech/](/core/tech/index.md) — engineering operations with business impact:
  code releases, infrastructure/security configuration.
- [core/martech/](/core/martech/index.md) — the tracking and tagging layer:
  what gets measured and sent to third parties, deployed by publishing Tag
  Manager containers. Separate from tech on purpose: a code release ships
  the application, a container publish ships the measurement of it.
