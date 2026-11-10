---
type: Metric Glossary
description: "Media's own metrics: gross vs net media revenue, the GAM inventory metrics (ad requests, impressions, fill rate, eCPM, viewability) and the AFS ones (queries, coverage, ad clicks, CTR, CPC, RPM), and how they combine into revenue."
tags: [media]
timestamp: 2026-11-04T00:00:00Z
---

# Media Metrics

Metrics of the media product itself: how much inventory the site and
the app offer, how much of it is sold and at what price. They build on
the shared funnel in [data/metrics.md](/data/metrics.md) — read that
first — and are split by provider, because [GAM](/core/media/gam.md) is
paid per impression and [AFS](/core/media/afs.md) per click, so
different quantities drive each one's revenue.

## Gross and net media revenue

- **Gross media revenue** — what the advertising market pays for
  Jetcost's inventory.
- **Net media revenue** — gross minus the fee kept by the internal
  media agency that runs the direct deals ([core/media/gam.md](/core/media/gam.md)).
  The fee applied to GAM revenue only. It has been **zero since March
  2026**, so from then on net equals gross; before, net was lower.

Net is the figure that counts towards Jetcost's total revenue (the
Display Media leg in [data/revenue-fields.md](/data/revenue-fields.md)).
Across March 2026 net media revenue shows a step up that is the fee
going away, not better performance: compare gross, or keep both sides
of a comparison on the same side of that date. Field anchors:
`revenueCurrentProRataGam` / `revenueCurrentProRataNetGam`,
`revenueCurrentProRataMedia` / `revenueCurrentProRataNetMedia`.

## GAM

- **Ad request** — a slot asking GAM for an ad. One page view can make
  several (one per slot), and intelligent refresh makes more on the
  same page view ([config/features/web-ads.md](/config/features/web-ads.md)),
  so requests grow with slots switched on and with time on page, not
  only with traffic.
- **Impression** — an ad actually served into a slot.
- **Fill rate** = `impressions / ad requests` — the share of requests
  that found a buyer. It drops when demand drops: a direct deal ending,
  a quiet season, or a new slot nobody bids on yet.
- **CPM / eCPM** = `revenue * 1000 / impressions` — price per thousand
  impressions. A direct deal has a negotiated CPM; in open auction
  (AdX and Open Bidding) eCPM is the average clearing price, and it
  follows the market.
- **Viewability** = `viewable impressions / measurable impressions` —
  the share of served ads actually seen (by the industry standard, at
  least half of the ad on screen for at least one second). Buyers pay
  more for viewable inventory, so a layout that pushes slots out of view
  lowers eCPM even at equal impressions.

GAM revenue = `ad requests × fill rate × eCPM / 1000`. Reading a change
through these three factors tells inventory (requests), demand (fill)
and price (eCPM) apart. Refresh is the usual trade-off between them:
more requests and impressions per page view, at a lower average eCPM.

## AFS

- **Query** — an AFS block requesting ads for a search query (see
  [config/features/afs.md](/config/features/afs.md) for which query
  each surface sends).
- **Coverage** = `queries that returned ads / queries` — the AFS
  equivalent of fill rate. It depends on the query: a destination
  advertisers do not bid on returns nothing.
- **Ad click** — a click on an AFS text ad: the event AFS pays for.
- **CTR** = `ad clicks / ads shown` (or per query) — how often users
  click an AFS ad. A high AFS CTR on a results page is also the measure
  of how much it may be taking from Core click-outs (see the
  cannibalisation section of [core/media/afs.md](/core/media/afs.md)).
- **CPC** = `revenue / ad clicks` — what an ad click pays.
- **RPM** = `revenue * 1000 / queries` — revenue per thousand queries,
  the figure that makes AFS comparable across surfaces.

AFS revenue = `queries × coverage × CTR × CPC` (with CTR per query
returning ads).

## Bridge to the funnel

Media revenue reaches the shared funnel as a per-session allocation,
so the whole-business ratios of [data/metrics.md](/data/metrics.md)
(RPMS included) already contain it. Media revenue per thousand sessions
is the figure that compares media yield with Core's on the same
traffic; the metrics above explain *why* it moved.
