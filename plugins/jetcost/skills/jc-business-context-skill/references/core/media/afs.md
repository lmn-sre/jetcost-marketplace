---
type: Media Concept
description: "AdSense for Search (AFS): query-matched Google text ads on the web site only, paid per click, switched on and off per surface and per traffic type as a strategic trade-off against cannibalising Core click-outs."
tags: [media]
timestamp: 2026-11-04T00:00:00Z
---

# AdSense for Search (AFS)

## Overview

AFS shows Google **text ads matched to a search query** — the searched
cities on a results page, the destination on an SEO page. It runs on the
**web site only**: the app has no AFS. It is one of the two web media
integrations, next to the banners of [GAM](/core/media/gam.md).

Revenue is paid **per click** on an ad, not per impression. What moves
it is therefore how many blocks are shown, to which traffic, and how
often users click them — not ad viewability or fill, as for GAM (see
[core/business/revenue-streams.md](/core/business/revenue-streams.md)
for how it sits next to Core and the other Media streams).

## Surfaces

Flight and car results pages, flight SEO pages
([core/product/seo-pages.md](/core/product/seo-pages.md)),
flights-to-everywhere pages and the editorial pages that include an AFS
block. On the flight SEO pages the AFS block and a GAM banner share one
spot: when no AFS block is shown, the banner takes its place.

## Cannibalisation, and why the gates exist

An AFS ad is a click that leaves Jetcost for an advertiser instead of a
partner: on a results page in particular it competes directly with the
Core click-outs it sits next to. The configs that withhold AFS from part
of the traffic — paid-traffic landings, non-Google paid traffic, local
visitors on SEO pages — exist to tune that trade-off.

They are **strategic choices, not business rules**: each setting is the
current bet on where AFS adds revenue without taking more from Core, and
it is expected to change. Never read a gate as a constraint that must
hold, nor its current value as the right one.

## Configuration and activation

Every switch, gate and layout setting is in
[config/features/afs.md](/config/features/afs.md). For the current setup
read the live feature state through the Jetcost Services connector's
`features_*` tools; for when it changed, the operation logs
(`feature-logs`, plus the hand-declared Media operations — see
[data/operation-log-classification.md](/data/operation-log-classification.md)).

The metrics that describe AFS (queries, coverage, CTR, CPC, RPM) are
in [core/media/metrics.md](/core/media/metrics.md).

Which consents the request needs is in
[data/consents.md](/data/consents.md).
