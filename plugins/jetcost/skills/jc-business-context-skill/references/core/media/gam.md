---
type: Media Concept
description: "Google Ad Manager (GAM): the banner inventory of the web site and of the app, paid per impression and sold both in open auction and through direct deals, the latter unstable by nature."
tags: [media]
timestamp: 2026-11-04T00:00:00Z
---

# Google Ad Manager (GAM)

## Overview

GAM is the ad server behind every banner Jetcost shows, on the web site
and in the app: it is the only media integration in the app, and one of
two on web next to [AdSense for Search](/core/media/afs.md). Revenue is
paid **per impression**, priced by the advertising market rather than by
Jetcost's partner deals, so it moves with traffic volume, with how many
slots are switched on and with what the market is paying — not with the
click-out funnel (see
[core/business/revenue-streams.md](/core/business/revenue-streams.md)
for how it sits next to Core and the other Media streams).

## Placements

A placement is a slot on a given page of a given product. The families
are the same on web and in app:

- **Display banners** — fixed slots on the home, results, SEO,
  flights-to-everywhere, editorial and redirect pages (top, side,
  bottom, sticky, mid-center…).
- **In-feed banners** — slots inside the results list, after a set
  number of results.
- **Interstitials** — full-screen formats. On web there are two kinds:
  Jetcost's own overlay and Google's out-of-page interstitial, which
  Google manages. In the app the interstitial is shown while the results
  are loading.

In-feed banners and interstitials sit in the same space the user looks
at to choose an offer, so they are where the trade-off with Core
click-outs is sharpest.

## Open auction and direct deals

GAM inventory is sold two ways:

- **Open auction** — programmatic demand bidding on every impression:
  Google AdX plus the third-party exchanges that bid through Open
  Bidding, all inside GAM. It follows the market: seasonality and
  advertiser budgets move the price, but it is always there. There is
  no header bidding (Prebid) yet: it is planned, with contracts being
  closed as of November 2026, and when it goes live it will add demand
  competing outside GAM's own auction.
- **Direct deals** — campaigns sold by an internal media agency to
  specific advertisers. They are **unstable by nature**: a deal running
  today may not exist tomorrow, and its end is a commercial event, not a
  product or traffic problem. A step change in GAM revenue is therefore
  worth checking against the deals in force before reading it as a
  change in traffic, layout or fill. Which deals ran when is in the data,
  not in this bundle.

## App history

The app used to monetise its banners through AdMob; it has since moved
back to GAM, which is now its only media integration (MAL Media is zero
in the app — see
[core/business/revenue-streams.md](/core/business/revenue-streams.md)).

## Configuration and activation

Which slots are on, where in-feed banners sit, refresh and interstitial
behaviour are feature-flag configs:
[config/features/web-ads.md](/config/features/web-ads.md) for the web
site, [config/features/mobile-app-ads.md](/config/features/mobile-app-ads.md)
for the app. Activation is also driven by rules outside the flags; this
file does not restate any of them. For the current setup read the live
feature state through the Jetcost Services connector's `features_*`
tools; for when it changed, the operation logs (`feature-logs`, plus the
hand-declared Media operations — see
[data/operation-log-classification.md](/data/operation-log-classification.md)).

The metrics that describe GAM inventory and price (ad requests, fill
rate, eCPM, viewability) are in [core/media/metrics.md](/core/media/metrics.md).

How banners are served depends on the user's consent; the requirements
per surface are in [data/consents.md](/data/consents.md).
