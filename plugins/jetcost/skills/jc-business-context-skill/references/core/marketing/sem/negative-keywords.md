---
type: Operational Levers
description: "How SEM exclusions are structured into global and country/brand lists, and the rule for filing a partner covered by a no-bidding agreement."
tags: [marketing]
timestamp: 2026-09-03T00:00:00Z
---

# SEM Negative Keywords

Exclusions are structured in two layers:

- **global shared lists** (`ALL_...`), applied to every campaign;
- **country- and brand-specific lists**, applied only where they belong.

The lists are fed from two directions: routine review of the search
query report, which is also how newly matched queries from AI Max are
policed (see
[google-ads.md](/core/marketing/sem/google-ads.md)), and commercial
constraints, below.

## Filing a partner under a no-bidding agreement

A **no-bidding agreement** is a commercial commitment not to bid on a
partner's brand keywords — a term of the deal with that partner, owned
on the commercial side (see
[core/commercials/index.md](/core/commercials/index.md)), not a
marketing choice. SEM's job is to enforce it in the right scope.

The decision rule when a new one arrives:

- restriction valid in **all** markets → add the partner's brand
  keyword to the global `ALL_Partners/No Bidding Agreement` list;
- restriction valid in a **specific** market → use that country's list,
  creating it if it doesn't exist yet.

**Getting the scope wrong is expensive in both directions, and the two
errors are not symmetric.** Filing a country-scoped restriction into
the global list cuts that partner's traffic in every market at once —
straight revenue loss, plus the commercial friction of having
throttled a partner nobody asked to throttle. Filing a global
restriction into a single country's list leaves Jetcost bidding where
an agreement says it won't, which is a breach of deal terms rather than
a performance problem. Check the scope against the agreement before
adding the keyword, not after the traffic moves.
