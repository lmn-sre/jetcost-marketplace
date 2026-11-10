---
type: Business Process
description: "Describes the stages a partner goes through from sourcing to go-live and ongoing performance monitoring."
tags: [commercials]
timestamp: 2026-10-13T00:00:00Z
---

# Partner Lifecycle

## Overview

Documents the stages a partner goes through from initial contact to
active integration and ongoing monitoring: sourcing, negotiation,
technical integration, go live, and performance monitoring. Account
Management drives most of the process; Legal, Revenue Management,
Tech, and Procurement step in at specific points.

This reflects the current integration process. Two recent changes
matter most for interpreting partner data and timelines:

- Negotiation now includes compliance checks (business registry,
  signatory verification, D&B credit check) that used to happen
  informally.
- eCPC setup has a hard deadline — a campaign without it activates
  on a fallback value.

## 1. Sourcing

Account Management evaluates inbound leads or scouts outbound ones
against a fixed set of criteria: existing metasearch presence,
review legitimacy, content validation, booking flow quality,
traffic, and D&B outcome.

## 2. Negotiation

Commercials and conditions per placement are agreed by Account
Management, with team consensus and Head of Commercial approval.
Payment structure (prepayment vs. invoice) depends on business type
(public vs. private) and the credit check outcome.

Compliance now sits inside this stage rather than happening
informally: business registry extract, signatory declaration, and —
only if necessary — a D&B credit check (OTA Finance) and legal
review for non-standard IOs. This closes a gap where a partner could
previously reach contract without a verified legal identity.

The stage ends with the IO going through procurement for signature
and the signed agreement being filed.

## 3. Technical Integration

Group, partner, and commercial rules must exist in the registry
(anagrafica), in both dev and prod, *before* handoff to Tech.

eCPC must be set by Revenue Management immediately once the
campaign is ready. If it's missed, the campaign activates on a
fallback eCPC value instead — this is the single most consequential
deadline in the process: a partner that goes live without eCPC set
will show pricing/performance that doesn't reflect the negotiated
deal until someone notices and corrects it.

Conversion API integration, where applicable, is tracked here and
updated once it goes live.

Before go live, Account Management tests one-way / round-trip /
per-passenger / business / first class fares in dev/staging.

## 4. Go Live

The campaign is activated only after testing passes, and — where
required — after partner confirmation and receipt of prepayment.
Configuration moves to production, optionally scoped to a route
list per partner.

## 5. Ongoing Performance Monitoring

Account Management sets up partner dashboard access and, for CPA
deals, must proactively email the partner to request the booking
report — this is a manual step, not an automated feed. Detailed FTP
reporting is set up only if needed. From here it's continuous KPI
monitoring.

## Implications for data interpretation

Three process facts explain anomalies that would otherwise look like
data issues:

- A partner live without eCPC configured is running on the fallback
  value, not the negotiated CPC — check partner setup before
  treating an outlier eCPC as a pricing or traffic signal.
- CPA booking data is partner-reported and requested manually by
  Account Management, not pulled automatically — expect lag and
  gaps in attribution reconciliation for newer or lower-touch CPA
  partners (see [data/attribution.md](/data/attribution.md)).
- A partner integrated through the Conversion API can send only part
  of its conversions without anything signalling it: its revenue is
  then understated rather than estimated, and reads like a
  performance drop. See
  [data/revenue-fields.md](/data/revenue-fields.md#how-partner-data-reaches-it-and-what-fills-the-gaps).
