---
type: Commercial Concept
description: "Self trailing tab: on a Jetcost white label the MAL trailing tab can sell its click to Jetcost itself, which bids alongside the external networks — one placement that is Media revenue for the white label and paid acquisition cost for Jetcost, designed to net to zero."
tags: [commercials, media, marketing]
timestamp: 2026-10-29T00:00:00Z
---

# Self Trailing Tab

## Overview

The MAL trailing tab is a MAL Media placement (see
[core/commercials/mal/overview.md](/core/commercials/mal/overview.md)): when a user leaves a page, the
unit auctions that exit among the networks and partners configured on it,
and the winner receives a search opened in a background tab — a
"backtab". On a Jetcost **white label**, Jetcost itself is one of those
bidders. When it wins, the white label sells the click exactly as it
would to an external network, and the user lands on the Jetcost site.

That makes one placement two things at once: **Media revenue for the
white label** and **paid acquisition cost for Jetcost** — an internal
transfer between two sides of the same company, designed to net to zero
at group level.

The serving and auction layer is **mdflow**, the internal MAL platform.

## Why it exists on the white labels

The white labels are Jetcost's testing ground — full-feature clones of
the site where something can meet real traffic without risking the core
brand (see [core/business/whitelabels.md](/core/business/whitelabels.md)).
Buying its own exit traffic is one of those experiments, which is why it
runs there and not on the core site.

## How Jetcost bids

With a **flat CPC per market**, decided arbitrarily and entered in the
same CPC backoffice as external partners — not a bid derived from the
expected value of the traffic. The rate is configured market by market,
and some markets receive traffic with no rate configured at all, so
"Jetcost's trailing-tab bid" is a lever with per-market state rather than a
single number.

Two things follow, both counter-intuitive:

- **The bid is sub-cent.** A backtab click is worth a fraction of a cent,
  which is coherent with what the traffic does (see below). It also means
  the whole integration moves amounts that are small per click and only
  become visible in aggregate, so read it aggregated — see
  [data/revenue-fields.md](/data/revenue-fields.md) for which MAL revenue
  representation to use.
- **Jetcost is not the highest bidder and still wins a large share** of
  the white labels' trailing-tab clicks — external counterparts on the same
  placement bid multiples of Jetcost's rate. Fill order and per-partner
  market coverage decide who wins, not price alone. Don't read a high
  Jetcost share as evidence of an aggressive bid, and don't model this
  auction as "highest CPC wins".

## What each side records

**White-label side** — an ordinary MAL Media click: `clickCategory` 4002
(MAL Exit Unit), `integrationType`/`integrationSubType`
`TRAILINGTAB`/`STANDARD`, `businessModel` `cpc`, and a real partner
identity — `groupCode` `BRAVOMETA`, `partnerCode` `JETCOST`. Partner
identity on MAL Media clicks only exists from **2026-01-01** (see
[core/commercials/integration-types.md](/core/commercials/integration-types.md)),
so Jetcost's own share of these placements cannot be reconstructed from
click data before that date, even though the integration itself is
older.

**Jetcost side** — a paid acquisition session: `sessionCampaignSource`
`mal`, `sessionCampaignChannelGroup` `checkbox`, `sessionCampaignMedium`
`cpc`, and a campaign named on the pattern
`{market}-{language}_mal_f_c_jc_trailingtab_{device}`.

Note the channel group says `checkbox` while the campaign says
`trailingtab`: `checkbox` is the generic "acquired from a MAL-style
placement" bucket, not a placement name. It also holds the traffic
Jetcost buys from **other sites' units** — smaller integrations that let
a third party open Jetcost from their own pages, Booking Buddy among
them, each arriving under its own `sessionCampaignSource`. That
third-party share was about a quarter of the bucket in 2023 and 2024 and
about an eighth in 2025; in 2026 it is negligible, so the distinction
matters most on historical windows.

**Only `sessionCampaignSource = 'mal'` separates Jetcost's own inflow
from that third-party traffic.** Filtering on the channel group alone
silently mixes Jetcost's internal transfer with genuine third-party
inbound traffic — two things with opposite economics, since one is a
virtual cost inside the group and the other is real spend outside it.

**But `mal` is the trailing tab only from mid-2025.** The `trailingtab`
campaigns start on 2025-07-16 and are virtually the whole source in
2026. Before them the source carries two other campaign families:
`exitunit-form`, a little over half, and `checkboxes`, the rest. The
checkboxes are a different unit, not this mechanism. On today's sites
the exit-unit form is not a different unit for the user: it is the same
tab-under, and `TRAILING-TAB-ENABLED` in
[config/features/mal-flights-exitunit-form.md](/config/features/mal-flights-exitunit-form.md)
only switches which MAL placement sells it, `exitunit-form` or
`trailing-tab`. That the earlier `exitunit-form` campaigns sold this
same placement is likely, but not established for that period. So on a
window before 2026, read the
campaign name as well as the source, and say which families the answer
includes.

The cost comes from a report Jetcost downloads from mdflow and lands in
the non-SEM slice of marketing cost, allocated pro-rata like any other
marketing cost (see
[data/pro-rata-allocation.md](/data/pro-rata-allocation.md)). It is a
**virtual** cost — an internal transfer — but nothing distinguishes it
from real spend in any cost field or in any ROAS.

## Reading the traffic: it is backtab traffic

The session opens in a background tab the user often never looks at, and
the funnel shows it. Against other paid traffic on the same properties,
this slice has a **markedly lower STR** — a large share of sessions never
reach a search at all — a core CTR more than an order of magnitude lower,
and an ARPU lower by a similar factor.

Two consequences:

- The slice is **classified as paid**, and it is large enough relative to
  paid volume to measurably dilute blended paid ARPU, CTR and STR. A
  paid-quality move of a few percent can be this mix shifting rather than
  campaign performance changing — check the `mal` source before
  concluding otherwise.
- Standalone, the operation is **loss-making for Jetcost's own P&L**: the
  core revenue this traffic generates is below the transfer cost. That is
  expected, not an anomaly — the counterpart is the white label's Media
  revenue, so the operation only makes sense read at group level.

## The zero-sum balance

The balance is real: the cost Jetcost books and the revenue the white
label books have been verified to match, to a fraction of a percent, over
multi-month windows and market by market.

But it holds **because the two rates are aligned, not because anything
enforces it**. The white label's revenue rate lives in the CPC backoffice
and Jetcost's cost comes from the mdflow report — two independent
configurations. A market can therefore be found receiving traffic with a
cost but no configured bid, and a rate change on one side is not
mechanically mirrored on the other.

So treat the zero balance as a maintained property, not an identity: when
using either side of this transfer in a margin or group-level P&L read,
reconcile the two explicitly rather than assuming they cancel out.
