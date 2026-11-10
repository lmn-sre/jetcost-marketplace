# Martech Overview

## Role in the Business

Martech owns the tracking and tagging layer: the tags, triggers and
variables that decide what Jetcost measures, what it sends to third
parties (analytics, ad platforms, partner pixels), and under which consent
conditions. It sits between product and marketing without belonging to
either — product builds the site, marketing buys the traffic, martech
decides how both are observed.

Its interventions rarely move a KPI on purpose, and that is exactly why
they matter here: a tagging change is one of the most common explanations
for a metric that moved without anything in the business moving. A pixel
added, a consent condition rewritten or a tag deleted can change measured
conversions, a partner's attribution, or a bidding signal, while the
underlying user behaviour is unchanged. Operation logs from this function
are read in root-cause investigations — see
[levers.md](/core/martech/levers.md).

## Team & Ownership

- **Tag management** — every tag, trigger and variable is deployed by
  publishing a Google Tag Manager container. Each publish is a release of
  the measurement layer, and it is the one operation this function is
  tracked on. See [levers.md](/core/martech/levers.md).
- **Tracking tags** — which tags run on web and app, what they send, and
  why Google's tags adapt to a missing consent while third-party ones
  are gated. See [tags.md](/core/martech/tags.md); which consent each
  tag needs is in [data/consents.md](/data/consents.md).

## Relationship to Tech

Martech and [core/tech/](/core/tech/index.md) both release things, and the
two are deliberately separate departments rather than one: a code release
ships the application, a container publish ships the measurement of it.
They have different authors, different review paths and different failure
modes, and an investigation usually needs to tell them apart — which is
why they carry different `internal_event_type` values (`release` for tech,
`tag-release` here) rather than sharing one.
