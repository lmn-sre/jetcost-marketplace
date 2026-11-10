---
type: Data Taxonomy
description: "The integrationType/integrationSubType taxonomy: which placements are direct integrations with a negotiated partner, which are sourced through another metasearch or an ad-tech network, and where partner identity is only partially present."
tags: [commercials]
timestamp: 2026-10-29T00:00:00Z
---

# Integration Types

## Overview

Not every click Jetcost monetises comes from a partner it negotiates
with directly. This file documents the `integrationType` /
`integrationSubType` taxonomy — verified against
`datamart.jc_clicks_datamart` — and, critically, which values
correspond to a **direct integration** (a partner Jetcost talks to
and has a commercial relationship with) versus content **sourced
through another network**, where no such relationship exists for
that specific click.

This distinction determines whether the [commercial registry
taxonomy](/config/partners/index.md) (`groupCode`/`partnerCode` as a
partner identity) is meaningful for a given click at all.

## Core

Standard organic integration — the primary revenue stream (see
[revenue-streams.md](/core/business/revenue-streams.md)).

- **`STANDARD`** — direct integration. `groupCode`/`partnerCode`
  identify the actual negotiated partner.
- **`BACKFILL`** — **not a direct integration**, even though it is
  classified under `CORE`. These are clicks whose offer content is
  sourced from another metasearch engine acting as a supply channel
  for routes or markets where Jetcost's own direct coverage is thin.
  Verified groups on this sub-type: `KAYAK`, `VIAJALA`, and `SKYSCANNER`
  up to 2024-01.
  Note: `KAYAK` also appears as a negotiated CPA partner with its own
  lag caveat (see [config/partners/index.md](/config/partners/index.md#known-cpa-lag-partners)) — that is a
  separate relationship (Jetcost sending clicks to Kayak) from its
  `BACKFILL` role here (Jetcost sourcing content from Kayak). Same
  `groupCode`, two different roles — don't conflate them.
  Backfill clicks carry `businessModel` exactly like every other Core
  click: empty before 2024-06-12, when the field starts, and populated
  after it. An empty value on an old backfill click is that floor, not
  a trait of the sub-type. What does set backfill apart is the partner
  identity: its `groupCode` names the sourcing metasearch, so keep it
  apart in partner-level cuts unless the question is specifically about
  backfill coverage itself.
- **`SPONSORED-DETAIL`** — direct integration, a minor variant.

## MAL Core

**`PROMOBOX`** (sub-types: `SPONSORED`, `INLINE-STATIC-PRICE`,
`COMPARE-RIGHT-SHOULDER`, `CLICK-TO-CALL`, `RIGHT-COLUMN`) —
sponsored placements that compete within the search results funnel
(see [core/commercials/mal/overview.md](/core/commercials/mal/overview.md)). These **are** direct
integrations: `groupCode`/`partnerCode` are populated with the same
partner identity as that partner's Core clicks — a partner can be
both a Core and a MAL Core counterpart at once.

## MAL Media

Dedicated advertising slots outside the search funnel (see
[core/commercials/mal/overview.md](/core/commercials/mal/overview.md)).
Three live integration types, all `Mal Media` by macro type:

- **`TRAILINGTAB` / `STANDARD`** — the **exit unit**, and the type every
  exit-unit click carries in practice. `TRAILINGTAB` is the name this
  placement carries in the MAL serving layer ("trailing tab"); on the
  search form it is sold as `trailing-tab` or `exitunit-form` depending
  on [config/features/mal-flights-exitunit-form.md](/config/features/mal-flights-exitunit-form.md),
  and on the results page through
  [config/features/mal-flights-exitunit-page.md](/config/features/mal-flights-exitunit-page.md).
  A click here is `clickCategory` 4002, MAL Exit Unit.
- **`INLINE` / `STANDARD`** — the inline unit (`clickCategory` 3006).
- **`CHECKBOX` / `STANDARD`** — the checkbox unit (`clickCategory` 2003),
  used on the `meta-spinner` business profile (see
  [core/business/business-profiles.md](/core/business/business-profiles.md)),
  which is MAL-Media-only. On the Jetcost-brand properties the placement
  exists on the web search forms of the Jetcost and white-label sites,
  not in the app, and whether it shows is the lever of
  [config/features/mal-flights-checkboxes.md](/config/features/mal-flights-checkboxes.md)
  and
  [config/features/mal-cars-checkboxes.md](/config/features/mal-cars-checkboxes.md).

The MAL webhook can also write `EXITUNIT` / `FORM` and `EXITUNIT` /
`PAGE` for the exit unit, but they barely occur in the data (see the
semantic layer). They are not separate placements: count them with
`TRAILINGTAB` if they ever show up, and don't take them as the
canonical exit-unit type.

On every MAL placement, promoboxes included, a click bought through
`mdflow` carries the type and sub-type MDFLOW sends with it rather than
the ones above.

### Commercial identity is partial, and only from 2026-01-01

`integrationType`/`integrationSubType` are **not populated at all** on
MAL Media clicks before 2026-01-01. An empty value on an older click is
the expected historical shape, not a data gap. The same floor applies to
`network`/`networkPartner`.

From that date on, two different identities exist on a MAL click and
they must not be confused — see
[core/commercials/mal/networks.md](/core/commercials/mal/networks.md) for the full
picture:

- **The buyer** — `networkPartner`, the advertiser that pays for the
  click and owns the domain the user lands on. It is populated on
  **every** MAL click from 2026-01-01, on all four networks and all
  placements, inline and checkbox included. There is no such thing as an
  anonymous MAL click at this level.
- **The commercial counterpart** — `groupCode`/`partnerCode`, a partner
  in Jetcost's own registry. Present only where the demand comes through
  the internal `mdflow` network. For the external networks
  (`clicktripz`, `kayak`, `viajala`) it is empty, and correctly so: the
  commercial relationship is with the network, not with the advertiser
  behind it. Jetcost bidding on its own white labels' trailing tabs
  under `groupCode` `BRAVOMETA` runs through `mdflow` and so does carry
  the identity, see
  [core/commercials/mal/self-trailingtab.md](/core/commercials/mal/self-trailingtab.md).

So the rule is: on MAL, the buyer is always known and the *commercial*
counterpart is known only for the internal network's share. An empty
`partnerCode` on a MAL click after 2026-01-01 means "bought through an
external network", never "no identifiable buyer" — read `networkPartner`
before concluding anything. Before 2026-01-01 both are absent.

**The rule is the same on every MAL placement.** Registry identity is
present exactly when `network = 'mdflow'`, whether the click is a
promobox, an exit unit, an inline or a checkbox — nothing about the
placement itself grants or withholds it. Which networks fill a given
unit, and in what proportion, is a serving mix that moves: query it,
it is not recorded here.

## Which clicks carry a real partner identity

| integrationType | Direct integration? | Partner identity source |
|---|---|---|
| `CORE` / `STANDARD`, `SPONSORED-DETAIL` | Yes | `groupCode` / `partnerCode` |
| `CORE` / `BACKFILL` | No — sourced from another metasearch | `groupCode` identifies the *sourcing metasearch*, not a Jetcost partner |
| `PROMOBOX` (MAL Core) | Only the `mdflow` share | `groupCode` / `partnerCode` on `mdflow`, same identity as Core; `networkPartner` names the buyer on all of them, from 2026-01-01 |
| `TRAILINGTAB`, `EXITUNIT`, `INLINE`, `CHECKBOX` (MAL Media) | Only the `mdflow` share | `groupCode` / `partnerCode` on `mdflow`, empty for the external networks; `networkPartner` names the buyer on all of them, from 2026-01-01 |
