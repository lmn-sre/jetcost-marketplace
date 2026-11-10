---
type: Marketing Channel
description: "The Not SEM branch of paid acquisition — the display, checkbox and llm channel groups, the sources behind each, and which marketing-cost bucket each one's spend lands in."
tags: [marketing]
timestamp: 2026-10-22T00:00:00Z
---

# Other Channels

## Overview

Paid acquisition outside SEM: the **Not SEM** branch of the
[traffic taxonomy](/core/marketing/traffic-taxonomy.md), i.e. every
paid channel group other than `paid-search`. Campaign traffic that is
not paid (CRM, for instance) is not covered here: see
[crm.md](/core/marketing/crm.md).

The point to keep in mind throughout is that the Not SEM branch and the
NotSem cost bucket do not coincide. Where each channel's spend lands is
stated below; why the two cuts differ is in the traffic taxonomy.

## Channel groups

### display

Paid display, bought on more than one platform:

- **Google Ads display** (source `google`) — bought on the Google Ads
  platform, so its cost is in the **GAds** bucket even though it is not
  SEM traffic.
- **Criteo** (source `criteo`) — web remarketing, see
  [remarketing.md](/core/marketing/remarketing.md). Cost in the
  **NotSem** bucket.
- **Other display sources** (Taboola, Outbrain, Facebook and others) —
  tagged as paid, but no cost is allocated to them in any bucket.

### checkbox

Traffic acquired from MAL-style placements — the generic "came from a
placement" bucket, not the name of a single unit. All of its cost is in
the **NotSem** bucket. It holds two things with opposite economics,
separated only by `sessionCampaignSource`:

- **`mal`** — Jetcost's own inflow from MAL placements, today the self
  trailing tab on the white labels' exit unit. Its cost is a **virtual**
  cost, an internal transfer, indistinguishable from real spend in any
  cost field. See
  [core/commercials/mal/self-trailingtab.md](/core/commercials/mal/self-trailingtab.md),
  which also covers the campaign families the source held before the
  trailing tab.
- **Third-party inbound** — Jetcost bought from other sites' units, each
  under its own source: `bookingbuddy`, `mediaalpha`, `farecompare`,
  `turismocity`. Real external spend.

Filtering on the channel group alone mixes the two.

### llm

Paid traffic bought on OpenAI (source `openai`): ads inside ChatGPT, see
[llm-ads.md](/core/marketing/llm-ads.md). Cost in the **NotSem**
bucket.

Not to be confused with users who reach Jetcost by following a link in an
AI assistant's answer: that traffic is unpaid referral, with virtual
campaigns of its own (see
[sem/dimensions.md](/core/marketing/sem/dimensions.md), *AI assistant
referral*).
