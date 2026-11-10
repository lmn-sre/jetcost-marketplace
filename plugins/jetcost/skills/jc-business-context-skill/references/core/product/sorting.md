---
type: Product Feature
description: "Describes how flight offer sorting works and why it's one of the highest-leverage product decisions."
tags: [product]
timestamp: 2026-10-29T00:00:00Z
---

# Sorting

## Overview

Sorting determines the order in which flight offers
are presented to users after a search. It is one of
the highest-leverage product decisions in a
metasearch engine: the top positions receive
disproportionately more clicks, which directly
affects partner visibility, CTR, and revenue.

## Why Sorting Is Critical

In a typical search result page, the top three
offers capture the majority of clicks. Small changes
in sorting logic can significantly shift traffic
distribution across partners, with direct revenue
implications.

Sorting sits at the intersection of three competing
interests:

- **User experience**: users expect the most
  relevant, competitive offers at the top.
- **Revenue**: Jetcost benefits from surfacing
  offers that generate higher value per click
  (higher CPC rate or higher CPA commission).
- **Partner relations**: partners expect fair
  visibility proportional to their deal terms.

## Known Sorting Dimensions

Whether the search backend computes the SIS score,
and the weights of price, duration and stops in it,
are the levers of
[config/features/sis.md](/config/features/sis.md).

The search backend orders flight results in one of
three ways, in this order of precedence:

- **Sorting 2.0** (`sorting_v2`), for the searches
  of the `SORTING-V2` A/B test: a machine-learning
  model scores each itinerary, and the SIS weights
  do not count.
- **Tiered sorting** (`tiered_sorting`), on the web
  and in app versions from 4.40.0: five labelled
  itineraries go on top (`recommended`, `cheapest`,
  `cheapest_direct`, `fastest`,
  `may_be_of_interest`), and the others follow by
  SIS score, with no tie-break on partner gain. The
  score, the `recommended` pick included, uses the
  SIS weights, except in an A/B arm of
  `NEW-SORTING`, which uses fixed weights set in
  code.
- **Pure SIS ordering**, in app versions below
  4.40.0: itineraries by SIS score, lowest first;
  equal scores go to the higher partner gain, then
  by itinerary id.

*Still to be documented. Key open questions:*

- *Does sorting logic differ between CPC and
  CPA partners?*
- *How are MAL Core placements integrated into
  the organic sort order?*
- *Are there market-specific sorting rules?*

## Relationship to Other Features

Sorting interacts directly with:

- **Detail page**: by reducing blind clicks,
  detail page changes the effective value of
  each position in the sort order.
- **MAL Core**: sponsored placements occupy
  fixed positions and are excluded from the
  organic sort logic.
- **CTR**: any change in sort order will affect
  CTR by partner, which is a key metric for
  evaluating sorting experiments.
- **Traffic control**: a small share of traffic
  is kept on a plain random sorting
  (`SORTING-EXPLORATION`) to collect unbiased
  data for training the sorting model. See
  [core/product/traffic-control.md](/core/product/traffic-control.md).

## Notes

*This document is intentionally incomplete.
Sorting logic should be documented in detail
once the relevant stakeholders have been
consulted. Priority topics: CPC vs CPA
handling, and AB test methodology for sorting
experiments.*
