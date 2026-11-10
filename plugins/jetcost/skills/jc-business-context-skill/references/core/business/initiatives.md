---
type: Business Concept
title: Initiatives
description: "The macro activities Jetcost is running through the end of 2026, grouped into five strategic pillars: what each initiative is, the Jira code it is tracked under, and its metric, baseline and target."
tags: [business, strategy]
timestamp: 2026-10-23T00:00:00Z
---

# Initiatives

## Overview

An **initiative** is a macro activity the company has committed to —
a container for the projects, experiments and releases that pursue one
strategic outcome, not a single piece of work. The set below is the
plan **through the end of 2026**.

Each initiative belongs to exactly one **pillar** and is tracked in
Jira under one code. The code is the stable handle: names are revised
(see [Previous names](#previous-names)), codes are not.

This file states what each initiative *is* and, where one was set, the
metric it is measured on, its baseline and its target. A baseline
marked "not set" was not fixed when the plan was made; an initiative
with no metric at all says why. Targets without a date are due by the
end of 2026.

## Pillars

Five pillars group the initiatives by the kind of outcome they pursue.

| Pillar | Outcome it pursues |
|---|---|
| Boost Productivity with AI | Free analyst and operational time by automating repetitive work |
| Monetization | Grow revenue per session on the existing funnel and beyond the current partner base |
| Retention & Organic | Reduce dependence on paid acquisition — returning users, organic and AI-mediated discovery |
| Exploration | Validate new products and channels that are not yet part of the core business |
| Scalability | Make the platform able to absorb the above without the delivery cost growing with it |

## Boost Productivity with AI

### INIT-948 — Jetcost Context & AI Agents

Build a structured context foundation for each business function
(Marketing, Sales, Product) that can be consumed by AI agents, and
develop specialized agents that automate repetitive, function-specific
tasks. The goal is to scale operational efficiency by combining a
shared, reliable business context layer with vertical AI agents
trained on it, freeing analyst and operational time for higher-value
work.

| Metric | Baseline | Target |
|---|---|---|
| Number of AI deployed assets | 0 | 15 |

This is a delivery count, not a business metric: it is not derivable
from Jetcost's data, so an agent cannot evaluate progress on this
initiative from ClickHouse.

## Monetization

### INIT-956 — Tailored Jetcost

A centralized yield decision layer that resolves revenue-relevant
product logic at runtime — filtering,
[sorting](/core/product/sorting.md),
[Web-to-App](/core/product/w2a/index.md) and
[media](/core/media/index.md) density — replacing the hard-coded rules
currently scattered across the product. Configurable, observable and
testable by design, it collapses experimentation cycles from
release-bound to same-day and guarantees consistent decisioning across
every surface.

| Metric | Baseline | Target |
|---|---|---|
| [RPMS](/data/metrics.md), all [revenue streams](/core/business/revenue-streams.md) | 180 € — average of Q4 2025 and Q2 2026 | +5% on baseline (189 €) |

### INIT-949 — Interaction & Conversion Optimisation

Redesign and optimize interaction and informative elements of the
different pages that compose the [Jetcost funnel](/core/business/funnel.md),
to achieve two outcomes: (i) deliver better-qualified users to OTA
partners, increasing downstream conversion likelihood and partner
willingness to pay, and (ii) improve user interaction across the
journey in order to move active users further along the funnel.

The metric depends on the market's dominant
[deal type](/core/business/deal-types.md) — which markets are
predominantly CPC and which CPA is in
[markets.md](/core/business/markets.md#deal-structure-by-market). In a
CPC market revenue is earned at the click, so the funnel is measured up
to CTR; in a CPA market it is earned at the booking, so CR is included.

| Market type | Metric | Baseline | Target |
|---|---|---|---|
| CPA-dominant | [STR](/data/metrics.md) × CTR × CR — conversions per session | not set | 0.82% |
| CPC-dominant | [STR](/data/metrics.md) × CTR — clicks per session | not set | 52% |

### INIT-947 — Revenue Streams Diversification

Unlock additional revenue streams by activating new partner-driven
monetization channels:
[Multi-destinations](/core/business/business-profiles.md),
a self-service Partners Dashboard, and
[FPRS](/core/commercials/fprs.md) (Flight Price Ranking Service), and
tailored services for strategic partners like airlines
and tourism boards. The initiative diversifies Jetcost's revenue base
beyond the top current partners and builds the operational tooling
needed to scale [partner relationships](/core/commercials/partner-lifecycle.md)
efficiently.

| Metric | Baseline | Target |
|---|---|---|
| Revenue from the new streams this initiative activates | 0 — the streams do not exist yet | 30k € total |

## Retention & Organic

### INIT-955 — Come Back to Jetcost

Build a direct, lasting relationship with users, turning one-shot
searchers into a recurring audience that comes back to Jetcost on its
own. The initiative is the container for all activities that create
and nurture that relationship: giving users reasons to stay connected
with the brand, moving them onto the platforms and channels where the
relationship is stronger, and re-engaging them with relevant, timely
value. Success means more return sessions from free and paid brand
channels (last-click [attribution](/data/attribution.md)), lower app
churn, and growing revenue from returning users at a lower
re-acquisition cost.

The initiative is measured on **CB2J revenue** (Come Back to Jetcost):
revenue from sessions that the
[userbased attribution model](/data/attribution.md) credits to a user
coming back, not to a paid re-acquisition. It counts three cases:

- returning users brought back by a **Brand** or **Branded** paid
  campaign — someone who already knows Jetcost and searched for it;
- returning users from a **non-paid** source;
- **Marketing-Driven** sessions — users acquired through paid in the
  past who came back without a paid touch.

New users, and returning users brought back by any other paid campaign
type, are not CB2J. The segment that implements this is
`come_back_to_jetcost` in the ClickHouse semantic layer.

| Metric | Baseline | Target |
|---|---|---|
| CB2J revenue, CPA-dominant markets only (US, CA, UK and AU excluded) | not set | 650k € in Q4 2026 |

### INIT-954 — SEM, SEO & GEO Strategy

Decouple paid and organic search: give [SEM](/core/marketing/sem/index.md)
traffic its own conversion-first landing pages, revitalize
[SEO](/core/marketing/organic.md) on a faster, leaner page set, and
establish the foundation for Generative Engine Optimization (GEO) as
the search landscape evolves.

| Metric | Baseline | Target |
|---|---|---|
| Search reach — share of sessions with at least one search — on SEO and SEM [landing pages](/core/product/seo-pages.md) | 64% | 70% |

## Exploration

### INIT-756 — Veriflights

Launch a dedicated comparator focused exclusively on airline-direct
results, with no OTAs in the mix, to provide users with a transparent
comparison between direct airline prices and metasearch results. The
product is already live in test mode with a basic search flow (see
[business-profiles.md](/core/business/business-profiles.md)); the next
critical step is validating whether Veriflights generates additive
traffic rather than cannibalizing the core Jetcost funnel.

| Metric | Baseline | Target |
|---|---|---|
| [Sessions](/data/metrics.md) on Veriflights | not set | 60k sessions in Q4 2026 |

### IDEA-1081 — AI Discovery Channel

Position Jetcost in the emerging AI-driven discovery ecosystem, where
travel search is increasingly mediated by conversational assistants
and agents rather than search engines. The initiative is the container
for all activities that make Jetcost's flight search accessible to
third-party AI models and agents and distributed within their
ecosystems, so that Jetcost captures demand where it originates
instead of being disintermediated. Success means an early presence in
a channel still taking shape and a new, measurable stream of traffic
and revenue from AI-driven sources, complementary to paid and organic
acquisition.

The `IDEA-` prefix is an artefact of where the ticket was created, not
a difference in status: this is an initiative like the others.

No metric, baseline or target: the channel is still too undefined for
one to be meaningful.

## Scalability

### INIT-944 — Platform and Data Modernization

Modernize backend infrastructure toward cloud-native architecture,
frontend capabilities, data stack, and AI integration to support
flexibility, modularity, and rapid prototyping.

No metric, baseline or target: this is business-as-usual platform work,
not an outcome measured against a goal.

## Previous names

Five initiatives were renamed during planning, and several were
rescoped at the same time — the earlier name may still appear in Jira
history, Slack threads and older documents. The code is unchanged.

| Code | Previous name | Current name |
|---|---|---|
| INIT-956 | Instant Configuration | Tailored Jetcost |
| INIT-949 | Details & Results Page Optimization | Interaction & Conversion Optimisation |
| INIT-947 | New Partners Monetization | Revenue Streams Diversification |
| INIT-954 | SEO & GEO Strategy | SEM, SEO & GEO Strategy |
| IDEA-1081 | Public MCP & ChatGPT App | AI Discovery Channel |
