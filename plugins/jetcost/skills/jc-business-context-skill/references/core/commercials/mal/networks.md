---
type: Commercial Concept
description: "MAL's two integration levels: the NETWORK, one of a handful of platforms that supply the demand, and the PARTNER, one of many advertisers that actually pays for the click and owns the domain the user lands on — and which of the two each data field is talking about."
tags: [commercials, media]
timestamp: 2026-09-16T00:00:00Z
---

# MAL Networks and Partners

## Overview

MAL demand reaches a placement through **two levels of integration**:

- **NETWORK** — the platform the demand is integrated through. A network
  aggregates the offers of many advertisers behind a single integration.
  There are few of them, and one of them is internal: Jetcost's own
  direct partner demand enters MAL as a network too, named `MDFLOW` to
  keep it distinct from Jetcost the publisher (see below).
- **PARTNER** — the advertiser that actually buys the click, and the
  owner of the domain the user is redirected to. There are many.

**The network does not exist for the user.** It is entirely masked: the
user sees an offer and lands on the partner's own domain, with nothing
in the experience naming the platform that intermediated the sale.

The two levels are orthogonal to the MAL Core / MAL Media split (see
[core/commercials/mal/overview.md](/core/commercials/mal/overview.md)): every MAL placement, promobox
or exit unit alike, is filled by some network with some partner behind
it. Which bucket the revenue lands in is decided by *where the placement
sits*; who gets paid and who receives the user is decided at these two
levels.

## The networks

Four are live today, as `network` values on
`datamart.jc_clicks_datamart`:

| `network` | What it is | Carries `groupCode`/`partnerCode`? |
|---|---|---|
| `mdflow` | The **internal** network: Jetcost's own direct partner demand, integrated into MAL as a network like any other | Yes |
| `clicktripz` | External ad-tech network | No |
| `kayak` | External; a metasearch acting as a demand network | No |
| `viajala` | External; LATAM-focused | No |

How many buyers each one brings, and how much traffic and revenue,
changes continuously — query it, don't look it up here.

`mdflow` is the internal one. Jetcost has direct commercial contacts
with a number of partners, and that demand is worth exactly what a
network's demand is worth — so it is plugged into MAL **as a network**,
on the same footing as the external three, rather than as a special
case beside them. Its buyers are direct commercial counterparts, which
is why they carry the normal registry identity (see
[config/partners/index.md](/config/partners/index.md)) while the
external networks' buyers do not.

The name is deliberate. Calling this network `MDFLOW` rather than
"Jetcost" keeps it separate from **Jetcost the publisher** — the site
that hosts the placement and sells the space. Both roles are Jetcost,
and collapsing them into one name would make the data unreadable at the
exact point where it matters: `JETCOST` also appears as a *buyer* inside
`mdflow` (under `groupCode` `BRAVOMETA`), bidding on the white labels'
trailing tabs — see
[core/commercials/mal/self-trailingtab.md](/core/commercials/mal/self-trailingtab.md). One
row can therefore have Jetcost as publisher, MDFLOW as network and
JETCOST as partner, and each of the three means something different.

### The same name can be three counterparts at once

`kayak` and `viajala` also appear as `CORE`/`BACKFILL` supply groups.
Same name, unrelated role — Jetcost sourcing offer content there,
Jetcost selling a MAL placement here; see
[core/commercials/integration-types.md](/core/commercials/integration-types.md).

For Kayak the overlap goes one step further: the name occupies **three**
positions simultaneously, and each one is a different field.

| Role | Selected by |
|---|---|
| MAL demand **network** — Kayak supplies advertisers to Jetcost's placements | `network = 'kayak'` |
| MAL **buyer** inside a rival network — Kayak buys Jetcost inventory through `clicktripz` | `networkPartner = 'kayak'` |
| Core content **supplier** — Kayak's offers backfill the Core result list | `groupCode = 'KAYAK'`, `integrationSubType = 'BACKFILL'` |

So Kayak sells Jetcost demand, buys Jetcost inventory through a
competitor, and supplies Jetcost offer content, all at the same time.
The consequence for any query touching the name: **the three do not add
up.** They are three different relationships measured on three different
fields; summing them counts the word "Kayak", not a business
relationship. Size them separately, and expect the ranking by clicks and
the ranking by revenue to disagree — these are different businesses, not
three slices of one.

Sizes are not recorded here, for any of the three. The mix between
networks is not a structural constant, it moves by the month, and a
figure copied into this file would be wrong by the time it is read:
query the period you care about.

## What each level looks like in the data

On `datamart.jc_clicks_datamart`:

- **`network`** — the platform. Populated on MAL clicks **only**; it is
  empty on every Core click, MAL Core and MAL Media alike being the sole
  carriers. Use the click-category macro type to select MAL, not this
  field's presence, but expect the two to agree.
- **`networkPartner`** — the buyer. Populated on **100% of MAL clicks**
  from 2026-01-01, across all four networks and all placements,
  the inline and checkbox units included.
- **`groupCode`/`partnerCode`** — the *commercial* identity, present
  only for `mdflow`. The three external networks leave it empty, because
  no Jetcost commercial relationship exists for those clicks: the deal is
  with the network, not with the advertiser behind it.

So the buyer is always known; the commercial counterpart is known only
for the `mdflow` share. These are two different questions with two
different fields, and asking "which partner bought this placement" with
`partnerCode` silently discards every click that came through an
external network — a large part of MAL, and a part whose size moves.
`networkPartner` answers it in full.

**Coverage floor: 2026-01-01.** Both fields are empty on every MAL click
before that date — the same floor as `integrationType`. That is the
expected historical shape, not a data gap.

### Two traps when grouping by buyer

- **Case is inconsistent between networks.** `mdflow` reports its buyers
  in upper case (`EDREAMS`), the external networks in lower-case slugs
  (`edreams`, `booking-com`), so the same buyer shows up as two rows and
  the raw distinct count overstates the truth — always lower-case before
  grouping.
- **One buyer arrives through several networks.** eDreams comes in
  through `clicktripz`, `kayak` and `mdflow` at once; `booking-com` and
  `priceline` through both `clicktripz` and `kayak`. A partner-level
  read of MAL must aggregate across networks, and the same advertiser
  can be a direct `mdflow` counterpart and an anonymous line inside an
  external network's feed simultaneously.

## The same two levels on impressions

`datamart.jc_impressions_datamart` carries the pair as
`promoboxNetworkId`/`promoboxNetworkName` and
`promoboxPartnerId`/`promoboxPartnerName`, but **only for
`impressionType = 'mal_promobox'`** — MAL Core. The exit unit, inline
and checkbox units have no impression rows carrying these fields, so
impressions cannot answer a MAL Media question at either level.

Two mismatches with the clicks datamart, both of which will silently
break a naive join:

- names are title-cased there (`ClickTripz`, `Mdflow`, `Kayak`,
  `Viajala`) against lower case on clicks;
- `promoboxNetworkId` values are non-contiguous (2, 13, 9, 10), so the
  four live networks are a subset of what the serving layer has
  configured — a network with an id but no traffic is dormant, not
  missing.
