---
type: Marketing Concept
description: "The tracking tags Jetcost runs on web through GTM and the much smaller set on app, what each one sends and to whom, and the two ways a tag reacts to a missing consent: Google's tags adapt natively, third-party tags are gated by GTM."
tags: [martech]
timestamp: 2026-10-26T00:00:00Z
---

# Tracking Tags

## Overview

The tags are how Jetcost's measurement reaches the outside world:
analytics, ad platforms, partner pixels. Which consent each tag needs,
and what happens without it, is stated in one place only, the usage
table in [data/consents.md](/data/consents.md). This page says what the
tags are and why they react to consent the way they do.

**Tags exist on web only.** On web they are deployed through Google Tag
Manager, and each container publish is tracked as a `tag-release` (see
[levers.md](/core/martech/levers.md)). The app has no tag layer: GA4 is
its only analytics integration, and the other consent-dependent pieces
of the app are integrations and product features, not tags.

## Two Ways a Tag Meets a Missing Consent

- **Google's tags adapt.** GA4 and the Google Ads tags read Google
  Consent Mode by themselves. Without consent they keep running and
  change what they send, from identified to anonymous data; Google
  decides the details, not our GTM setup. A drop in identified signal
  from these tags, with no drop in volume, is consent moving, not
  traffic.
- **Third-party tags are gated.** Facebook, Criteo, Clarity and OpenAI
  fire only when GTM sees the Consent Mode signals they need. Without
  them nothing is sent at all, so whatever they measure on the
  platform's side shrinks with the consent rate.

The signals a tag needs are Google Consent Mode names. Which of our
consents grants each one is the mapping table in
[data/consents.md](/data/consents.md).

## Web

| Tag | What it sends | How it meets consent |
|---|---|---|
| GA4 | site analytics | adapts — native |
| Google Ads conversions | conversions for Google Ads bidding (see [google-ads.md](/core/marketing/sem/google-ads.md)) | adapts — native, assumed to behave as GA4 (to verify) |
| Google Ads remarketing | remarketing audiences | adapts — native |
| Floodlight | signals to Bing | to verify — Bing has no explicit consent handling; the tag may be covered natively like Google's |
| Facebook | pageviews, flight and car searches, flight and car clickouts | gated |
| Criteo | flight searches only | gated |
| Clarity | session recordings | gated |
| OpenAI | conversions | gated |

## App

- **GA4** — the only analytics integration. Handles consent natively,
  as on web.
- **AppsFlyer** — the app's measurement integration. Not a tag, and it
  runs whatever the user chose: consent decides whether the data it
  receives is anonymised.

The app's other consent-dependent pieces — display banners and the
data-monetisation integration — are listed in the usage table
in [data/consents.md](/data/consents.md), each linking to the page that
explains it.
