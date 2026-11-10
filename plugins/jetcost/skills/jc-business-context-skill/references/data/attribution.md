---
type: Data Convention
description: "Describes Jetcost's three attribution models and which one is the default for reporting and reconciliation."
tags: [data]
timestamp: 2026-09-24T00:00:00Z
---

# Attribution Models

## Overview

Attribution determines which marketing touchpoint receives credit
for a booking. For CPA deals, the attribution model directly
affects whether a booking is counted as Jetcost's conversion and
therefore whether revenue is recognised.

Jetcost uses three attribution models.

## Models

### lastclick

Standard last-click attribution. The booking is assigned to the
last channel the user interacted with before converting, regardless
of whether that channel was paid, organic, or direct.

- Industry-standard model
- Easy to implement and audit
- Overweights direct and branded traffic, which tend to occur
  close to conversion but may not have driven the original intent

### lastclicknotdirect

Last-click attribution that excludes direct sessions. If the last
touchpoint was a direct visit (no referrer, typed URL, bookmark),
attribution rolls back to the previous non-direct touchpoint.

- **This is the standard model used by the Business Strategy team**
- Avoids crediting direct visits that are unlikely to have caused
  the booking intent
- More representative of the actual marketing channel contribution
- The default for reporting, partner reconciliation, and revenue
  analysis unless otherwise specified

### userbased

A custom internal model, implemented as `userBasedCluster` (plus a
matching `userBasedCampaign`/`userBasedFirstDate`) in the ClickHouse
semantic layer. It is **not** a pure first-touch model: it compares
two single-session, last-click reads — the user's **current session**
and their **first-ever session** — and prefers the current one,
falling back to the first only to recover a paid acquisition the
current touchpoint alone wouldn't explain:

- Current session is paid → credit it. **New Paid** if it's also the
  user's first session, **Returning Paid** otherwise.
- Current session is not paid, but the first session was paid →
  credit the first session instead. **Marketing-Driven** — the
  first-touch fallback, used only for this case.
- Neither session is paid → **New Not Paid** / **Returning Not Paid**,
  crediting the current session.

For app sessions opened via a web-to-app install (W2A), the "current"
and/or "first" session above is the underlying **web session(s)**
that produced the install, not the app session itself — a W2A app
session inherits its attribution from the web journey behind it. A
sixth bucket, **Unconsented**, is app-only and fires when that install
chain can't be resolved, so no paid/notpaid or new/returning read is
possible. Despite the name it is not only about consent: it takes
refused handoffs, where only the anonymous key arrived, and since
2026-09-02 also *Unidentified* ones, where only the web tool's code
arrived. Read it as "W2A not resolvable". Once a user's first install
is one of the two, every later app session of that user lands here,
paid ones included. See [data/consents.md](/data/consents.md) for the
handoff and why an unrecorded consent is not a refused one, and
`skills/jc_clickhouse_semantic_layer_skill/attributes.yml`'s
`userBasedCluster` comment for the exact branch logic (13 cases,
covering the W2A/non-W2A split above, plus the four that feed this
bucket).

- Still a first-touch-leaning view of marketing value overall,
  compared to `lastclick`/`lastclicknotdirect` — it's the model that
  will surface acquisition channels (e.g., SEO, display) that a pure
  last-click read would hide behind a later paid or direct visit
- Less aligned with partner billing conventions, which are
  generally last-click based
- Used for internal strategic analysis, not for partner-facing
  revenue reconciliation

## Which Model to Use

| Context | Model |
|---|---|
| Business Strategy reporting | lastclicknotdirect |
| Partner reconciliation | lastclicknotdirect (default) |
| Acquisition channel analysis | userbased |
| Cross-check / sanity | lastclick |

When a report or query does not specify an attribution model,
**assume lastclicknotdirect**.
