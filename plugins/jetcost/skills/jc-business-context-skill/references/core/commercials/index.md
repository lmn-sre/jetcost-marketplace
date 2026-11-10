# Commercials Overview

## Overview

Documents how Jetcost's commercial deals work: pricing models (CPC/CPA),
the lifecycle of a partner relationship, and MAL, the tool the function
uses to manage those relationships and their integrations. This is the
"how do we get paid" layer — for what a partner actually *is*
(group/partner hierarchy), see
[config/partners/](/config/partners/index.md).

## Team & Ownership

The Commercial function spans two teams, both covered by this folder:

- **Account Management** owns the partner relationship end to end:
  sourcing, negotiating deal terms (CPC/CPA/RS, placement conditions),
  and ongoing performance monitoring once a partner is live. See
  [partner-lifecycle.md](/core/commercials/partner-lifecycle.md).
- **Revenue Management** owns pricing execution — setting eCPC once a
  campaign is ready to go live, and the min_cpc floor clauses in CPA
  deals. See [cpa-model.md](/core/commercials/cpa-model.md) and the eCPC deadline in
  [partner-lifecycle.md](/core/commercials/partner-lifecycle.md).

Other functions touch specific stages of the process without owning
the commercial decision: Legal (compliance checks, non-standard IO
review), Procurement (IO signature), and Tech (technical integration).
A change in partner mix, deal rate, or eCPC setup is a Commercial-owned
lever; a change in acquisition volume or channel mix is not (see
[core/marketing/index.md](/core/marketing/index.md)).

## Files

- [core/commercials/cpc-model.md](/core/commercials/cpc-model.md) — flat per-click pricing, how it
  differs from CPA.
- [core/commercials/cpa-model.md](/core/commercials/cpa-model.md) — commission-based pricing,
  tracking, attribution, min_cpc floor.
- [core/commercials/cpa-fallback.md](/core/commercials/cpa-fallback.md) — why CPA
  offers are withheld from the results page and admitted only on
  near-empty searches: on the markets where this is live their eCPC is
  an order of magnitude below a CPC click's. Plus the two reading
  caveats that follow.
- [core/commercials/magic-method.md](/core/commercials/magic-method.md) — the
  partner technique of returning a lower price valid only with an
  outdated payment method, to win the top position, and its higher
  decay along the funnel.
- [core/commercials/fprs.md](/core/commercials/fprs.md) — FPRS, the
  subscription that sells partners their ranking in users' searches,
  clicked or not: a revenue stream of its own, paid apart from the core
  CPC/CPA deals.
- [core/commercials/partner-lifecycle.md](/core/commercials/partner-lifecycle.md) — stages from sourcing to
  active integration and ongoing monitoring, plus the process facts
  that explain partner-data anomalies (eCPC fallback, manual CPA
  reporting).
- [core/commercials/integration-types.md](/core/commercials/integration-types.md) — the
  `integrationType`/`integrationSubType` taxonomy: which placements
  are direct integrations with a real partner identity, and which
  are sourced through another metasearch or ad network instead.
- [core/commercials/levers.md](/core/commercials/levers.md) — the activation
  levers Commercial pulls on a live integration (activation, targeting,
  traffic cut), and the `internal_event_type` values that identify them on
  operation logs.
- [core/commercials/mal/](/core/commercials/mal/index.md) — MAL, the
  commercial tool that manages partner relationships and their
  integrations (core, MAL Core, MAL Media) plus the integrations with
  the external demand networks. Its revenue splits across two
  accounting buckets depending on where the placement sits.
- [core/commercials/partner-splitting.md](/core/commercials/partner-splitting.md) — why a single
  counterparty sometimes shows up as multiple "artificial"
  `partnerCode`s (e.g. `_APP`, `_US`/`_NONUS`), each independently
  priced and activated mutually exclusively per scenario.
