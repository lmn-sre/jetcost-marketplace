# Partners Overview

## Overview

Documents the commercial deal metadata for individual partners: deal
type, rate card, active markets. Currently only the template exists —
per-partner files should be added as deals are formally documented.

Also missing today: full per-group documentation (one file per
group) — the taxonomy *mechanism* is now covered below, but not
every group's perimeter is written up individually.

## groupCode / partnerCode taxonomy

`groupCode` and `partnerCode` identify **direct integrations** — the
partners Jetcost has an actual commercial relationship with (see
[core/commercials/integration-types.md](/core/commercials/integration-types.md) for which
click types this identity does and doesn't apply to: it covers MAL
Media only partially and only from 2026-01-01, and `CORE`/`BACKFILL`
clicks carry the identity of the *sourcing metasearch*, not a
negotiated partner).

One `groupCode` can bundle many `partnerCode` brands. This is not a
rare exception — it's the normal shape of the taxonomy:

- **Multi-brand OTA resellers**: one commercial relationship covers
  dozens of consumer-facing brands. `ETRAVELI` alone covers 42
  `partnerCode`s (e.g. `GOTOGATE`, `MYTRIP`, `SEAT24`); `ODIGEO`
  covers 8 (`EDREAMS`, `OPODO`, `GOVOYAGES`, `TRAVELLINK`); `LMNNEXT`
  covers 14, including `RUMBO`.
- **Airlines under one technical umbrella**: `METACONNECT` bundles
  ~32 airline `partnerCode`s (e.g. `FINNAIR`, `ETIHAD_AIRWAYS`,
  `ITA_AIRWAYS`) integrated through a shared provider, still each a
  direct relationship at the commercial level.
- **Channel/scenario variants**: within a group, the same brand
  commonly appears with `_APP`, `_VI`, `_VI_APP`, or geography suffixes
  (`_US`, `_NONUS`) on its `partnerCode`. **These are not just a
  tracking tag for the same deal** — they can be independently priced
  "artificial" partners, registered specifically because the system has
  no native way to apply different economics on that dimension (web vs.
  app, local vs. non-local traffic, ...) for a single partner record.
  See [core/commercials/partner-splitting.md](/core/commercials/partner-splitting.md) for why this
  exists and how to read it (don't assume the variants share a rate;
  check before merging them back together in an analysis).

The list above is illustrative, not exhaustive — there are 20+
groups of this shape. Treat the live registry (anagrafica) as the
source of truth for the current, complete mapping; this document
records the *pattern*, not a snapshot to keep in sync by hand.

## Known groupCode exceptions

- **`LMNNEXT`** = ICO ("inter-company"): this partner is part of the
  same group as Jetcost, not an external, arm's-length partner. It's paid
  on the **AMC3** model — Jetcost receives the partner's own margin on
  the booking, which can be negative — see
  [core/commercials/cpa-model.md](/core/commercials/cpa-model.md#amc3--margin-share-inter-company).
  This is *why* its revenue swings more than any other partner's,
  including apparent per-period losses: when it shows up as the dominant
  driver in a revenue/eCPC move (e.g. in a Share-of-Voice breakdown),
  that volatility is expected, not necessarily a red flag on its own.

## Known CPA-lag partners

CPA booking data is partner-reported and requested manually by Account
Management, not pulled automatically — see
[partner-lifecycle.md](/core/commercials/partner-lifecycle.md#implications-for-data-interpretation)
for why this creates lag and gaps in attribution reconciliation. The
partners currently known to suffer this lag:

- **`LMNNEXT`**, **`DOHOP`**, **`KIWI`**, **`KAYAK`**

When one of these shows up as a driver in a deep dive, weight that
finding with the expectation that its booking data may be incomplete or
delayed relative to other partners, rather than reading it as a fully
settled number.

Mechanically, the lag shows up as follows: while a partner's booking
report is outstanding, `revenueCurrent` for its clicks is filled with
`revenueEcpc` (the click-time estimate) as a placeholder — see
[data/revenue-fields.md](/data/revenue-fields.md). A recent `revenueCurrent` figure for
one of these partners may therefore still be an estimate rather than
a settled actual.

## Files

- [config/partners/deal-template.md](/config/partners/deal-template.md) — template structure for
  documenting a partner's active deal. Not yet populated with real
  partner data.
