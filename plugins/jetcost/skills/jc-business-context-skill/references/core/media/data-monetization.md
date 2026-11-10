---
type: Media Concept
description: "Emerging revenue stream from selling anonymised user data to partners — early stage, excluded from core business metrics, and loaded by hand so gaps in the data are missing uploads rather than lost revenue."
tags: [media]
timestamp: 2026-10-29T00:00:00Z
---

# Data Monetisation

## Overview

An emerging stream that enables Jetcost to sell anonymised user data to
partners. It is followed by the media team, which is why it is
documented next to the advertising integrations, but it is not Media
revenue: it is a separate stream, outside both Core and Media. Data is aggregated and anonymised before any transfer — no
personally identifiable information is shared (see the Privacy section
in `CLAUDE.md` for the project-wide rule this stream must comply with).

This stream is currently in early stages: revenue amounts are not yet
significant, and data is not yet stable enough for use in standard
performance evaluations (e.g. the ICE framework). It is tracked
separately and excluded from core business metrics until further
notice (see [revenue-streams.md](/core/business/revenue-streams.md) for how it sits alongside the
five main streams).

## How the revenue is loaded

Revenue figures are **uploaded by hand by the media team** — there is no
direct ingestion from the data partner. A period with no revenue is therefore
an upload that hasn't happened yet, not a period in which the stream earned
nothing. Observed 2026-09-22: the data reads zero from 2026-05 onward while
the stream is active. Never read a gap as the stream having ended, and never
build a trend across one.

The figure reaches session grain as a monthly allocation — see
[data/pro-rata-allocation.md](/data/pro-rata-allocation.md) for which
dimensions it can and cannot be broken down by.

## Configuration

Mobile app data-monetisation features are controlled via
[config/features/mobile-app-data-monetization.md](/config/features/mobile-app-data-monetization.md). The integration
turns on only with the user's consent; which consents, and the open
issue on one of them, are in [data/consents.md](/data/consents.md).

## Details

*To be documented in detail as the stream matures: data types
collected, anonymisation process, and partner terms.*
