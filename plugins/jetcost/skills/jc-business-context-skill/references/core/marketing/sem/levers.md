---
type: Operational Levers
description: "The SEM levers marketing actively manages day to day, and the `internal_event_type` values that identify them on jc_operation_logs_data (source: gads). Extends the marketing-wide levers in core/marketing/levers.md."
tags: [marketing, operation-logs]
internal_event_types: [budget-adjustment, device-bid-adjustment, tcpa-adjustment, troas-adjustment, cpc-ceiling-adjustment, bid-objective-change, asset-upgrade, bidding-strategy-change, rename, unknown]
timestamp: 2026-10-13T00:00:00Z
---

# SEM Operational Levers

Account/campaign structure and bid strategy types are in
[google-ads.md](/core/marketing/sem/google-ads.md). This file covers what
marketing actively *does* on top of that structure — what each lever changes
and what effect pulling it has.

This file extends [core/marketing/levers.md](/core/marketing/levers.md),
which holds the levers that are the same on every marketing platform —
campaign status (`campaign-status-change`) among them. Those apply to
Google Ads too and are not repeated here: read both files for the full
taxonomy of `gads` rows.

## Levers marketing actively manages

| Lever | `internal_event_type` | Effect |
|---|---|---|
| **Target CPA (tCPA)** | `tcpa-adjustment` | Raise → Google bids more aggressively for conversions: more spend/volume at a higher cost per conversion. Lower → opposite. |
| **Target ROAS (tROAS)** | `troas-adjustment` | Raise → Google bids only where the expected revenue per unit of spend clears the higher ratio: less volume, better return. Lower → opposite. An alternative objective to tCPA, not a complement — a campaign runs on one or the other. |
| **CPC bid ceiling** | `cpc-ceiling-adjustment` | Cap the price Google may pay for a single click. On a strategy that has no target to price against, this is the only constraint on price there is — removing it hands pricing entirely to the auction. |
| **Bidding objective** | `bid-objective-change` | Move a campaign between tCPA and tROAS — a change of *what* the campaign optimises for, not of how hard it pushes. |
| **Device bid adjustment** | `device-bid-adjustment` | Raise/lower the effective tCPA for one device on one campaign — push spend where that device's ROAS is strong, contain it where weak. |
| **Budget** | `budget-adjustment` | Raise/lower how much a campaign is *allowed* to spend. Doesn't change bidding behavior — a campaign can hit its budget cap and stop spending regardless of how well it's bidding. |
| **AI Max asset automation** | `asset-upgrade` | Enable → hands text/final-URL asset creation for the campaign to Google's automation. Disable → reverts to manually-curated assets. |

### `tcpa-adjustment` — Target CPA (tCPA)
No device-level split. Slower to show up in performance than a device
adjustment, but a more stable change for the bid strategy. See
[metrics.md](/core/marketing/sem/metrics.md) for the CPA mktg formula
and for deriving a tCPA target from a ROAS objective.

**Where the target lives depends on the campaign's bid strategy**, and it
changes what one adjustment costs. A campaign carrying its own strategy
holds the target inline, so a change moves that campaign and nothing else.
A campaign attached to a shared portfolio strategy holds it on the
strategy, where a single change moves every campaign attached — see
[google-ads.md](/core/marketing/sem/google-ads.md) for which campaign
types run on portfolios.

Every `tcpa-adjustment` row on this table is the first kind. Changes made
on a portfolio strategy are not recorded — not a backlog item, an upstream
limit, documented in `agents/import-operation-logs/CLAUDE.md` in the
jetagents repo. Read a count of tCPA moves as "campaign-level tCPA moves",
never as the lever's full activity.

**On the learning period.** A tCPA change does not reliably reset
Google's learning period, and the reset is not something to plan
around: whether it happens at all depends on the size of the change,
the campaign's traffic volume and its history, with no deterministic
rule anyone has been able to pin down. Marketing does not treat it as a
binding constraint.

Two consequences, because the opposite advice is the common one:

- **"It will reset the learning period" is not a reason to skip or
  water down a warranted tCPA change.**
- **Don't wait for a calendar boundary** (start of week or month) to
  make one. There is no reset cost to time your way around, so delaying
  only adds days of spend at a price already known to be wrong.

PMax's "CPA cap" is this same lever, not a separate one: despite the
name it's an editable target rather than a ceiling, and a change to it
is reported as `tcpa-adjustment` like any other. Only the field path
differs — Maximise Conversions nests the target under
`maximizeConversions`, a dedicated Target CPA strategy carries it
directly under `targetCpa`.

### `device-bid-adjustment` — Device bid adjustment
Scoped to one campaign + one device. Immediate effect, no learning
period — a mobile change lands the same day, which is what makes this
the daily-optimization lever.

The ROAS that drives it is read on desktop vs mobile + app, with app
always folded into mobile — see
[google-ads.md](/core/marketing/sem/google-ads.md#bid-management-methodology).

- **Mobile** moves in small steps: +5% / -10%. Changes larger than 10%
  are risky.
- **-100% is the only hard floor** under a tCPA strategy — it removes
  the device outright. Smaller cuts are treated by Google as signals,
  not caps, so -30% is not a guarantee of 30% less spend there.
- **Desktop**: avoid acting on it directly. When desktop needs
  correcting, act on tCPA instead — and only where that's warranted
  across the board (e.g. ROAS is positive on every device, not on
  desktop alone).

### `cpc-ceiling-adjustment` — CPC bid ceiling
Scoped to one campaign. Immediate effect.

A hard cap on the price of one click, and the only lever here that is a
cap at all: a target is an objective Google prices against, a device
modifier is a signal, this is a ceiling Google may not cross. Which
strategies carry one, and why the ceiling matters most on Maximise
Clicks, is in [google-ads.md](/core/marketing/sem/google-ads.md).

Setting, raising, lowering and removing a ceiling all report under this
one value; which of the four it was reads off the summary's old → new,
where a campaign with no ceiling shows as unset — same convention as
`campaign-status-change` ([core/marketing/levers.md](/core/marketing/levers.md)).

**Read this lever together with whatever moved alongside it, never on its
own.** Removing a ceiling loosens the price, but the same intervention
can fit brakes elsewhere in the same minutes — a budget cut, a device
modifier cut — leaving the campaign net *more* constrained than before. A
timeline filtered to this lever alone can therefore read the sign of an
intervention backwards. A ceiling removed shortly before a campaign
changes objective is worth reading as the end of the old strategy's life
rather than as a decision about price.

### `bid-objective-change` — Bidding objective
Scoped to one campaign.

A campaign optimises against one objective, never both: tCPA buys
conversions at a cost, tROAS buys revenue at a ratio. Moving between them
changes what "good" means for that campaign, which is why it is not an
adjustment of either lever — the two targets are not comparable, and the
campaign's record under the old objective is not a baseline for the new
one. Both directions happen.

**This is the only lever that reports an inline change of bidding
strategy.** `bidding-strategy-change` does not cover it, despite the name
— see that section below.

### `budget-adjustment` — Budget
Scoped to one campaign. Immediate effect.

On Search this is a passive lever: the rule is never to let a campaign
run budget-limited, since a budget ceiling stops the algorithm from
working at full regime. When one does go budget-limited, **the fix is
not to raise the budget until the "limited" status clears** — that
hands the algorithm whatever volume it asks for at whatever price.
Add roughly +20/30% of what the campaign is asking for, then read
performance: if the extra budget shifts too much share to mobile and
profitability starts to suffer, correct with tCPA rather than with more
budget.

On PMax the lever is active and the logic inverts: a rigid cap, because
display and video volatility can burn budget fast.

### `asset-upgrade` — AI Max asset automation
Scoped to one campaign. Toggles Google's automated asset creation
(text and final-URL expansion) via `aiMaxSetting.enableAiMax`; the
accompanying `assetAutomationSettings` per-type OPTED_IN/OPTED_OUT entries
move in lockstep with that one boolean, so they aren't reported separately.

### `troas-adjustment` — Target ROAS (tROAS)
The same shape of lever as tCPA — an editable target on the campaign's bid
strategy — against a different objective: tCPA buys conversions at a cost,
tROAS buys revenue at a ratio. A campaign runs on one or the other, so a
campaign moving between them is a change of objective, not an adjustment.

Reported as a percentage (`75%`), the form marketing and the Google Ads UI
both use, rather than Google's own fraction (`0.75`) — same convention as
the device bid modifier below.

Adopted on part of the fleet and growing; older campaigns are still on
tCPA, so both levers are active at the same time on different campaigns.

## Technical events (same source, not a business lever)

### `bidding-strategy-change`
Campaign reassigned to a different **portfolio** bidding strategy, and
only that. It does not report a campaign changing strategy in place:
Google names the strategy-assignment fields when a campaign is attached
to a different portfolio, and names only the target fields when the
campaign swaps its own objective, so an inline change never reaches this
value. Read it as "moved onto/off a shared strategy", not as "changed how
it bids" — the latter is `bid-objective-change`, above. A count of
strategy changes that uses this value alone will miss every inline one. No direct performance
effect by itself — a resulting tCPA change, if any, shows up as its own
`tcpa-adjustment` event, but only while the target stays on the campaign:
a move onto a shared portfolio strategy takes it out of view for good (see
`tcpa-adjustment` above). Moving a campaign onto a strategy that carries
the **same tCPA target** as the old one is close to disruption-free;
what disrupts, when anything does, is the new target rather than the
reassignment.

### `rename`
Campaign renamed. No performance effect.

## `unknown`
Not an action — fallback for any row the importer can't classify yet. Also
the default for `gitlab`/`commercial-logs`, which have no lever taxonomy
defined.
