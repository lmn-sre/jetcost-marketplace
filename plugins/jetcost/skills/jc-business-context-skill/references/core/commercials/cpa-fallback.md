---
type: Commercial Concept
description: "Why CPA partner offers are withheld from flight results and admitted only when the result set would otherwise be near-empty, and how that shows up in the data."
tags: [commercials]
timestamp: 2026-09-14T00:00:00Z
---

# CPA Fallback

## Overview

On the markets where it is active, Jetcost does not let CPA partner
offers compete with CPC ones on equal terms. CPA offers are withheld
from the flight results page and admitted only when the search would
otherwise return almost nothing — a handful of itineraries or fewer.

It is a monetisation decision, not a product one: the offers are
perfectly valid and would be shown to the user in any other
metasearch. What decides whether they appear is who pays for the
click and when. The lever that turns this on and sets the threshold is
[config/features/cpa-fallback.md](/config/features/cpa-fallback.md).

## Why

A CPC click is paid at the moment the user leaves for the partner; a
CPA click pays only if that user goes on to book, which most do not
(see [core/business/deal-types.md](/core/business/deal-types.md) and
[core/commercials/cpa-model.md](/core/commercials/cpa-model.md)). The
two are therefore not interchangeable inventory, even when they look
identical on the page.

On a well-populated results page, a CPA offer is competing for a click
that a CPC partner would otherwise have been paid for. In expectation
that trade is a loss — it converts certain revenue into probable
revenue — which is why the default is to keep CPA offers out.

On a near-empty page the arithmetic flips. There is no CPC click to
protect: the realistic alternative to a CPA offer is not a cheaper
click, it is no click and a user who leaves. A low-probability
conversion is worth more than an empty result set, so the CPA offers
are admitted.

This is the whole idea, and both halves matter. The feature is not
"show CPA partners less"; it is **CPA supply used to cover poor result
sets, never to compete with CPC supply**.

## On these markets, CPA supply barely produces

The asymmetry above is generic. What makes the trade one-sided here is
the size of the gap: the markets where the fallback is live are CPC
markets — the bulk of Core clicks goes to CPC partners — and the CPA
partners present on them produce a small fraction of what a CPC click
produces, an order of magnitude below it rather than a close call.

That is not the case everywhere. On the markets where CPA *is* the
supply, CPA partners produce an eCPC in the same range as CPC ones,
and there is nothing to arbitrate — which is exactly why the fallback
is enabled where it is and not as a general policy towards CPA.

So on these markets a CPA offer is not competitive inventory, it is
filler, and the threshold is set low to match: those offers come out
when there is genuinely nothing else to show.

## Marketing signals

Clicks generated this way can be kept out of the marketing tracking
chain, which is a second decision on top of the first and is
configured separately.

The reason is the same asymmetry read from the acquisition side: a
fallback click exists because the search was poor, not because the
user was qualified, and it is worth a fraction of a normal one. Feeding
it to the bidding platforms as if it were an ordinary conversion event
teaches them to pay for traffic that lands on poor searches. Suppressing
the signal keeps the learning set honest at the cost of under-reporting
a small share of clicks.

## Reading it in the data

The feature is directly observable, so there is no need to infer it
from where the flag is enabled:

- **Clicks** carry `isFallback`, set when the click landed on an offer
  the fallback admitted. **Web only**: it is not tracked on app, so it
  reads NULL on every app click.
- **Searches** carry `displayedItinerariesFallback`, how many of their
  displayed itineraries came from the fallback. Populated on web and
  app alike.

The fallback itself is not web-only: it runs on app searches too, and
`displayedItinerariesFallback` shows it there. What is missing on app is
only the click-level flag, so app fallback clicks cannot be separated
from regular CPA clicks — an app CPA read always includes them, and a
filter on `isFallback` being false drops every app click rather than
keeping the non-fallback ones.

Two caveats when reading the markets where this is live:

- **The CPC/CPA mix moves with it.** Part of the CPA share in those
  markets is fallback volume that only exists because the searches
  behind it were poor. It is not evidence of CPA partners winning
  demand.
- **Fallback clicks are worth materially less per click.** Keep them
  out of any per-click average meant to describe normal traffic, and
  expect them to depress one that includes them.
