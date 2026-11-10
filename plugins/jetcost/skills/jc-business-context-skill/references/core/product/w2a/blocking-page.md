---
type: Product Feature
description: "A W2A tool that intercepts web users before search to prompt switching to the app."
tags: [product]
timestamp: 2026-11-09T00:00:00Z
---

# Blocking Page

## Overview

A W2A tool that intercepts users on web before
they complete a search, presenting a prompt to
switch to the app. It is a high-visibility
intervention with direct impact on web STR and
app conversion volume.

It is implemented by the feature flag
[config/features/flights-w2a-blocking-page.md](/config/features/flights-w2a-blocking-page.md),
which describes each config individually. This
file explains how those configs combine.

## How It Works

When a user on web launches the flight search
that meets the blocking conditions, a page is
shown in place of the search, pointing the user
to the app. The page is closable: besides the
app button it offers a "continue on the web"
action that runs the same search on web. The
search does not run on web unless the user
continues.

One rule decides which search is blocked:

- **Position in the session** — only the N-th
  flight search of the browser session is
  blocked, N being set on the feature. The
  browser session ends when the browser is
  closed.
- **Once per session** — once the page has been
  shown, no other search of the session is
  blocked.
- **Booking window** — optionally, the block
  applies only when the days from today to the
  departure fall in the booking windows chosen
  on the feature. If the N-th search falls
  outside them, no later search of the session
  is blocked.

Which users can be blocked at all — site,
market, device, the session's campaign — is set
through the feature's rules. Sessions in the
control group of the W2A traffic control are
never blocked (see
[core/product/traffic-control.md](/core/product/traffic-control.md)).

## Revenue Implications

The blocking element creates a direct trade-off:

- Users who switch to app are more valuable
  long-term (higher funnel metrics, CPA upside)
- Users who are blocked and abandon reduce
  web STR in the short term

The net revenue impact depends on the conversion
rate of the block, the quality of the intercepted
users, and the downstream app funnel performance.
The levers weigh this trade-off: the position of
the blocked search decides how far a user explores
on web before being interrupted, and the booking
window restricts the block to the departures
chosen. Since the page can always be closed and
shows at most once per browser session, no user
is kept from searching on web.
