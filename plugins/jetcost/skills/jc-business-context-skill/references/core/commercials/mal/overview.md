---
type: Commercial Tool
description: "MAL (Meta Advertising Layer): the commercial tool that manages partner relationships and integrations — core, MAL Core, MAL Media and the demand networks — and, as a by-product of where its placements sit, produces revenue in two different buckets."
tags: [commercials, media]
timestamp: 2026-10-29T00:00:00Z
---

# MAL — Meta Advertising Layer

## Overview

MAL is a **commercial** tool, not an advertising product bolted onto
the site. It is where the relationship with a partner is managed and
where its integrations are configured: the standard core integration,
the sponsored MAL Core placements, the MAL Media slots, and the
integrations with the demand [networks](/core/commercials/mal/networks.md)
that supply advertisers Jetcost has no direct contact with. That is why
this folder sits under `core/commercials/` and not under
[core/media/](/core/media/index.md), which covers display advertising —
banners — only.

The revenue it produces lands in two different buckets, and this is a
consequence of *where a placement sits*, not of two separate products
(see [revenue-streams.md](/core/business/revenue-streams.md) for the
accounting classification).

## Auction, not a list

The single structural difference between MAL and Core is how a partner
gets in front of the user.

**Core is a list.** Every partner with an offer for that itinerary is
shown, ranked; presence is not competed for, and a partner's bid moves
its position, not its right to appear.

**MAL is an auction.** The placements are few — a promobox, a trailing
tab, an inline unit — and only the best bids take them. The inline unit
and the checkboxes show several bids at once, up to their
`MAX-PARTNERS`. The exit units open a single tab or window on MAL's
page: the form exit unit hands it up to `MAX-PARTNERS` bids (the
trailing tab at most one), the results-page one all of them, and which
advertiser the user lands on is decided on MAL's side. Everyone else is
simply absent from that impression: there is no second page of MAL, no
lower rank to fall back to.

That is why MAL demand is aggregated through
[networks](/core/commercials/mal/networks.md) in the first place. A
handful of slots against a large pool of advertisers only pays if the
pool is deep enough to keep the clearing price up, and a network
supplies depth Jetcost's own direct contacts cannot.

It is also why MAL volumes move far more abruptly than Core ones: a
single advertiser raising its bids can take a placement away from
everyone else across a whole market overnight, with no gradual
re-ranking in between. Read any MAL breakdown as the outcome of an
auction on that day, never as a stable share.

## MAL Core

Sponsored placements that compete directly within the search results
funnel, alongside organic results — they challenge the real organic
offers for the user's attention. Because the competition happens inside
the funnel, MAL Core is classified as **Core** revenue even though the
placement itself is paid for separately from the partner's standard
CPC/CPA deal.

## MAL Media

Dedicated advertising slots outside the search funnel (e.g. checkbox,
inline units, exit units). Because these placements sit outside the
funnel, MAL Media is classified as **Media** revenue.

MAL Media is sold both ways, in a mix that moves over time (query it,
see [core/commercials/mal/networks.md](/core/commercials/mal/networks.md)).
Part of its clicks come from the internal network `MDFLOW` — demand
Jetcost sells directly to partners it has a commercial relationship
with, e.g. eDreams and Opodo. The rest arrives through three external networks —
`clicktripz`, `kayak` and `viajala`, the only ones live — which
function much like a Core backfill provider, supplying the demand
rather than Jetcost having its own contract with the advertiser behind
a given click. Jetcost itself is one of the
direct buyers, bidding on its own white labels
(see [core/commercials/mal/self-trailingtab.md](/core/commercials/mal/self-trailingtab.md)).

That split is what decides which identity a MAL Media click carries in
the data — see [core/commercials/mal/networks.md](/core/commercials/mal/networks.md)
and [core/commercials/integration-types.md](/core/commercials/integration-types.md).

**MAL Media is currently zero on app** — initiatives that exclusively
touch MAL Media have no effect on the app perimeter.

## Networks and partners

Independently of the Core/Media split, every MAL placement is filled
through two levels of integration: a **network** (few — one of them
internal, `MDFLOW`) and, behind it, the **partner** that actually buys
the click and owns the domain the user lands on (many). The network is
completely masked from the user. See
[core/commercials/mal/networks.md](/core/commercials/mal/networks.md) — it is
also where the data fields for each level, and their 2026-01-01
coverage floor, are documented.

## Configuration

Feature-level configuration (enabling MAL per product/surface, per-slot
toggles, thresholds) lives in `config/features/mal.md` and the related
`config/features/mal-*.md` files — one per product surface (flights,
cars, hotels) and interaction pattern (checkboxes, exit-unit form,
exit-unit page, inline not-found).
