# Marketing Overview

## Role in the Business

Marketing drives session volume — the top of the funnel.
Its composition (channel mix, geography, device) directly affects all downstream
revenue metrics. A change in traffic quality or channel mix can shift STR, CTR,
and the CPC/CPA deal mix even without any product change.

## Team & Ownership

Marketing owns acquisition — how sessions arrive, not what happens once a
user is on-site:

- **Paid acquisition (SEM)** — Google Ads and Bing Ads: campaign
  structure, keywords, bid strategy, budget. See [sem/index.md](/core/marketing/sem/index.md) for the
  shared structure, [sem/accounts.md](/core/marketing/sem/accounts.md) for how the
  account fleet is segregated and which markets it covers, and
  [sem/metrics.md](/core/marketing/sem/metrics.md) for SEM's own bid-management metrics (ROAS, CPA
  mktg, RPA).
- **Organic/SEO** — non-paid acquisition and content strategy. See
  [organic.md](/core/marketing/organic.md).
- **CRM** — retention and re-engagement (Web Push, Email, App Push),
  campaign logic and audience segmentation on top of Braze. See
  [crm.md](/core/marketing/crm.md).
- **Other channels** — paid acquisition outside SEM (display, checkbox
  placements, llm). See [other-channels.md](/core/marketing/other-channels.md)
  for how each lands in the taxonomy and the cost buckets, and the
  channel files for what each one is:
  [remarketing.md](/core/marketing/remarketing.md) (Criteo, and paid
  social on Instagram/Facebook from the end of 2026),
  [llm-ads.md](/core/marketing/llm-ads.md) (ads inside ChatGPT) and
  [app-install.md](/core/marketing/app-install.md) (Google app campaigns
  and Apple Search Ads).
- **Organic social** — brand activity on Instagram and Facebook. See
  [social.md](/core/marketing/social.md).

The levers marketing pulls across all of these channels, and how they
show up in the operation logs, are in [levers.md](/core/marketing/levers.md),
extended for SEM by [sem/levers.md](/core/marketing/sem/levers.md).

How these channels are clustered — campaign vs not-campaign, paid vs not
paid, SEM vs Not SEM — and how marketing cost reads against each cluster
is in [traffic-taxonomy.md](/core/marketing/traffic-taxonomy.md).

Adjacent functions own specific pieces Marketing depends on but doesn't
control: Product owns the on-site touchpoints CRM relies on for opt-in
(subscription banners, consent flows), and Engineering owns tracking/data
schema and Braze attribute changes. A change in session volume, channel
mix, or bid strategy is a Marketing-owned lever; a change in deal terms
or partner mix is not (see [core/commercials/index.md](/core/commercials/index.md)).

## Local vs Ext Traffic

Traffic is classified as **local** or **ext** based on the match between
the targeted market country and the user's actual country:

- **Local**: the user's country matches the account's target country
  (e.g. an Italian user on the Italian account)
- **Ext**: the user's country does not match the account's target country
  (e.g. a French user landing on the Italian account)

This distinction matters for funnel analysis: local and ext users show
different intent, conversion patterns, and revenue value.

## Channel Mix

| Channel | Role | Status |
|---|---|---|
| SEM (Google Ads + Bing) | Primary paid channel | Active — see [core/marketing/sem/index.md](/core/marketing/sem/index.md) |
| Organic / SEO | Long-term strategic priority | *To be documented* |
| Other channels | Paid acquisition outside SEM | Active — see [core/marketing/other-channels.md](/core/marketing/other-channels.md) |
| Remarketing | Bringing back users who already showed intent | Criteo active (web); paid social from the end of 2026 — see [core/marketing/remarketing.md](/core/marketing/remarketing.md) |
| Ads in ChatGPT | Paid acquisition on OpenAI | Active — see [core/marketing/llm-ads.md](/core/marketing/llm-ads.md) |
| App install | App acquisition, judged on the install cohort | Active — see [core/marketing/app-install.md](/core/marketing/app-install.md) |
| Organic social | Brand | Active — see [core/marketing/social.md](/core/marketing/social.md) |
