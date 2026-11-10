---
type: Operational Levers
description: "Commercial operations tracked in operation logs, and the `internal_event_type` values that identify them on jc_operation_logs_data (source: commercial-logs)."
tags: [commercials, operation-logs]
internal_event_types: [activation-change, targeting-change, traffic-cut, deal-change, unknown]
timestamp: 2026-10-22T00:00:00Z
---

# Commercial Operational Levers

What a partner *is* and how a deal is priced live in
[core/commercials/index.md](/core/commercials/index.md) and the model
files next to it. This file covers what Commercial actively *does* to a
live integration day to day: the activation rules that decide whether a
partner is shown, to whom, and at what share of traffic, and the deal
terms it is paid on.

Every value here comes from a single source, `commercial-logs`, which
reads two admin3 endpoints:

- **Activation logs** — `event_type` is a binary split on whether the
  affected rule is a CORE one
  ([core/commercials/integration-types.md](/core/commercials/integration-types.md))
  — a property of the *entity*, not of the intervention. The lever, i.e.
  what the person actually set out to change, is the `reason` they select
  in admin3 when saving the change, and that is what
  `internal_event_type` carries.
- **Commission-rule logs** — `event_type` `CHANGED_DEAL`. The endpoint
  only ever records one kind of intervention, a change to the deal's
  terms, so `internal_event_type` is always `deal-change` and needs no
  classification.

## Levers Commercial manages

| Lever | `internal_event_type` | What changed |
|---|---|---|
| **Activation** | `activation-change` | A partner turned on or off for a market/device — the on/off state of the integration itself. |
| **Targeting** | `targeting-change` | Where and to whom an active partner is shown: markets, devices, routes, websites, or conditions on the search itself (e.g. time of search, passengers). |
| **Traffic cut** | `traffic-cut` | The share of traffic the partner receives reduced, while it stays active. |
| **Deal** | `deal-change` | The terms Jetcost is paid on: business model, value, min CPC floor, CPA% thresholds. |

On the activation endpoint a fourth `reason` exists in admin3, `other`, for a change the author says
fits none of the three. It is not a lever and gets no value of its own —
see `unknown` below.

### `activation-change` — Activation

Activating a partner puts it back in front of users in that market;
deactivating removes it. The blunt end of the commercial toolkit, and
the reasons in practice sit on both sides of the relationship: a
prepayment balance running out or being topped up on the partner's
side, or a quality problem on Jetcost's (unreliable prices, a broken
redirect) that makes showing the partner worse than not showing it.

**The direction is not in the lever.** `activation-change` covers both
the activation and the deactivation, the same way marketing's
`campaign-status-change` covers both pause and enable
([core/marketing/levers.md](/core/marketing/levers.md)) — read
the row's own description, which spells out the old → new value of each
`Active Mobile` / `Active Desktop` flag, and its free-text summary,
which is where the human reason for the change actually is.

**Effect to expect when cross-referencing.** A deactivation removes
that partner's offers from results in the affected market, so its own
clicks and revenue there go to zero and the traffic redistributes
across whoever remains — which moves revenue per click and the partner
mix for the whole market, not just for the partner named in the row.
An activation does the reverse. This is the first thing to check when
a market's revenue mix shifts on a day with no marketing or product
change behind it.

### `targeting-change` — Targeting

Any change to the visibility of a partner that stays active: which
searches it is shown on, not whether it is on. That covers every
dimension a rule can be scoped by:

- **markets and devices** the rule applies to (whitelisted or
  blacklisted countries);
- **routes**, added to or removed from the rule's route whitelist or
  blacklist — in practice the most common targeting change, e.g.
  limiting a carrier's routes around a conflict zone;
- **websites** the partner is shown on, through the website whitelist
  or blacklist;
- **conditions on the search itself**, such as the time of the search
  or the passengers searched for, that exclude part of the searches
  the partner would otherwise appear on.

The admin3 fields these show up as (`WL/BL Routes`, `WL/BL Websites`,
`Whitelist Countries`, `Blacklist Countries`, `Exclusion Rules`) are
listed only so a reader can find them in a row's description; the list
is open, and a new scoping dimension in admin3 is still this lever.

Distinct from `activation-change` in the same way product's
`update-abtest-rules` is distinct from enabling a test
([core/product/levers.md](/core/product/levers.md)): the partner keeps
running, what changes is who sees it. Direction (narrower vs. wider) is
not in the value — read the row.

**Targeting vs. traffic cut is the intent, not the field.** Both levers
touch the same admin3 settings, and one save often records several of
them at once, so the fields in a row don't tell the two apart. A
targeting change decides *which* searches the partner appears on; a
traffic cut decides *how much* of the traffic it would otherwise get it
keeps. The `reason` picked by the author is what carries the
distinction.

**Effect to expect when cross-referencing.** The partner's clicks and
revenue move only on the slice that was added or removed — a set of
routes, a market, a website — so a targeting change can be invisible in
a market-level total and obvious at route level. Look at the slice the
row names before concluding it had no effect.

### `traffic-cut` — Traffic cut

A deliberate reduction in the share of traffic sent to a partner that
stays active. Used where deactivating would be too blunt: the partner
is still worth showing, just not at the current volume — typically
against a quality or margin problem that is a matter of degree rather
than a reason to remove the integration. It shares its admin3 settings
with targeting; how the two differ is under `targeting-change` above.

### `deal-change` — Deal

A new commission rule for a partner in a market/device/context: the
business model (CPC, CPA, CPA%, or one of the CPA models with a min CPC
floor — see [core/commercials/cpc-model.md](/core/commercials/cpc-model.md)
and [core/commercials/cpa-model.md](/core/commercials/cpa-model.md)),
the value, the floor and, on CPA%, the percentage thresholds. Unlike the
three activation levers it doesn't change *whether* or *to whom* the
partner is shown, only what each click or sale earns.

**The row is the new deal, not the change.** admin3 does not send the
rule being replaced, so a row says what the deal *is* from its date on.
Read it as "the deal was touched", which is the signal, not as a known
direction of change.

**The date is when the deal takes effect.** A row's date is the rule's
start of validity, not the day someone entered it in admin3. Rules are
often entered ahead of time, typically for the first of a month, so a
day with a burst of `deal-change` rows is the day new rates went live.
That is the day to compare revenue against, which the entry date wouldn't
be. A rule can also carry an expiry date, after which it stops applying
with no row of its own.

**Effect to expect when cross-referencing.** A deal change moves the
partner's revenue per click in that market straight away and doesn't
touch its clicks. On a CPC deal the revenue impact is immediate and
certain. On the CPA models it shows up only as bookings convert, and on
a min CPC deal only once produced revenue falls to or below the floor.

## `unknown`

`deal-change` rows are never `unknown`. On the activation endpoint no
lever could be established for the row, in one of four cases:

- **Every row before 2026-09-09.** `reason` did not exist on the
  endpoint until then, and admin3 returns it empty for historical
  records, so those rows can never be reclassified. Treat 2026-09-09 as
  this taxonomy's own coverage floor, distinct from the source's data
  coverage floor — those rows are history, not a backlog.
- **The author picked `other`.** Deliberately not given a value of its
  own. It looks like the commercial equivalent of `manual-entry`, but
  the two rest on very different evidence: `manual-entry` comes from
  someone writing the log entry themselves, who is the authority on what
  the operation was, whereas `other` is the residual option in a
  dropdown. A recurring kind of change arriving as `other` means the
  admin3 enum is missing a named reason for it — real outstanding work,
  just upstream of the importer — which is what `unknown` is for.
- **`reason` was left unset.** Observed on the day the field went live
  and not something the endpoint's shape rules out since, so it is worth
  watching: a persistent share here means the field is optional in
  practice, and the classification depends on people filling it in.
- **A `reason` value the importer doesn't know**, i.e. a new enum member
  added upstream and not yet mapped here.

These four are indistinguishable in the column and separable in the row:
the raw `reason` is preserved in `metadata`, so a query that needs to
tell an `other` from an empty one can read it there. That is why the
taxonomy doesn't spend a value on the distinction — a third way of
saying "no lever", after `unknown` and `manual-entry`, would have to be
learned by every reader of the column and every query over it, in
exchange for something already recoverable from the row.

**Consequence for reading the `unknown` share.** Among post-floor rows it
measures two different backlogs at once — patterns this importer hasn't
mapped, and reasons admin3's enum doesn't offer — so a rise in it is a
prompt to look at `metadata.reason`, not on its own a verdict about
which side the work sits on.

## Reading rows, not interventions

One commercial change to a multi-market partner is logged by admin3 as
one record **per country** on both endpoints, each with the same
timestamp; deal changes also split per device and context, and a group's
rate revision can touch every partner in it at once (hundreds of rows on
one day). A four-market activation is therefore four rows carrying
`activation-change`, not one — counting rows overstates how many
decisions were taken. Group on the entity and the timestamp (or read
the summary batch, which already collapses them) before quantifying
commercial activity.
