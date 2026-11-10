---
type: Product Concept
description: "What a traffic control is at Jetcost, how it differs from an A/B test, how controlled sessions show up in the data, and what each traffic-control code is for."
tags: [product, data]
timestamp: 2026-10-13T00:00:00Z
---

# Traffic Control

## Overview

A traffic control is a holdout: a small, stable share of live traffic
from which one product behaviour is withheld, so that what the
behaviour does to the rest of the traffic can be measured against a
baseline that never received it.

Each traffic control is identified by a code, and a session can be
subject to several codes at once.

## How It Differs From an A/B Test

An A/B test (see [core/product/abtests.md](/core/product/abtests.md))
compares variants of a change in order to decide which one ships. It
is switched on, off and rescoped while it runs, and it ends.

A traffic control does not compare candidates and does not decide
anything by itself. It keeps a control group permanently aside from
behaviour that is already live, and it exists for as long as the
measurement it feeds is needed. Its purpose is one of two kinds:

- **Measuring a cost**: what the live behaviour costs or earns
  compared with not having it at all.
- **Collecting unbiased data**: giving the control group a neutral
  behaviour whose data a model can learn from without the feedback
  loop of the live behaviour.

The two mechanisms are independent. A session can be in a traffic
control's control group and exposed to an A/B test at the same time,
and the share of A/B-tested sessions is the same inside and outside
the control group.

## Exposure Is Recorded on the Session

Each session carries the traffic controls it was subject to
(`trafficControlMap` on the sessions datamart), one entry per code.
Each entry says:

- **in control**: whether the session is in the control group, i.e.
  the behaviour was withheld from it. When false, the session was
  subject to the code but got the live behaviour.
- **scope**: the unit at which assignment is made.
- **percentage**: the share of traffic the code puts in control.

A session with no entry for a code was not subject to it at all: it
belongs to neither side. Any comparison between control and
non-control must be made among the sessions that carry the code.

## Codes

### SORTING-EXPLORATION

The control group gets a plain random sorting of flight offers
instead of the live sorting. The randomly ordered results give
unbiased data on how position and offer drive clicks, which is used
to train the sorting model applied to the rest of the traffic. See
[core/product/sorting.md](/core/product/sorting.md).

### W2A-BLOCKING-ELEMENT

The control group has every blocking and friction W2A component
switched off — the blocking page and any other element that holds a
web user back to push them towards the app. Comparing it against the
rest of the traffic gives the opportunity cost of the W2A push on
web. See [core/product/w2a/index.md](/core/product/w2a/index.md).

### TC-DEBUG

A short technical run made only to verify that the traffic-control
mechanism worked end to end. It carries no business meaning and
should be ignored in any analysis.
