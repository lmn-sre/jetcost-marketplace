---
type: Data Convention
description: "Distinguishes Session, User, and Marketing Session — three related but distinct units of user activity measurement — including the two rules that close a session on both platforms and how web and app each enforce them."
tags: [data]
timestamp: 2026-10-29T00:00:00Z
---

# Sessions, Users, and Marketing Sessions

## Overview

Three distinct concepts are used to measure user activity at
Jetcost. They are often confused but serve different analytical
purposes and should not be used interchangeably.

## Session

A session is a continuous interaction window for a single user on the
platform. **Two** rules close it, and both apply on web and on app:

- **30 minutes of inactivity** — a user who returns after that starts a
  new session.
- **Midnight `Europe/Paris`** — the session is invalidated at the day
  boundary regardless of activity. Enforced backend-side on both
  platforms. Note the fixed timezone: the boundary is the same instant
  everywhere, so on a market outside `Europe/Paris` it does not fall at
  local midnight.

So one user generates multiple sessions in the same day, and a user
active across the day boundary generates at least two.

- Sessions are the primary unit of traffic measurement for
  web and app
- In the revenue funnel: `Sessions → Searches → Clicks → Bookings`

Sessions are the denominator for STR (Search-Through Rate) on web.

The session identifier itself is **not exposed as a datamart column**,
so it can't be selected, joined on, or counted distinctly — what the
analysis layer reads is the session *count*. The identifier does exist
in the raw upstream data; it just isn't part of the datamarts.

## How each platform enforces it

One concept, two enforcements — and the device is what makes them
differ, not the definition. A web page talks to the backend on every
view; a mobile app can stay alive for days without contacting it.

**Web**: the check runs server-side at the next page view. Both rules
bite as soon as the user does anything, so a web session outlives
neither.

**App**: the inactivity rule is enforced client-side, from a remote
config — `SESSION-DURATION` in
[config/features/mobile-app-settings.md](/config/features/mobile-app-settings.md),
whose default is the 30 minutes above. The session is also
scoped per market: one per country, so it does not carry across a
country/language change (see below).

And expiry is not evaluated continuously. Neither rule is checked while
the app sits in foreground or in background; the check happens only:

- on reopen after the app was killed, by the user or by the OS;
- on a country/language change;
- on an open through a W2A tool, a push notification, or OIA.

So an app session ends at the next check rather than at the 30-minute or
midnight mark. The case where that shows is a long-lived install: an app
left in the background for days and picked up again without a kill
continues in the same session, past both rules — where the equivalent
web activity would have been split. That's the edge of the
implementation, not a second definition of session.

### Country/language change

Sessions are per market, so a country/language change re-evaluates
expiry against the market being entered:

- if no session was ever issued for that market, a new one is issued;
- if the market's existing session is still valid, it is kept.

Combined with an app user identifier that never expires and is shared
across markets (see below), one user can hold several valid sessions
at the same time, one per market. A market switch therefore produces
a session that is new without the visit being new.

## User

A user is an anonymous identifier that persists across sessions. Its
lifetime differs by platform:

- **Web**: **1 year** from creation (or last renewal).
- **App**: the identifier (`jetuser`) **never expires**, and it is
  the same one across every market — unlike the session, which is
  per-country. There is no expiry rule for it today; that is a known
  gap rather than a deliberate choice, so treat the absence of one as
  liable to change.

- One user can have many sessions over time
- Used to measure reach and retention independently of session
  volume
- In the app context, **Active Users** (DAU) replaces raw session
  counts as the upstream funnel metric, because the session
  construct is less stable on mobile

A single user generating more sessions over time appears as
traffic growth in session metrics but not in user metrics.
Distinguishing between the two helps separate acquisition
effects from engagement effects.

## Marketing Session

A marketing session is not a session in the technical sense —
it is closer to a **touchpoint**: a recorded interaction between
a user and a marketing channel that brought them to the platform.

Key differences from a standard session:
- Does not follow the 30-minute inactivity rule
- Represents a channel attribution event, not a user activity window
- Used as the unit of measurement for marketing attribution
  and channel analysis
- Multiple marketing sessions can be associated with a single
  standard session or user journey

The marketing session is the concept underlying attribution
models (see [data/attribution.md](/data/attribution.md)). When analysing which channel
"drove" a conversion, the analysis operates on marketing sessions,
not on standard sessions.

## Without Consent: the Meta Universal Key

All three identifiers above are direct pointers, and they travel only
with the user's consent. Where it is missing, an anonymous and more
generic key, the **meta universal key** (`muk`), can stand in for
them. It is a framework that counts the user in aggregate data without
pointing to any session or user. Today it is applied only to the
web-to-app handoff, but it is meant to be applied in other contexts. See
[data/consents.md](/data/consents.md) for what it is and what it does
not carry.

## Summary

| Concept | Lifetime | Primary use |
|---|---|---|
| Session | 30 min inactivity, or midnight `Europe/Paris` — on app also scoped per market, and checked at a few moments rather than continuously | Traffic volume, funnel metrics |
| User | 1 year on web; no expiry on app (`jetuser`, shared across markets) | Reach, retention, app funnel |
| Marketing session | Per touchpoint | Attribution, channel analysis |
