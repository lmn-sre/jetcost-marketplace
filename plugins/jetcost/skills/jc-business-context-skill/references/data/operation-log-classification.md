---
type: Data Convention
description: "How an operation-log row is classified by business meaning: what `internal_event_type` is, where each department's values are documented, and the difference between `unknown` and `manual-entry`."
tags: [data, operation-logs]
internal_event_types: [manual-entry, unknown]
timestamp: 2026-10-15T00:00:00Z
---

# Operation Log Classification

## Overview

Operation logs record what changed in Jetcost's systems, when, and
which team's action changed it. Every logged row carries an
`internal_event_type`: Jetcost's own classification of *what kind of
business action this was* — the lever that was pulled — as opposed to
whatever the originating system happened to call it.

The vocabulary itself is function-owned: each department documents its
own levers in its own `levers.md`, because what a budget change means
is a marketing question and what a release means is a tech one. What
lives here is only the part that is identical for every function: the
two values that describe a row's classification *state* rather than
its business meaning, and the rule for telling them apart. Same
shared-vs-owned split as the metrics and dimensions in
[data/index.md](/data/index.md).

## Spelling

Every `internal_event_type` value is kebab-case: lowercase, hyphen-separated,
no underscores. This is a property of the whole namespace, not of any one
department — the value is Jetcost's own classification, so it has a single
spelling wherever it appears, unlike `event_type`, which reproduces each
source system's own vocabulary and is therefore `UPPER_SNAKE` for some
sources and not for others.

It is written down because it did drift: `gads` used hyphens while
`abtest-logs` and `manual` used underscores, and because each source was
internally consistent nothing surfaced it until someone queried across
sources. Two spellings of one namespace forces every reader — a person, a
query, an agent — to know both.

## Where each department's levers are documented

| Department | Levers |
|---|---|
| Marketing | [core/marketing/levers.md](/core/marketing/levers.md) (every platform), extended by [core/marketing/sem/levers.md](/core/marketing/sem/levers.md) (SEM only) |
| Tech | [core/tech/levers.md](/core/tech/levers.md) |
| Martech | [core/martech/levers.md](/core/martech/levers.md) |
| Product | [core/product/levers.md](/core/product/levers.md) |
| Commercials | [core/commercials/levers.md](/core/commercials/levers.md) |
| Media | no taxonomy yet — hand-declared operations only, see below |

A department with no file yet is a gap, not a resting state: the values
get documented once real operations show that a lever actually
recurs, rather than being invented ahead of the data.

## `unknown` vs `manual-entry`

Both mean "this row carries no lever", and they are not
interchangeable — they say opposite things about whether anything
should be done about it.

- **`unknown` — the machine could not classify it.** The row came from
  an automated source and no rule matched it: either the source has no
  taxonomy at all yet, or it has one and this particular pattern isn't
  covered — including the case where a source only started emitting the
  field its taxonomy reads from partway through its own history, which
  leaves every earlier row permanently `unknown` (commercial activations before
  2026-09-09). It is a backlog item, and the share of `unknown` in a
  source is a measure of how much classification work is outstanding
  there.
- **`manual-entry` — a person declared there is nothing to classify.**
  The row was written by hand for an operation that has no recurring
  lever type: a one-off intervention on a system that offers no API to
  track it automatically. It is a terminal, correct state, not a gap.

The distinction only holds if it is respected on the way in: a
hand-written operation is never `unknown` (the person writing it is the
authority on what it was), and an automated source never emits
`manual-entry` (no person was involved). Collapsing the two would make
the `unknown` share unreadable — impossible to tell outstanding work
from operations that are, correctly, unclassifiable.

**Two is the whole list, and a third is not the answer to an awkward
row.** An automated source that offers its own "none of the above"
option is the case that invites one — admin3's commercial activation
logs let the author pick `other` as the reason for a change. That is
`unknown`, not a value of its own: a dropdown's residual option is much
weaker evidence than a person writing the entry themselves, and a
recurring change arriving as `other` means the *source's* vocabulary is
missing a value, which is outstanding work exactly as `unknown` says.
Where the raw value still matters it is recoverable from the row's
`metadata`, so a third way of saying "no lever" would cost every reader
and every query something they can already get without it. See
[core/commercials/levers.md](/core/commercials/levers.md).

## Hand-declared operations

Some real operations happen in systems that expose no API to read them
back — an ad-server console, a CDN dashboard, a vendor's back office.
These are declared by hand and imported like any other source, so they
sit in the same timeline as the automated ones and can be
cross-referenced against a metric that moved on the same day.

They are recognisable by their source, which always starts with
`manual` — `manual` for the ones declared in the jetagents repo,
`manual-marketing` for the ones the marketing team declares in its own
shared sheet, `manual-app` for the mobile app releases declared in a tab
of that same sheet — and, unlike every automated source, their content is only as complete as the person
writing it chose to make it: a quiet week means either a quiet week or
an intervention nobody wrote down. Read an absence here as no evidence,
never as evidence of absence.
