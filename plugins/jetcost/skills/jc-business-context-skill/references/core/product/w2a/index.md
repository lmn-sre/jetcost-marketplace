# W2A — Web to App Overview

## Files

- [blocking-page.md](/core/product/w2a/blocking-page.md) - the W2A tool that
  intercepts web users before search to prompt switching to the app
- [cug.md](/core/product/w2a/cug.md) - the mechanism that shows app-only
  prices on web, with the partner name blurred, and sends the click to the app
- [other-tools.md](/core/product/w2a/other-tools.md) - smart button, fare
  alert tool, and app QR code

## Overview

W2A describes all strategies and tools aimed at
migrating users from the web platform to the app.
App users show better funnel metrics and are more
valuable in CPA markets. W2A is a strategic
priority across product and marketing.

## Why W2A Matters

App users are structurally more valuable than web
users in several ways:

- Higher STR and CTR due to greater user intent
- Better CR in CPA markets
- More direct relationship with the user (push
  notifications, session continuity)
- Lower dependency on paid traffic acquisition

Shifting a user from web to app is therefore a
one-time investment with long-term revenue upside.

## W2A Tools

Jetcost uses several tools to drive web-to-app
migration. The two most important are:

- **Blocking Page**: intercepts users on web
  before they complete a search, prompting them
  to switch to the app. See [core/product/w2a/blocking-page.md](/core/product/w2a/blocking-page.md).

- **CUG (Closed User Group)**: surfaces on web
  offers whose price is available only on app,
  with the partner name blurred, creating a
  pricing incentive to switch. See [core/product/w2a/cug.md](/core/product/w2a/cug.md).

Additional tools are documented in [core/product/w2a/other-tools.md](/core/product/w2a/other-tools.md).

## Which Tool Produced an App Session

The W2A tool behind an app install or reopen is read from the app
session's **product campaign** — the in-session product channel
(`sessionContent` and its taxonomy on the sessions datamart). Every
W2A tool and variant is registered there as a campaign of its own and
classified by the campaign registry like any marketing campaign: the
channel says the session is W2A, the lower levels say which tool and
variant, and the campaign type tells an install from a reopen.

The name of the dynamic link the app was opened with must never be
used for this, even though it often looks like it names the tool:

- it is a feature configuration value (see
  [config/features/flights-w2a-blocking-page.md](/config/features/flights-w2a-blocking-page.md)
  and [config/features/cug.md](/config/features/cug.md)), so the same
  tool changes name over time, and names are not classified by
  anything;
- it is missing on a large share of W2A app sessions that do carry a
  product campaign.

A split by tool built on link names is therefore a guess on part of
the traffic, while the product campaign covers it all with one
maintained taxonomy.

## Measurement

W2A effectiveness is measured by the volume of
users who switch from web to app and subsequently
generate app sessions — attributed to the tool
that produced them (see Which Tool Produced an App
Session above), and valued per cohort through the ARPU metrics in
[core/product/metrics.md](/core/product/metrics.md). The key tension is between
W2A conversion rate and the impact on web funnel
metrics — aggressive W2A tools can reduce web STR
and CTR if they intercept too many converting users.

That tension is measured directly by a traffic
control (`W2A-BLOCKING-ELEMENT`): a small share of
web traffic has every blocking and friction W2A
component switched off, and comparing it with the
rest gives the opportunity cost of the W2A push.
See [core/product/traffic-control.md](/core/product/traffic-control.md).
