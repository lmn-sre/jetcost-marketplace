---
type: Marketing Channel
description: "Describes CRM's retention channels — Web Push, Email, and App Push — their campaigns, cadences, and ownership, and how each channel and campaign type is identified in session data."
tags: [marketing]
timestamp: 2026-10-06T00:00:00Z
---

# CRM — Customer Relationship Management

## Overview

CRM covers all retention and re-engagement communication with Jetcost users across three channels: Web Push Notifications (WPN), Email, and App Push Notifications (APN).
The platform used for Email and APN is **Braze**. WPN runs on a legacy internal tool developed by the Tech team.

The CRM team owns the communication strategy and campaign logic.
Product owns the on-site subscription touchpoints (banners, opt-in flows).
Engineering owns data schema changes, new event tracking, and Braze profile attribute updates.

Both push channels are bounded by the same consent. Every "accepted push"
and "push enabled" audience in the tables below resolves to **`wapn`** —
a single consent covering web and app alike, not one per channel, so WPN
and APN reach are two reads of one permission rather than two independent
opt-in bases. See [data/consents.md](/data/consents.md) for it and for the
other consents a session carries; note in particular that a user with no
consent recorded is not a user who refused, which is the difference
between an addressable audience CRM hasn't asked yet and one it has
already lost.

---

## Identifying CRM traffic in the data

All CRM traffic carries channel group `crm`: campaign traffic that is
not paid, in the terms of the
[traffic taxonomy](/core/marketing/traffic-taxonomy.md). Within it, the
campaign **source** tells the channel apart, and each channel keeps its
campaign type in a different field:

| Channel | Source | Where the campaign type is read |
|---|---|---|
| WPN | `wpn` | Campaign Type (`*CampaignCampaignType`): `generic`, `sleepy`, `remarketing` — the three campaign types in the WPN table below. The medium is `crm` whatever the type, so it cannot separate them. |
| APN | `apn` | The medium, which carries the campaign family: `remarketing`, `travel_story`, `intercard`, `fa` (fare alert), `generic`, `sleepy` and the smaller ones. |
| Email | `newsletter` | The medium is `email`; the campaign name carries the canvas. |

Any other source under the `crm` channel group is legacy residue, not a
live channel. As with every campaign field, read source, medium and
type through one attribution scope (`sessionCampaign*`,
`lastClickNotDirect*`, `userBased*` — see
[sem/dimensions.md](/core/marketing/sem/dimensions.md)).

---

## Channels

### WPN — Web Push Notifications

Sent via an internal legacy tool. Due to technical limitations, the CRM team does not make manual configuration changes — all workflows are fully automated.

| Campaign type | Goal | Audience | Trigger | Frequency |
|---|---|---|---|---|
| Remarketing | Convert | JC + WL users who accepted push + cookie | After a search | +24h and +48h after search |
| Generic | Drive navigation | JC + WL users who accepted push | Scheduled by country/hours | 3 pushes/week max |
| Sleepy | Re-engage | Users with no push interaction for 3+ months | When user enters sleepy state | 1/week |

Granular delivery metrics (sent, open rate) are not available due to legacy stack limitations.
Performance is evaluated via sessions and revenue from the Session datamart (see *Identifying CRM traffic in the data* above for how to isolate WPN and its campaign types).

Monthly check: on the 20th of each month, the CRM team verifies that Generic and Sleepy campaigns are correctly scheduled and that no error alerts have been triggered in `#crm_monitor`.

---

### Email

Email subscriptions are collected exclusively via on-site banners (owned by Product).
User consents are persisted on **Consents Hub** for legal/DPO compliance.
Emails are sent via **Braze**.

#### Geographic coverage

Email addresses are collected in the following countries only:
Italy, France, United States, Spain, Germany, Indonesia, United Kingdom, Ireland, India, Canada, Singapore, Bolivia, Thailand, Venezuela, Chile, Austria, Mexico, Colombia, Hong Kong, Argentina, Australia, Malaysia, Philippines, Peru, Uruguay.

#### Campaigns

| Canvas | Goal | Audience | Trigger | Frequency |
|---|---|---|---|---|
| Catalog Confirmation | Double opt-in | Users with email available | Immediately after registration | Once |
| Welcome | Brand introduction | Reachable email users | Within 24h after registration | Once |
| Product | Service benefits | Reachable email users | 1 day after registration | Once |
| Remarketing | Performance | Reachable email users + personalization True or Not Set | 1 day after search (+2h if Product was received); +3 and +6 days | Event-based; exit on real conversion; re-entry after 4 days |
| Deals | Performance | Reachable email users + personalization True or Not Set + Top 5 | +5/6 days after search | Event-based; exit on real conversion; re-entry after 3 days |
| Monthly | Inspire | Reachable email users + sunsetting filter | Manual | 1/month |
| Destination | Inspire | Reachable email users | Manual | 1/month |
| Curiosity | Inspire | Reachable email users | Manual | 1/month |
| Event | Inspire | Reachable email users | Manual | Occasionally |

Manual campaigns (Monthly, Destination, Curiosity, Event) follow a Content Calendar defined every 6 months.

#### Template and localisation architecture

All templates share a standardised layout built in Braze using Content Blocks (global Header + mandatory Footer with localised unsubscription links and legal compliance text).
Multi-market content is managed via **Liquid logic** pulling from a centralised Google Sheet — each row maps to a country's copy, destination links, and tracking parameters.
This allows global content updates from a single source without modifying individual Canvas variants.

---

### APN — App Push Notifications

Sent via **Braze**. APNs are also stored in a **notification center** inside the app via dedicated Content Card canvases (Remarketing and Manual Travel Stories).

#### Campaigns

| Canvas | Goal | Audience | Trigger | Notes |
|---|---|---|---|---|
| Welcome_Travel_Story | Introduce Travel Story feature | New Braze users (first used app < 1 day ago) | Daily | 1 push |
| TS_weekly_manual | Engagement / Inspire | All users with push enabled + deals available (Top 6 expanded + US/CA/Asia/LATAM) | Weekly on Monday | Exit if sleepy or churn risk or received APN/welcome < 1 week ago |
| TS_559_NextButOneWeekend | Engagement / Inspire | All users with push enabled (Top 6 + expanded) | Weekly on Tuesday | Exit same conditions as above |
| TS_504/519_Deals | Engagement / Inspire | All users with push enabled + deals available (Top 6 + expanded) | Weekly on Thursday | Exit same conditions as above |
| Generic Summer/Winter/WE | Performance | Reachable users + push enabled + personalization True or Not Set + search in specific period | 2/3 days after search | Exit on conversion; 1 push |
| APN_Remarketing | Performance | Reachable users + push enabled + personalization True or Not Set | 1 day after search | 2 pushes; exit on conversion |
| APN_Remarketing_Day0 | Performance | Reachable users + push enabled + personalization True or Not Set (FA users excluded) | 2h after search | 1 push; exit on conversion or 5h |
| APN_Deal_Section_App | Performance | Reachable users + push enabled + personalization True or Not Set (FR, IT, ES, DE, GB) | 5 days after search | 1 push (ext only); exit on conversion |
| APN_Intercard_Direct | Performance | Reachable users + push enabled; nearby date or airport blank | 4h after search | 1 push; exit on search or conversion; re-entry after 1 day |
| APN_Intercard_NearbyDate | Performance | Reachable users + push enabled | 4/7h after search | 2 pushes; exit on conversion; re-entry after 1 day |
| APN_Intercard_Inspirational | Performance | Reachable users + push enabled | 7 days after search | 1 push; re-entry after 7 days |
| APN_Intercard_NearbyAirport | Performance | Reachable users + push enabled; nearby date blank | 4/7h after search | 1 push; exit on conversion; re-entry after 1 day |
| APN_Intercard_NearbyAirport_2 | Performance | Reachable users + push enabled | 3 days (+3h) after search | 1 push; exit on conversion; re-entry after 1 day |
| Car_search_Event | Performance | Reachable users + push enabled | 1 day after car search | 1 push (2 for ext) |
| Bookmark_user_journey | Performance | Reachable users + push enabled + last bookmark > 3 days ago + date_from > 1 week from now | 3 days (+3h) after bookmark event | 1 LOC / 2 EXT (+6d); exit on churn risk |
| Fare_Alert_Expired | Performance | Users with an expiring alert | API-based: 1 day before expiration | 1 push |
| Fare_Alert_Steady | Performance | Users who activated FA | API-based: Tue + Fri at 19:00 local (FR: Wed + Sun) | 2 pushes |
| Fare_Alert_Decrease | Performance | Users who activated FA | API-based | 2 pushes |
| Fare_Alert_Increase | Performance | Users who activated FA | API-based | 2 pushes |
| APN_Generic_Opt-in_6months | Audience growth | Users with personalization False | — | 1 push; re-entry after 24 weeks |

*Note: canvas settings reflect the current state and are subject to change as the CRM team continuously tests and optimises campaign logic.*

#### Canvas configuration requirements

Every Braze Canvas must define: Organisation Tags, Success Metrics (primary Conversion Event), Delivery Logic (schedule and trigger), Audience Segmentation, Exit Criteria, Re-entry Rules, Send Settings & Frequency Capping, and the full Orchestration Flow.

#### Weekly Travel Story routine

CRM owns the content of the app's Travel Stories; the surface itself is product's, and what a story is made of — profiles, screens, the TEXT / CTA / Deal Scout Auto templates — is described in [core/product/travel-stories.md](/core/product/travel-stories.md). What follows is the production routine.

Travel Stories (TS) are created weekly following a Content Calendar defined every 6 months. CTA stories carry manual deals via DealScout SSID codes, always 3 CTAs.

Weekly schedule:

| Day | Task |
|---|---|
| Monday | Create new Travel Stories for the week; check dates, texts, images; verify campaigns in Anagrafica; update Canvas step names and country availability; launch Canvas |
| Tuesday | Check `priv_mb_monitor_travel-story` for countries without available deals; update Canvas accordingly (add/remove Z flags); relaunch |
| Thursday | Same as Tuesday for TS 504/519 |

Expired manual deals must be recreated in the internal tool and updated in the relevant Travel Story. The `priv_mb_monitor_travel-story` Slack channel is the primary alert source for deal availability issues.
