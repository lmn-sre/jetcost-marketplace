---
type: Commercial Model
description: "Operational detail of CPA deal sub-types: commission structures, min_cpc floor clauses, and attribution."
tags: [commercials]
timestamp: 2026-10-14T00:00:00Z
---

# CPA Model

## Overview

Covers the operational details of CPA deals:
commission structures, tracking and attribution,
min_cpc floor clauses, and reconciliation with
partner booking data. For where CPA offers are
allowed to appear at all — they are withheld from
well-populated results pages on some markets — see
[core/commercials/cpa-fallback.md](/core/commercials/cpa-fallback.md).
See [core/business/deal-types.md](/core/business/deal-types.md) for
the conceptual explanation of CPC vs CPA, and
[data/revenue-fields.md](/data/revenue-fields.md) for what `revenueCurrent`,
`revenueEcpc`, and `revenueOperational` each actually measure.

## CPA Sub-types

Jetcost operates several CPA deal variants. All share the same
fundamental structure — revenue is generated at booking time, not
at click time — but the commission calculation differs.

### CPA — Fixed Fee per Booking

The partner pays a fixed monetary amount for each confirmed booking,
regardless of ticket price or booking value.

```
Revenue = bookings × fixed_fee
```

Simple to forecast and reconcile. Preferred when ticket value
variance is low or the partner wants cost predictability.

### CPA% — Percentage of Ticket Value

The partner pays a percentage of the ticket (booking) value.
Revenue scales with the booking amount: higher-value tickets
generate proportionally more revenue.

```
Revenue = bookings × avg_ticket_value × rate%
```

More upside on expensive routes; more volatile than flat CPA.
Requires reliable booking value data from the partner.

### RS — Revenue Share

The partner pays a fixed share of their own revenues (not just
ticket value). RS agreements are typically negotiated at a
higher level and may cover multiple product verticals.

```
Revenue = partner_revenues × share%
```

Less common and harder to monitor in real time because it
depends on partner-reported revenue figures.

### CPA_MIN_CPC — Fixed Fee with CPC Floor

Identical to CPA (fixed fee per booking), but includes a
contractual **min_cpc** clause: a floor at billing level that
stabilises value toward marketing and toward invoicing, forces the
partner to concentrate on optimisation, and lets Jetcost handle
underperformance without reopening the contract. Protects Jetcost
when partner CR collapses.

### CPA%_MIN_CPC — Percentage Fee with CPC Floor

Same as CPA% (percentage of ticket value), with a min_cpc floor.
Combines the upside of percentage-based commissions with the same
downside protection mechanism as CPA_MIN_CPC.

### Reading revenue on a min_cpc deal — produced vs. floor

**This subsection applies only to partners on `CPA_MIN_CPC` or
`CPA%_MIN_CPC`** (`cpcSource = 'ecpc_min'`). It does not apply to
plain CPA, CPA%, or RS deals, which have no floor clause — for
those, `revenueCurrent` is the only figure and there is no
comparison to make.

The commercial reading always uses `revenueCurrent` as the
reference — it is where Jetcost measures its actual ability to
deliver the service to the partner. The floor is not what is
observed; it is an **override** applied on top of that reality, and
the two answer different questions:

```
Produced (CPA reality) = SUM(revenueCurrent)
Floor (guaranteed)      = SUM(clicks × minCpc)
Delta                   = Floor − Produced
```

- **Δ > 0 — floor binding.** The partner is not converting enough;
  Jetcost invoices more than it generated. The delta is
  simultaneously the invoicing uplift and the measure of the
  underperformance.
- **Δ < 0 — floor not binding.** The partner converts above the
  guarantee. The floor is inactive and the CPA reading
  (`revenueCurrent`) is the true one.

**The clause is computed per partner group × country.** That is the
grain the floor is contractually measured at — a few deals add device,
for group × country × device — so it is also the grain the comparison
above has to be made at. Aggregating wider, per partner across
countries or over the whole deal, nets a country where the floor binds
against one where it doesn't and can make a real delta disappear: the
invoicing uplift is the sum of the positive deltas per cell, not the
delta of the totals. (Group here is the partner group of the
group/partner hierarchy, see [config/partners/](/config/partners/index.md).)

**Do not assume, verify.** `cpcSource = 'ecpc_min'` marks
membership of a min_cpc rule, not the fact that the floor actually
bit. A partner whose produced eCPC sits above its own floor carries
the same marker — the comparison has to be computed, not inferred
from the flag.

Note: today, `revenueEcpc` happens to equal `SUM(clicks × minCpc)`
exactly for `cpcSource = 'ecpc_min'` rows, because the cpc
calculator currently sets its estimate to `minCpc` for these deals
(see [data/revenue-fields.md](/data/revenue-fields.md)). That's a current implementation
detail of the calculator, not a defined property of the field —
compute the floor directly from `minCpc` rather than reading
`revenueEcpc` as if it were guaranteed to represent it.

### AMC3 — Margin Share (Inter-Company)

Jetcost is paid the partner's own margin on the booking, not a fixed fee
or a percentage of ticket value. Unlike every other sub-type above, this
margin **can be negative** — a real per-period loss on paper, not a
data error, when the partner's own margin on those bookings was negative.
This is why a partner on this model shows materially larger swings than
CPC/other-CPA partners: its revenue isn't floored at zero the way a fixed
fee or a percentage of a (always-positive) ticket value is.

```
Revenue = partner's own margin on the booking (can be negative)
```

The deal is still favorable in aggregate — over the full relationship its
total value exceeds a standard CPA or CPA% contract — but expect
meaningfully higher period-to-period volatility than any other sub-type,
including apparent losses in a given window. `LMNNEXT` is paid on this
model — see [config/partners/index.md](/config/partners/index.md).

For commercial reading, use `revenueCurrent`, which carries the true
(possibly negative) margin. By default `revenueOperational` equals
`revenueCurrent` — no floor is applied, so a negative-margin period
carries through as negative there too — **except for `LMNNEXT` flight
clicks that generated a booking**, which since 2026-06-01 redistribute
revenue across clicks by the shape of the theoretical commission
instead (never negative by construction; a discontinuity applies in
any table spanning that date). See
[data/revenue-fields.md](/data/revenue-fields.md#revenueoperational--for-marketingoperational-use-not-commercial-reading)
for the full mechanics.

## Summary Table

| Sub-type | Commission basis | CPC floor | Revenue volatility |
|---|---|---|---|
| CPA | Fixed fee per booking | No | Low |
| CPA% | % of ticket value | No | Medium |
| RS | % of partner revenues | No | Medium–High |
| CPA_MIN_CPC | Fixed fee per booking | Yes | Low (floored) |
| CPA%_MIN_CPC | % of ticket value | Yes | Medium (floored) |
| AMC3 | Partner's own margin on the booking | No | High — can go negative |

## Attribution

How a booking is attributed to Jetcost determines whether and how
much revenue is credited. See [data/attribution.md](/data/attribution.md) for the three
attribution models in use and which one is the business standard.
