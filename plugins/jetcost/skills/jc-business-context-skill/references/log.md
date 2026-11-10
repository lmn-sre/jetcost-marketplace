# Domain Update Log

## 2026-11-05

* **Addition**: `app-release` in
  [core/tech/levers.md](/core/tech/levers.md), the publication of a new
  Android or iOS app version on its store, from the new hand-declared
  source `manual-app` (a tab of the marketing operations sheet). Kept
  apart from `release`, which is a GitLab tag: an app version reaches
  users when the store publishes it, days after the code. Documents why
  version data and release dates don't line up and must not be reported
  as an inconsistency: adoption is incremental, and the tech team's
  pre-release testing puts a version in the data before its release. The
  new source is also named in
  [data/operation-log-classification.md](/data/operation-log-classification.md).

## 2026-11-04

* **Creation**: the marketing channels beyond SEM, one file each.
  [core/marketing/remarketing.md](/core/marketing/remarketing.md):
  Criteo on web, fed through GTM with the signals of users who already
  searched, and paid social on Instagram/Facebook due by the end of
  2026. [core/marketing/social.md](/core/marketing/social.md): organic
  Instagram/Facebook, brand activity not judged on sessions.
  [core/marketing/app-install.md](/core/marketing/app-install.md):
  Google app campaigns and Apple Search Ads, judged on the install
  cohort. [core/marketing/llm-ads.md](/core/marketing/llm-ads.md):
  contextual ads inside ChatGPT, distinct from AI referral. Linked from
  the marketing index and from
  [core/marketing/other-channels.md](/core/marketing/other-channels.md).

* **Creation**: [core/media/metrics.md](/core/media/metrics.md), the
  media metrics glossary. Gross vs net media revenue: net was gross
  minus the internal media agency's fee on GAM, and the fee has been
  zero since March 2026, so net equals gross from then on and shows a
  step across that month. Then the GAM inventory metrics (ad requests,
  impressions, fill rate, eCPM, viewability) and the AFS ones (queries,
  coverage, ad clicks, CTR, CPC, RPM), with how each set combines into
  revenue. Linked from the media index, `gam.md` and `afs.md`.

* **Rewrite**: the display-media concept is now one file per provider.
  [core/media/gam.md](/core/media/gam.md) covers Google Ad Manager, the
  only media integration in the app (which used AdMob before moving back
  to GAM): paid per impression, its placement families (display,
  in-feed, interstitial), open auction (AdX plus Open Bidding, with
  header bidding planned but not live) versus direct deals sold by
  an internal media agency, which come and go by nature.
  [core/media/afs.md](/core/media/afs.md) covers AdSense for Search, on
  web only and paid per click, and says that its traffic gates are
  strategic bets against cannibalising Core click-outs, not business
  rules. Both send the reader to the live feature state and the
  operation logs for activation, instead of restating it. Removed:
  `core/media/display-ads.md`, whose links now point to the two new
  files.

* **Clarify**: [core/media/index.md](/core/media/index.md) and
  [core/media/data-monetization.md](/core/media/data-monetization.md)
  say that the media folder follows team ownership, not accounting: data
  monetisation is run by the media team but stays a stream of its own,
  outside Media revenue.

## 2026-11-02

* **Rewrite**: the web feature flags in `config/features/` now say what
  each flag and each config turns on, off or changes, for the 58
  production flags read by the web site (and those shared with the app),
  checked against the site's code and the search backend team.
  New: [config/features/afs.md](/config/features/afs.md),
  [config/features/multi-city.md](/config/features/multi-city.md),
  [config/features/price-calendar.md](/config/features/price-calendar.md),
  [config/features/flights-results-w2a-bottom-sheet.md](/config/features/flights-results-w2a-bottom-sheet.md)
  and [config/features/flights-results-w2a-elements.md](/config/features/flights-results-w2a-elements.md).
  Removed: the `anytime` and `top-web-intercard` docs, no longer in
  production. The 22 app-only feature docs follow in a separate change.

* **Fix**: the `core/` and `data/` passages that contradicted the site's
  behaviour. [core/product/w2a/cug.md](/core/product/w2a/cug.md): on web
  the app price is shown and the partner name is blurred, the price is
  not hidden. [data/consents.md](/data/consents.md): the web pages follow
  Iubenda's own state, and the web consumers (GAM, AFS, partner pixels,
  email opt-in, push request) are now in the table.
  [core/product/sorting.md](/core/product/sorting.md) documents the three
  orderings of the search backend. [core/commercials/mal/overview.md](/core/commercials/mal/overview.md):
  the inline unit and the checkboxes take the best few bids, not only
  the best one. [data/sessions-and-users.md](/data/sessions-and-users.md)
  drops a deployment snapshot of `SESSION-DURATION`.

* **Clarify**: [core/commercials/integration-types.md](/core/commercials/integration-types.md)
  explains that the exit unit can be sold as `trailing-tab` or
  `exitunit-form`, and keeps `TRAILINGTAB` as the type its clicks carry
  in practice: `EXITUNIT` / `FORM` and `EXITUNIT` / `PAGE` can be written
  but barely occur, and are not separate placements.

* **Pointer**: [config/features/index.md](/config/features/index.md)
  now sends the reader to the Jetcost Services connector's `features_*`
  tools for the current value of a flag. The live feature state moved from
  the catalog-features service to admin3, and the feature-state skill that
  used to read it was removed: the connector is the only way left to read it.

## 2026-10-28

* **Deprecate**: every hotels MAL feature is now marked deprecated —
  [config/features/mal-hotels-checkboxes.md](/config/features/mal-hotels-checkboxes.md),
  [config/features/mal-hotels-exitunit-form.md](/config/features/mal-hotels-exitunit-form.md)
  and [config/features/mal-hotels-exitunit-page-flight.md](/config/features/mal-hotels-exitunit-page-flight.md).
  They are still served by the feature state, pending their removal.

* **Add**: the three checkbox features
  ([config/features/mal-flights-checkboxes.md](/config/features/mal-flights-checkboxes.md),
  [config/features/mal-cars-checkboxes.md](/config/features/mal-cars-checkboxes.md),
  [config/features/mal-hotels-checkboxes.md](/config/features/mal-hotels-checkboxes.md))
  now say what they do: they control the presence of the MAL Media
  checkbox placement per product, `ENABLED` switches it and
  `MAX-PARTNERS` caps how many partners it opens for, i.e. how many
  checkboxes the user can tick.
  The old description, "checkbox-based filtering" of results, was a
  generated stub and wrong.

* **Fix**: [core/business/revenue-streams.md](/core/business/revenue-streams.md)
  and [core/commercials/mal/overview.md](/core/commercials/mal/overview.md)
  no longer state the share of MAL Media clicks sold directly through
  `MDFLOW`, nor rank its largest partners. Both now say the mix moves
  and must be queried, as
  [core/commercials/mal/networks.md](/core/commercials/mal/networks.md)
  already did: a share copied into the bundle goes stale.

* **Clarify**: [core/business/deal-types.md](/core/business/deal-types.md)
  now says the min_cpc floor *accrues* per click and is *compared* with
  produced revenue at the grain the clause is measured at, so "per
  click" no longer reads as the grain of the comparison, which
  [core/commercials/cpa-model.md](/core/commercials/cpa-model.md) sets
  at partner group × country.

* **Fix**: `ryan-vols` (ryan-vols.fr, FR) was missing from the
  white-label inventory in
  [core/business/whitelabels.md](/core/business/whitelabels.md), even
  though it carries white-label rows in the data and the page claims
  every registered domain is in the table. The SEM brand table in
  [core/marketing/sem/accounts.md](/core/marketing/sem/accounts.md) now
  spells `omeilleursprix` as the `website` value does.

## 2026-10-26

* **Add**: how consents map and where they are used, in
  [data/consents.md](/data/consents.md). The four Iubenda consents now
  carry their Iubenda purpose and the Google Consent Mode signals they
  grant. Purpose 3 (experience improvement) is not collected, because
  nothing on site or app is personalised. `dtra` is recorded as mapped
  to the wrong purpose: it means transfer to third parties but is wired
  to purpose 2 and `functionality_storage`. The cause is unknown and
  the fix is under discussion. A new usage table lists everything on
  web and app that depends on a consent, gated or adapting, and is the
  single place where each dependency is stated. The pages it links
  point back to it instead of restating the requirement.

* **Add**: the tracking tags, in the new
  [core/martech/tags.md](/core/martech/tags.md). On web, GA4 and the
  Google Ads tags adapt to a missing consent through native Consent
  Mode. Facebook, Criteo, Clarity and OpenAI are gated by GTM and send
  nothing without it. Floodlight's behaviour, and some of the Google
  tags', are marked to verify. The app has no tag layer: GA4 is its
  only analytics integration, and AppsFlyer anonymises its data without
  consent. [core/martech/index.md](/core/martech/index.md),
  [config/features/iubenda.md](/config/features/iubenda.md),
  `core/media/display-ads.md` (since split into GAM and AFS files) and
  [core/media/data-monetization.md](/core/media/data-monetization.md)
  point to the usage table.

## 2026-10-23

* **Add**: FPRS (Flight Price Ranking Service), in the new
  [core/commercials/fprs.md](/core/commercials/fprs.md). FPRS is a
  subscription that sells partners insight on where they ranked in
  users' searches, even when they took no click, so they can see how
  far behind they were and what to optimise. It is a revenue stream of
  its own: paid apart from the partner's CPC/CPA deal and leaving it
  untouched, so it is neither Core nor Media.
  [core/business/revenue-streams.md](/core/business/revenue-streams.md)
  lists it next to the other streams. The commercials and business
  indexes point to it. The bundle already named FPRS in
  [core/business/initiatives.md](/core/business/initiatives.md), under
  INIT-947, but spelled it out wrongly as "Flight Partner Revenue
  System". That is now corrected.

* **Add**: the meta universal key (`muk`), in
  [data/consents.md](/data/consents.md). The bundle named the `muk` but
  never said what it is: a framework for tracking users without
  consent, in which an anonymous key stands in for the user, session
  and marketing session identifiers. It counts the user in aggregate
  data and allows only a weak join. Today it is applied only to the
  web-to-app handoff, but it is meant to be applied in other contexts. The same
  page now also says that the web identifiers reach the app only when
  the user consented on both web and app, so a refusal on either side
  is enough to stop them.
  [data/sessions-and-users.md](/data/sessions-and-users.md) points to
  it from the identifiers it replaces.

## 2026-10-22

* **Update**: [data/revenue-fields.md](/data/revenue-fields.md) says where
  to find the periods in which a partner's missing conversions were
  recovered from an aggregated report, which partners and which metrics
  are still wrong: the ClickHouse semantic layer's new data-incidents
  file, which lists every known data incident and is applied by rule
  R024. The dates stay on that side only. Its first entry is ODIGEO,
  2026-10-07 to 2026-10-13.

* **Update**: `targeting-change` in
  [core/commercials/levers.md](/core/commercials/levers.md) now covers
  every change to where and to whom an active partner is shown —
  markets, devices, route and website whitelists/blacklists, and
  conditions on the search such as time of search or passengers — not
  just markets and devices. The old definition was narrower than the
  lever's real use: most rows carrying it since 2026-09-09 are route
  WL/BL updates. The section also explains how to tell it from
  `traffic-cut`, which touches the same admin3 settings, and what effect
  to look for.

* **Add**: AI assistant referral, in
  [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md).
  Since 2026-10-22, users who reach Jetcost from a link in an AI
  assistant's answer get virtual campaigns of their own, one per product,
  split out of the generic referral ones. The new section also tells this
  unpaid traffic apart from the paid `llm` channel group, and
  [core/marketing/other-channels.md](/core/marketing/other-channels.md)
  points back to it from that channel. The lists of non-campaign traffic in
  [core/marketing/traffic-taxonomy.md](/core/marketing/traffic-taxonomy.md)
  and [data/query-caveats.md](/data/query-caveats.md) now name it.

## 2026-10-21

* **Fix**: [core/business/funnel.md](/core/business/funnel.md) described
  session qualification as an anti-bot filter only, while the
  `qualifiedSession` field also drops sessions that never recorded a
  consent state on some channels — a large share of referral and
  organic-search traffic. The Session step now names both kinds of
  excluded traffic, links [data/consents.md](/data/consents.md) for what
  the technical consent marks, and leaves channels, conditions and dates
  to the semantic layer. It also pointed to a `qualifiedSession`
  definition in [data/metrics.md](/data/metrics.md) that never existed,
  while metrics.md pointed back to funnel.md: the pointer now goes to the
  semantic layer, and metrics.md drops its own paraphrase and links
  funnel.md as the single source.

## 2026-10-20

* **Update**: [core/commercials/magic-method.md](/core/commercials/magic-method.md)
  gains a "Typical Signature" section: the technique usually shows up as
  more clicks on the partner (the bait price draws them) together with a
  lower CR (users find the price does not hold and do not book). The
  closing hint now points at that pattern.

* **Add**: Gross Margin in [data/metrics.md](/data/metrics.md) — Gross
  Profit over revenue, as a percentage, the KPI market GM targets are set
  in. Aggregated as a ratio of sums, never as an average of margins;
  changes read in percentage points. Routed from
  [data/index.md](/data/index.md); implemented as `grossMarginProRata` in
  the semantic layer.

## 2026-10-15

* **Update**: marketing's hand-declared operations moved from the repo's
  YAML files to a shared sheet the marketing team fills in, imported as a
  new source, `manual-marketing`.
  [data/operation-log-classification.md](/data/operation-log-classification.md)
  now says a hand-declared source is any source starting with `manual`, not
  `manual` alone, and
  [core/marketing/levers.md](/core/marketing/levers.md) names the new source
  for Criteo campaign switches and how such a row is shaped: the campaign
  family in `entity`, the single campaign in the summary when only one was
  touched. *Why a sheet:* the people performing these operations don't work
  in git, and a log nobody fills in is worth nothing.

* **Update**: [core/marketing/sem/goals.md](/core/marketing/sem/goals.md)
  said both perimeters are split by the lastClickNotDirect Country Cluster
  and that NORDICS has no goal. Checked against the `actual` Sundays of the
  goal files: up to week 38 SEM followed the campaign's target market and
  ALL the session's market; from week 39 both follow the session's market
  (country and language), which differs from the Country Cluster on paid
  traffic (on 2026-10-11, CA-EN SEM cost was 1,349 EUR in the file and
  1,232 on the Country Cluster). NORDICS has its own goal from week 41,
  taken out of RoW. The sem-goals dashboard compares on the Country Cluster
  from 2026-10-15. The query-level detail, including the country and
  language key the recent files use, is in `skills/jc_sem_goals_skill`.

* **Update**: [core/business/initiatives.md](/core/business/initiatives.md)
  now carries the metric, baseline and target of each initiative — the
  pass the 2026-09-21 creation deferred. The format is one small table per
  initiative, with a few rules worth knowing when reading it:

  - **Split metrics get one row per segment.** INIT-949 is measured on
    STR × CTR × CR in CPA-dominant markets and on STR × CTR in CPC-dominant
    ones, which is the problem the first version flagged: there is no single
    number for it. The market split is linked to `markets.md`, not repeated.
  - **"not set" is a real value.** Several baselines were not fixed when the
    plan was made; the cell says so rather than being filled from ClickHouse
    after the fact, which would turn a plan figure into a measurement.
  - **No metric is stated as such, with the reason.** IDEA-1081 (too early
    to define) and INIT-944 (business-as-usual platform work) have none;
    INIT-948's metric is a delivery count an agent cannot evaluate from data.
    Saying so keeps an agent from treating the gap as an omission.

  Baselines and targets are the one place the bundle holds figures, as an
  exception to keeping measurements out of it: they are commitments fixed
  at plan time, not snapshots that go stale.

  INIT-955's metric, **CB2J revenue**, had no definition anywhere, so it is
  defined in the file in business terms (returning users from Brand/Branded
  paid campaigns or non-paid sources, plus Marketing-Driven sessions, under
  the userbased model), and its condition went into the semantic layer as
  the `come_back_to_jetcost` segment, linked both ways.

## 2026-10-14

* **Update**: [config/features/detail-card.md](/config/features/detail-card.md)
  pointed to [core/product/detail-page.md](/core/product/detail-page.md)
  for "its configuration by market/placement/platform", which that file
  stopped listing on 2026-10-13. It now points there for the rationale
  only, and to the flag's live state and operation-log history for
  where it is on and when that changed.
* **New**: [core/product/seo-pages.md](/core/product/seo-pages.md) — SEO
  pages as a product surface shared by organic acquisition and SEM
  landing traffic, and the legal rule that the cached prices they show
  must never be older than 15 days. Placed under product rather than
  organic because the same pages are the landing of several SEM
  campaign types; [core/marketing/organic.md](/core/marketing/organic.md)
  and [core/marketing/sem/index.md](/core/marketing/sem/index.md) point
  to it.
* **New**: [core/commercials/magic-method.md](/core/commercials/magic-method.md)
  — the "magic method": some OTAs return a lower price valid only with
  an outdated payment method nobody uses, to take the top position on
  price, at the cost of a higher decay along the funnel. No standard
  industry name was found, so the internal one is kept with a plain
  definition.
* **Update**: [core/commercials/cpa-model.md](/core/commercials/cpa-model.md)
  — the min_cpc clause is computed per partner group × country (a few
  deals also per device), so the produced-vs-floor comparison must be
  made at that grain: aggregating wider nets binding cells against
  non-binding ones. [core/business/deal-types.md](/core/business/deal-types.md)
  now points to it.
* **Update**: [core/business/markets.md](/core/business/markets.md) — KR
  is a web-only market: no app, for cost/benefit reasons, so its app
  traffic is absent by design.
* **Update**: [data/metrics.md](/data/metrics.md) — `revenue` was
  described as "actual, reported" revenue, clashing with
  [data/revenue-fields.md](/data/revenue-fields.md), where "Actual Revenue"
  is the billing/invoicing figure outside ClickHouse. It is now described
  as Current revenue, with an explicit pointer that it is not Actual
  Revenue. Same day, follow-up:
  [data/revenue-fields.md](/data/revenue-fields.md) said the funnel-level
  `revenue` was `SUM(revenueCurrent)` over clicks, while metrics.md (and
  the code) made it the whole-business pro-rata total. The section now
  lists its five legs and which make up Full Core, and states that
  `SUM(revenueCurrent)` over clicks is a narrower figure (Core + MAL as
  bids) with its own perimeter per grain; metrics.md names
  `revenueCurrentProRataTotal` and Full Core explicitly.
* **Update**: [log.md](/log.md) — the two older entries that linked to the
  deleted `core/product/w2a/install-clusters.md` (its creation and its
  2026-09-24 update) now name it as plain text, so the history no longer
  carries broken links.

## 2026-10-13

* **Update**: [core/product/detail-page.md](/core/product/detail-page.md)
  no longer lists the markets where the detail page is on. Which markets
  have it is configuration, so the page now points to the two flags that
  control it ([config/features/detail-card.md](/config/features/detail-card.md)
  on web, [config/features/mobile-app-detail-page.md](/config/features/mobile-app-detail-page.md)
  on app): their live state for the current setup, their history in the
  operation logs for when it changed. The principle stays: the choice is
  taken per market × platform.
* **Deletion**: `core/product/w2a/install-clusters.md`. It described a
  dimension not available on the datamarts and had drifted from
  [data/query-caveats.md](/data/query-caveats.md) on app-install campaign
  cost. Links in [core/product/metrics.md](/core/product/metrics.md),
  [core/product/w2a/index.md](/core/product/w2a/index.md),
  [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md),
  [data/consents.md](/data/consents.md) and [data/index.md](/data/index.md)
  were removed or reworded.
* **Addition**: [core/product/w2a/index.md](/core/product/w2a/index.md)
  says how to tell which W2A tool produced an app session: from its
  product campaign (`sessionContent` and its registry taxonomy), never
  from the dynamic link name, which is a feature configuration value,
  unclassified and missing on a large share of W2A sessions.
* **Update**: [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md)
  states that a device ROAS is read on desktop vs mobile + app, never
  mobile alone: a mobile ad click often turns into revenue on an app
  session (W2A, `/oia/`), which Google counts as mobile.
  [core/marketing/sem/levers.md](/core/marketing/sem/levers.md) and
  [data/dimensions.md](/data/dimensions.md) point to it.
* **Update**: [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md)
  says the Search conversion goal includes the app-install signals as
  well as clickouts: under tCPA an install is worth one conversion, like
  a clickout, a deliberate choice driven by W2A. Google's conversions and
  CPA on Search campaigns are therefore not a cost per clickout. The
  goal's account label was removed: it is configuration and can change.
* **Update**: [data/revenue-fields.md](/data/revenue-fields.md) separates
  how missing partner data reaches `revenueCurrent` by channel. The eCPC
  fallback applies only to booking-report-file partners, and only on
  whether the file arrived; Conversion-API partners
  (`groupConversionApiEnabled`) never get it, so a partial feed leaves
  `revenueCurrent` silently understated. Also documents recovery: a
  click-based report is reimported as is, an aggregated one is applied
  pro-rata without restoring bookings.
  [core/commercials/partner-lifecycle.md](/core/commercials/partner-lifecycle.md)
  points to it.
* **Creation**: [core/product/traffic-control.md](/core/product/traffic-control.md),
  what a traffic control (holdout) is, how it differs from an A/B test,
  how controlled sessions are recorded on `trafficControlMap`, and what
  each code is for (`SORTING-EXPLORATION`, `W2A-BLOCKING-ELEMENT`,
  `TC-DEBUG`). Linked from [core/product/abtests.md](/core/product/abtests.md),
  [core/product/sorting.md](/core/product/sorting.md),
  [core/product/w2a/index.md](/core/product/w2a/index.md) and
  [core/product/index.md](/core/product/index.md).

## 2026-10-12

* **Creation**: [core/marketing/levers.md](/core/marketing/levers.md),
  the marketing levers that are the same on every platform, starting
  with `campaign-status-change`. The lever moved out of
  [core/marketing/sem/levers.md](/core/marketing/sem/levers.md), which
  now extends the new file and keeps only the SEM-only levers. Why: a
  lever is the business act, not the platform. Criteo remarketing
  switch-ons are declared by hand under the same value as a Google Ads
  campaign enable, and leaving the lever in the SEM file would have
  presented them as SEM operations. The platform is read from the row's
  `source` and `entity`. Links in
  [core/commercials/levers.md](/core/commercials/levers.md),
  [data/operation-log-classification.md](/data/operation-log-classification.md)
  and [core/marketing/index.md](/core/marketing/index.md) were updated to
  match.
* **Update**: [data/query-caveats.md](/data/query-caveats.md) completes
  the OIA case. Clicks, impressions and conversions pro-rata follow the
  same web/app split as the cost, so `conversionsProRataGAds` on OIA app
  sessions is an allocation, not what Google measured in the app. The
  traffic and overall datamarts now split OIA Google Ads cost, clicks
  and impressions the same way, while keeping Google's own web/app
  attribution for conversions: the sGTM app conversions there had been
  labelled web desktop from 2025-08-17 until the October 2026 fix.

* **Update**: [core/commercials/cpa-fallback.md](/core/commercials/cpa-fallback.md)
  says the click flag `isFallback` is web only: it is not tracked on
  app, so it reads NULL on every app click. The fallback itself does run
  on app (`displayedItinerariesFallback` is populated on app searches),
  so app fallback clicks cannot be separated from regular CPA clicks,
  and filtering on `isFallback` being false drops every app click.
  Raised by a context-feedback report on a US app CPA read.

## 2026-10-09

* **Addition**: [core/tech/levers.md](/core/tech/levers.md) documents
  `waf-rule-change`, the first tech value beyond `release`: a write to a
  Cloudflare zone's WAF rules (custom, rate limiting or managed), now
  imported into operation logs as the `cloudflare-waf` source, coverage
  from 2026-09-01. One row per zone, since most rules are applied to every
  Jetcost domain at once; no country, since a zone is a domain rather than
  a market. Its "Not yet tracked" section now names what is still missing
  (DNS, cache purges, non-WAF Cloudflare rules), and
  [core/tech/index.md](/core/tech/index.md) no longer lists firewall rules
  as untracked.

## 2026-10-06

* **Update**: [core/martech/levers.md](/core/martech/levers.md) lists
  the veriflights GTM container (`GTM-WCFLT69H`, `entity` `VERIFLIGHTS`),
  now tracked as a `tag-release` source alongside the three jetcost
  ones, and says which business profile each container serves. The
  profile also travels in each row's `metadata`
  (`container.businessProfile`), so GTM publishes can be scoped to one
  profile.

* **Update**: OIA campaigns' Google Ads cost now reaches app sessions.
  [data/query-caveats.md](/data/query-caveats.md) described the OIA
  zero as a distortion: the cost of a campaign whose ads open the app
  was allocated across its web sessions only, so web carried the cost
  of acquisitions that landed in app. From the October 2026
  restatement, back to 2023-01, that cost is shared between the
  campaign's web and app sessions with the same cost per session. App
  takes 3-5% of OIA Google Ads cost from 2023-07, under 1% before.
  The W2A "correct zero" now has an exception: W2A app sessions of an
  OIA campaign share its cost too, a quarter of the OIA app cost in
  2026 and 40-50% in 2023-2025.
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md) no
  longer says app reads exactly `0` until 2026-09-07. SA360 (Bing)
  OIA app sessions keep reading `0`; they are negligible.

* **Addition**: [core/marketing/crm.md](/core/marketing/crm.md) now says
  how CRM traffic is identified in session data: channel group `crm`,
  then the source per channel (`wpn`, `apn`, `newsletter`), and where
  each channel keeps its campaign type. WPN's Remarketing / Generic /
  Sleepy types are readable from Campaign Type, not from the medium,
  which is `crm` on virtually all WPN traffic — reading the medium is
  what made them look indistinguishable. APN keeps its campaign family
  in the medium instead.

* **Addition**: [data/dimensions.md](/data/dimensions.md) gains a Macro
  Area section. `macroArea` (English speaking / Europe / Rest of the
  World) is the business lens markets are read through, and
  `businessView` is its variant with the six main markets split out;
  `region` is a geographic grouping by continent, not the same thing.
  Until now only `region` was documented, as the "macro-area grouping",
  so a request for "macro area" resolved to the wrong column.

* **Creation**: added
  [core/marketing/traffic-taxonomy.md](/core/marketing/traffic-taxonomy.md)
  — how marketing clusters traffic: not-campaign vs campaign by the
  registry's technical flag, campaign into paid and not paid, paid into
  SEM (`paid-search`) and Not SEM. "Non-SEM" was defined only as a cost
  bucket, and the buckets are cut by buying platform, not by kind of
  traffic: Google Ads display is Not SEM traffic whose cost sits in GAds,
  so GAds + Ds is not SEM cost. The new file states that and says to cost
  any branch by slicing marketing cost by its rule.
  [core/marketing/other-channels.md](/core/marketing/other-channels.md),
  a stub until now, describes the Not SEM branch: the `display`,
  `checkbox` and `llm` channel groups, their sources and the cost bucket
  of each, including the checkbox group's split between Jetcost's own
  `mal` inflow and third-party inbound (BookingBuddy, MediaAlpha,
  FareCompare, Turismocity), which no marketing file described. Pointers
  added from [core/marketing/index.md](/core/marketing/index.md),
  [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md),
  [core/marketing/sem/goals.md](/core/marketing/sem/goals.md),
  [data/dimensions.md](/data/dimensions.md) and
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md), which no
  longer calls the Ds/NotSem buckets unnamed.

* **Pointer**: [config/features/index.md](/config/features/index.md)
  now says where the *current* value of each flag lives — the live
  feature state served by the catalog-features service — next to the
  existing pointer to the feature-logs operation logs for its history.
  The feature files keep describing what a flag can do; this makes
  explicit that what it is set to is read from that state, never
  inferred from them, so the three pillars (meaning, change history,
  current state) can be crossed on the same feature code.

## 2026-10-01

* **Fix**: three statements the data contradicts, found while
  re-checking the 2026-09-04 semantic layer audit.
  [data/revenue-fields.md](/data/revenue-fields.md) listed the inline
  unit among the MAL Media placements with no search behind them. It is
  the one that has a search: 99% of inline clicks carry the search's
  fields, like MAL Core, against 0% of exit-unit clicks, and the
  searches datamart's MAL Media count matches the inline clicks month
  by month. So MAL Media on searches is the inline unit, not "nearly
  nothing", and MAL there is MAL Core plus the inline unit.
  [core/commercials/mal/self-trailingtab.md](/core/commercials/mal/self-trailingtab.md)
  said `sessionCampaignSource = 'mal'` isolates the self trailing tab.
  Its campaigns only start on 2025-07-16; before that the source holds
  `exitunit-form` and `checkboxes` campaigns, and the checkboxes are a
  different unit. The source still separates Jetcost's own inflow from
  the third-party traffic in the `checkbox` channel group, which was
  about a quarter of that bucket in 2023-2024.
  [core/commercials/integration-types.md](/core/commercials/integration-types.md)
  presented a missing `businessModel` as a backfill trait. It is the
  field's 2024-06-12 floor: backfill is empty before it and populated
  after it, exactly like every other Core click. `SKYSCANNER` is now
  marked as a backfill source only up to 2024-01.

* **Creation**: added [core/marketing/sem/goals.md](/core/marketing/sem/goals.md)
  — the weekly SEM goals marketing sets by day and country cluster, now
  loaded into ClickHouse one file per week. It defines the two perimeters
  every goal carries (SEM, the lastClickNotDirect paid-search traffic; ALL,
  every channel of the cluster), notes that a file mixes real targets with
  actuals, forecasts and carried-over plans, and that revenue in a goal is
  read at build time and revised afterwards, so a gap against today's
  revenue is not all performance. How to query the table lives in the new
  `skills/jc_sem_goals_skill`, which this file points to. Indexed in
  [core/marketing/sem/index.md](/core/marketing/sem/index.md).

## 2026-09-29

* **Addition**: commercial deal changes are now an operation-log lever.
  `commercial-logs` also reads admin3's commission-rule log, and each
  record (business model, value, min CPC floor and CPA% thresholds for a
  partner in a market/device/context) lands as `CHANGED_DEAL` /
  `deal-change`. The lever is documented in
  [core/commercials/levers.md](/core/commercials/levers.md). Until now the
  commercials taxonomy only covered *whether* and *to whom* a partner is
  shown, not what it pays, so a rate revision behind a shift in revenue per
  click had no trace in the logs.

  Two reading rules are worth knowing. admin3 doesn't send the rule being
  replaced, so a row is the new deal and never a before → after. The row's
  date is the day the deal takes effect, not the day it was entered, which
  makes it the right day to compare revenue against.

## 2026-09-28

* **Update**: the Country Cluster now covers non-campaign traffic.
  Virtual campaigns (direct, referral, organic, not-found) carry a
  *technical* flag in the campaign registry, set in backoffice, and the
  cluster reads the session's market for them instead of their
  `undefined` target (jetcost-bi task 86cbam9e2). RoW drops from about
  75% of sessions to about 11%, and what is left in it is markets no
  cluster names, including Venezuela, Uruguay and Bolivia, which LATAM
  does not include.
  [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md)
  explains which locale feeds the cluster and replaces the "read it on
  paid only" advice, and says that the technical flag, not the `vrt`
  prefix, is what marks a virtual campaign.
  [core/business/markets.md](/core/business/markets.md) notes that the
  cluster follows the campaign target only on real campaigns.

## 2026-09-25

* **Removal**: the Country Cluster dimension loses its `sessionContent*`
  field. `sessionContentCountryCluster` was removed from
  `datamart.jc_sessions_datamart_view` in jetcost-bi (task 86cbam9e2), so
  [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md)
  now lists three attribution scopes, the same three the rest of that file
  documents. The semantic layer skill drops it from `sessions` and from the
  `not_inherited_dimensions` of searches, clicks and impressions.

## 2026-09-24

* **Update**: `core/product/w2a/install-clusters.md`
  now says that **Unknown** takes every Unidentified install. The
  dashboards that compute the cluster did not know the new origin type
  and would have sent all of them to Direct; they now match the
  definition that was already written here. The campaign on those
  installs is the app's own, so they never enter W2A · Paid or Organic,
  and not App Campaign · Paid either, although about 30% of them carry
  a paid app-install campaign.

* **Update**: the web-to-app handoff has a fourth origin type,
  **Unidentified**. Since 2026-09-02 some Android installs arrive with
  the code of the web tool that sent the user to the app, but with
  neither the web identifiers nor the anonymous key. They used to read
  as "no web origin"; the data now marks them as web, with nothing else
  known. [data/consents.md](/data/consents.md) lists the new type and
  says it is not a consent outcome. It also says that before that date
  the same installs carried no code at all, so W2A series crossing it
  gain visibility, not volume, and that the `fromWeb*` metrics miss
  these openings too.

  [data/attribution.md](/data/attribution.md) described the
  **Unconsented** bucket as "consent can't be resolved". It now takes
  Unidentified sessions too, so it is re-read as "W2A not resolvable".
  It also states what the bundle never said: once a user's first
  install is unresolvable, every later app session of that user lands
  in the bucket, paid ones included.

## 2026-09-23

* **Addition**: the W2A blocking page is now documented end to end.
  [config/features/flights-web-to-app-blocking-element.md](/config/features/flights-web-to-app-blocking-element.md)
  was a stub with a TODO on every config; each one now states its type,
  default and effect. The logic that combines them went to
  [core/product/w2a/blocking-page.md](/core/product/w2a/blocking-page.md),
  whose Details section was still "to be documented".

  The core file now describes two mutually exclusive modes. **Search-count
  mode** blocks beyond a search limit, with a bold (no way out) or light
  (closable, once every 24 hours) page. **Booking-window mode** ignores the
  count and blocks only new paid users, by days to departure, with
  thresholds and page choice fixed in code. The distinction matters when
  reading the flag's history: while booking-window mode is on, the search
  limit, session-based, light-version and app link configs have no effect,
  so their values say nothing about how users were blocked. The old "How It
  Works" said the user could always dismiss the prompt, which is true only
  of the light version, and has been corrected.

## 2026-09-22

* **Addition**: two SEM levers that had no `internal_event_type` and were
  landing as `unknown` — `cpc-ceiling-adjustment` (the CPC bid ceiling) and
  `bid-objective-change` (a campaign moving between tCPA and tROAS) — are now
  classified and documented in
  [core/marketing/sem/levers.md](/core/marketing/sem/levers.md). Reported
  through `jc-context-feedback-skill` from a timeline that had gone quiet on
  exactly the days it should have been loudest.

  The second one also corrects something the bundle stated too broadly.
  `bidding-strategy-change` reads as "the campaign changed how it bids" and
  does not mean that: Google names the strategy-assignment fields only when a
  campaign is attached to a shared portfolio strategy, and names only the
  target fields when a campaign swaps its own objective in place. So an inline
  swap never reaches that value, and a count taken on it alone can return
  nothing over a window in which objectives moved across whole account fleets.
  That is now said in both files.

  The ceiling lever carries a reading warning rather than a direction. Removing
  a ceiling loosens the price, but the same intervention can fit brakes
  elsewhere in the same minutes — a budget cut, a device modifier cut — so a
  timeline filtered to this lever alone can read the sign of an intervention
  backwards. The observed case that prompted the warning did exactly that.

  [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md) gains
  **Maximise Clicks**, which the bundle had never described although part of
  the fleet runs on it. It is the strategy that makes the ceiling matter: with
  no target to price against, the ceiling is the only bound on what a click may
  cost. *Still missing, and needs marketing:* which campaigns are put on it and
  why one leaves it.

* **Clarification**: [data/query-caveats.md](/data/query-caveats.md)'s Trap 2
  and the "Not-found virtual campaigns" section of
  [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md) both
  said a growing not-found bucket is an attribution defect to report, with no
  exception. There is one, and it is routine: the campaign registry is filled
  by hand, so a campaign activated on Google Ads before its entry exists has
  nothing to resolve against and its spend sits in the not-found bucket until
  someone creates the entry. Reported from a live case on the `veriflights`
  business profile, where a whole new campaign set spent a full day unonboarded
  and every euro of it read as not-found.

  Two things the previous text made it impossible to get right. First, this is
  not a lag: nothing couples the two actions, so the residual is zero when the
  registry entry comes first and open-ended when it doesn't — there is no
  interval to wait out, and a reader told to "allow a day" would be wrong in
  both directions. Second, the spend is never reattributed once the entry
  appears, because the campaign value is resolved when the row is built. A
  window containing those days stays short by that amount permanently, so this
  is not a delay that settles — which is precisely what makes it worth writing
  down rather than leaving for each reader to rediscover.

  The distinguishing test is stated in the caveat: an isolated not-found spike
  followed the next day by campaigns that weren't there before is a launch that
  ran ahead of its registry entry, not a defect. It is still unattributable
  spend, so the text says the fix belongs upstream — register, then activate —
  rather than presenting it as a reading convention to absorb.

* **Content**: [core/media/data-monetization.md](/core/media/data-monetization.md)
  now records that Data Monetisation revenue is uploaded by hand by the media
  team, with no direct ingestion from the data partner. The file described the
  stream as active but said nothing about how the figures arrive, so a period
  reading zero was indistinguishable from a period in which the stream earned
  nothing — and the data has read zero from 2026-05 onward while the stream is
  in fact running. Without this, the natural inference from the numbers is that
  the stream ended.

  The amounts are small — under 1% of whole-business revenue per month while it
  was being loaded — so what this removes is not a mis-stated total but a wrong
  conclusion about the stream's status, and any trend built across a gap.

## 2026-09-21

* **Creation**: Added [core/martech/](/core/martech/index.md) — a new core
  function, with [core/martech/levers.md](/core/martech/levers.md) documenting
  its single lever, `tag-release`: a Google Tag Manager container published to
  production. Operation logs gained a `gtm` source the same day
  (`agents/import-operation-logs/importers/gtm.js`, coverage from 2026-09-01),
  and a department's levers file is where its `internal_event_type` values are
  defined, so the function had to exist in the bundle for the source to be
  readable at all.

  **Martech is its own function, not a corner of tech.** Both release things,
  and the temptation was to fold container publishes into `tech`'s existing
  `release`. They were kept apart because a code release ships the application
  while a container publish ships the *measurement* of it: different authors,
  different review path, different failure mode. The practical consequence is
  that a query for one never silently returns the other — which matters
  precisely in the investigation these rows exist for, a measured quantity that
  moved while the business didn't. `tech/levers.md` now says explicitly that
  `release` is code only, and points here.

  **Three containers, one of them the only active one.** `WEB`, `WGTM` and
  `SGTM` are documented with their scope because `entity` carries the short
  label and nothing else identifies which surface was published; `WGTM` and
  `SGTM` have not published since June 2026, so their silence is a fact about
  those containers, not a gap in the source.

  **Two limits of GTM's API are written into the file rather than left to be
  rediscovered**: the timestamp is the version's creation (publishing is what
  creates a version in the normal flow, so they coincide), and a version
  created but never published is indistinguishable from a published one once
  superseded. Both shape how a `tag-release` row should be read in an
  investigation.

* **Creation**: Added [core/business/initiatives.md](/core/business/initiatives.md)
  — the nine macro activities the company is running through the end of 2026,
  grouped into the five strategic pillars (Boost Productivity with AI,
  Monetization, Retention & Organic, Exploration, Scalability), each with its
  Jira code, current name and scope. This is the first plan-level content in
  the bundle: until now `core/business/` described what the business *is*, not
  what it has committed to do, which left an agent unable to tell whether a
  change it observes belongs to a deliberate programme or is noise.

  It sits in `core/business/` rather than in a function folder because the
  initiatives are cross-functional by construction — Tailored Jetcost alone
  spans product, commercial and media — and in a single file rather than a
  subfolder, since the bundle reserves a subfolder for a named initiative that
  has *several* documents of its own. When one grows that far it gets its own
  folder under the owning function, and this file links to it.

  **Codes, not names, are the handle.** Five of the nine were renamed during
  planning and several rescoped at the same time, so the file carries a
  previous-name table: the earlier names are still in Jira history and Slack
  threads, and a reader who only knows "Instant Configuration" needs to land on
  Tailored Jetcost. Noted for the same reason that `IDEA-1081`'s prefix is an
  artefact of where the ticket was created, not a lesser status — an agent
  reading the code would otherwise infer a distinction that does not exist.

  **Metrics, baselines and targets are deliberately out of this first
  version.** Each initiative has one, but several of the cells as planned do
  not stand on their own — INIT-949's metric changes with the market's deal
  type (CPA markets track through CR, CPC markets stop at CTR), so no single
  baseline exists for it — and a target is only useful here once it is stated
  in a form an agent can actually evaluate. They come in a later pass.

## 2026-09-18

* **Correction**: [data/pro-rata-allocation.md](/data/pro-rata-allocation.md)
  described only one form of an unsettled allocation — the slice with no rate,
  which reads as an exact zero. There is a second one, and it is MAL-only: on
  the most recent day the `revenueCurrentProRataMal*` columns carry the
  *previous* day's allocation, because the MAL network revenue report lands a
  day late. It is the more dangerous of the two, because a repeated figure is
  non-zero, plausible and decomposes into its Core and Media legs correctly —
  what gives it away is being identical to the cent to the day before at
  country grain while that slice's sessions have moved. Verified on 2026-09-18
  across every market with material traffic, and against 25 days of history, in
  which no pair of already-settled consecutive days behaves this way.

  Added the operational half to
  [data/query-caveats.md](/data/query-caveats.md) next to the CPA lag, since
  that file is where a reader looks for what not to trust on a recent day. The
  guidance is deliberately **not** to exclude the day: the figure is stale, not
  missing — overstated when traffic fell, understated when it grew — so it is
  read as provisional and corroborated against a non-allocated signal, the same
  treatment the zero form already gets. Core revenue, marketing cost and the
  GAM / Media / AFS allocations do not carry this.

  Prompted by a context-feedback report that proposed the opposite remedy —
  excluding D-1 from Full Core and ROAS Full Core — on evidence that did not
  reproduce (it described the MAL figure as an exact `0.00`, which is the other
  form, already documented). The repetition is what actually happens.

* **New concept**: [core/product/abtests.md](/core/product/abtests.md) says
  what an A/B test is at Jetcost — that we run them, that a test's perimeter
  is a set of website/country/language/device rules rather than a market
  list, and that the sessions exposed to one can be segmented in the data
  (`abTestId`). The bundle already documented A/B tests as *events* —
  [core/product/levers.md](/core/product/levers.md) carries
  `enable-abtest`, `disable-abtest` and `update-abtest-rules` — but nothing
  said what the events were about, so a reader found the verb and not the
  subject. The file deliberately stops short of experiment design and how a
  result is judged: that is not knowledge this bundle needs to hold.

  **The load-bearing part is that a test's active window is not
  continuous.** A test is switched on, off, on again and rescoped while
  live, so a test's slice is empty for the days it was off and partial for
  the days it was switched part-way through. Both read as a broken data
  load and neither is one. This was written after a monitoring project
  reported a stalled backfill on the sessions datamart for 2026-09-16: the
  day was complete and normal, while the test it was watching had actually
  been off from 2026-09-10 to 2026-09-14 — a gap the check never looked at
  because nothing told it a gap was possible.

* **New caveat**: [data/query-caveats.md](/data/query-caveats.md) gains the
  query-side half of the same trap — zero-row days, partial edge days, and
  the rule that closes it: read a test slice as a share of the same
  perimeter queried without the test filter, never in absolute terms, since
  a slice's volume moves with total traffic. The concept file owns what a
  test is; this owns how to avoid misreading one.

## 2026-09-17

* **New operation-log source**: feature-flag configuration changes are now
  imported from admin3 as `source: feature-logs`, and
  [core/product/levers.md](/core/product/levers.md) gains the lever that
  identifies them, `update-feature-config`. Until now the bundle documented
  what every feature flag *can* do — one file per feature under
  [config/features/index.md](/config/features/index.md) — with no record
  anywhere of when one was actually changed; a feature going live was
  invisible next to the releases, budget moves and A/B tests it sat beside
  in the same timeline. `entity` is the feature code, which is also the name
  of that feature's own file, so a change and its documentation are one
  lookup apart.

  **One lever, not two, and one field, not two.** admin3 separates activating
  a profile (behaviour changes on site) from editing the profiles and rules
  behind it, and the first version of this split them into two levers. They
  were merged because they are the same business act and, in the records
  observed, an edit is routinely the first half of an activation made minutes
  later. A row likewise carries only the author's own note about the change,
  not admin3's field-level change lines: those are internal object churn
  (dozens of `RuleItem ... created` lines for one operation) that would be
  mirrored into the timeline without adding anything a reader couldn't get
  from admin3 itself. So these rows answer *which feature was touched, and
  when* — and, as far as the note's author bothered to say, why.

  **The source exposes no market scope**, so every one of these rows carries
  `country: ALL` — which here says nothing about the change, it is only what
  the column gets when there is nothing to put in it. A change restricted to
  two markets is indistinguishable from a global one, and the country codes
  that show up in the author's free-text note are prose, not data.
  Whether admin3 can export the real scope is open with tech; if it ever
  does, this becomes a per-country fan-out like `abtest-logs`. Written down
  in both [core/product/levers.md](/core/product/levers.md) and the
  operation-logs skill, because `ALL` now means one thing on `gads` and
  `abtest-logs` and a different one here.

## 2026-09-16

* **New lever + correction**: [core/marketing/sem/levers.md](/core/marketing/sem/levers.md)
  gains `troas-adjustment`. Marketing has moved part of the campaign fleet from
  tCPA to Target ROAS; the operation logs already held 55 such changes, all
  falling into `unknown` because no lever named them. tCPA and tROAS are
  alternative objectives, not complements — a campaign runs on one or the other
  — so it is a lever of its own rather than a variant of `tcpa-adjustment`.

  The same file was wrong about where a tCPA target lives. It said the lever is
  "set at the bidding-strategy level, not per campaign", which describes the
  portfolio case as the norm; in the data every one of the 2540 recorded tCPA
  changes is the opposite case, set inline on the campaign. Rewritten to state
  that the target's home depends on the campaign's bid strategy, and — the part
  that matters for anyone counting — that changes made on a shared portfolio
  strategy are **not recorded at all**, because Google's Change History does not
  expose that resource. A count of `tcpa-adjustment` is campaign-level tCPA
  activity, not the lever's full activity. The mechanism behind the gap is
  documented in the jetagents repo, next to the importer it constrains.

* **Correction**: [core/product/detail-page.md](/core/product/detail-page.md)'s
  Clickout Mode table was wrong on both its rows. It said the app had a detail
  page "for a period, then removed" — contradicting
  [config/features/mobile-app-detail-page.md](/config/features/mobile-app-detail-page.md),
  which documents a live feature with layout and visible-offer levers — and it
  treated the English-speaking markets as one block without a detail page. The
  actual position, from the domain owner: **app has it everywhere except the US
  and Canada; web the same plus the UK**, so web is off in the US, Canada and the
  UK. The UK is now called out, because it is the case that shows the unit of the
  decision: the same market runs with a detail page on app and without one on
  web, so the choice is per **market × platform**, and a UK web-vs-app split is
  not a clean read of platform behaviour — added to the comparability caveat.

  The first attempt at this fix deleted the deployment position outright, on the
  reading that it was live state. That was wrong, and the bundle's own test says
  so: a row that is still true with the datamarts switched off is inventory, not
  a measurement. Where the detail page is deployed is a commercial decision
  somebody took, it moves only when somebody moves it, and — per the 2026-08-13
  entry — no automatic CPA/CPC rule derives it, so leaving it out simply loses
  it. The "no deployment sections" rule applies to feature files, the mechanical
  levers, not to the `core/` concept that owns the reasoning. What the file no
  longer claims is to be the place a change is *dated*: that is the flag's own
  history, and the file says so.

* **Content**: [core/commercials/integration-types.md](/core/commercials/integration-types.md)
  and [core/commercials/mal/networks.md](/core/commercials/mal/networks.md) read as
  if they contradicted each other on the inline and checkbox units — one calling
  them "external networks only" with no registry identity, the other saying
  `mdflow` supplies ~50% of MAL Media clicks and that `networkPartner` is
  populated on all placements, "inline and checkbox included". Both halves of
  that were the same mistake: the bundle was recording *measurements*. Which
  network fills which placement, how much each one brings, how many buyers it
  has — all of it is a serving mix that moves by the month, and ClickHouse
  answers it exactly, so a figure written here is stale on arrival and can
  contradict its neighbour. Both files now keep only what a query cannot give
  back: the invariant that on MAL registry identity is present exactly when
  `network = 'mdflow'`, on every placement alike; the roster of live networks
  and what each one *is*; the three roles the name "Kayak" can hold at once and
  the field that selects each. Removed: the per-unit external/internal claims
  (the three MAL Media rows collapse into one), the distinct-buyer counts, the
  click and revenue figures on the Kayak roles, the month-over-month network
  volumes, the ~50%/~69% shares and the raw-vs-normalised buyer counts. Where a
  number was carrying a warning, the warning is now stated as a warning — e.g.
  Kayak's three roles must be sized separately and their click and revenue
  rankings will disagree.

* **Content**: [data/consents.md](/data/consents.md) now says where the values
  actually come from — nothing reads Iubenda directly. The consent state is
  taken from an **internal table that proxies Iubenda**, kept in sync through
  Iubenda's own **JavaScript hooks**, which fire client-side as the user
  expresses a preference. Everything downstream, datamarts included, reads that
  copy rather than the vendor. Worth stating because it changes what a wrong-
  looking consent figure means: the user's choice is made at the banner, what we
  can query is a mirror of it, and the link between the two is browser-side.

* **Content**: [core/marketing/crm.md](/core/marketing/crm.md) named no consent
  anywhere, while nearly every audience in its two push tables is defined as
  "users who accepted push" / "push enabled". That consent is `wapn`, and it is
  **one consent for web and app**, so WPN and APN reach are two reads of a single
  permission rather than two independent opt-in bases — which the file's layout
  (one channel section each) quietly suggested otherwise. Linked to the new
  concept, with the point that an unrecorded consent is not a refusal: for CRM
  that is the difference between an audience nobody has asked yet and one already
  lost.

* **Content**: new [data/consents.md](/data/consents.md) — the bundle had no
  concept for consents at all, while seven consent columns have been sitting on
  every funnel datamart since 2024-05-12 and the `userbased` model's
  **Unconsented** bucket was already being explained by something the bundle
  never defined. The page states the split that matters: four **GDPR** consents
  collected through **Iubenda** (`tech`, `mktg`, `dtra`, `meas`), the consent
  management platform behind the cookie banner, proxied in-house through a hook
  so the state lands on our own session record; and three collected **outside**
  Iubenda — `gloc` (geolocation, app), `strk` (system tracking, app) and `wapn`
  (push notifications, web and app alike). All seven are nonetheless spelled
  `iubenda*` in the datamarts, which is a naming artefact of the first four and
  reads as a claim about the last three that isn't true — stated explicitly
  because the column name is the only thing most readers will ever see.
  Three details worth having written down: `tech` is not a real choice (the
  portal can't run without it, and it is never recorded as refused, so it marks
  *whether* consent state exists rather than a preference); `strk` is the
  operating system's own prompt (iOS App Tracking Transparency, the Android
  advertising-ID equivalent), so we control when it is shown and not what it
  asks; and `wapn` is one consent covering both web and app, the only one of the
  three meaningful on a web-vs-app split. Sourced from Alberto.

* **Content**: `gloc` is documented as **forward-looking** — the consent exists
  in the model but is not being asked of users today. This came out of checking
  the column while writing the page: `iubendaGloc` is NULL on every row of every
  datamart since 2019, which reads as a tracking defect until you know nothing
  is meant to populate it. Confirmed by Alberto as intentional.

* **Correction**: the ClickHouse semantic layer described the same seven columns
  under a heading that attributed all of them to Iubenda, called `iubendaStrk`
  "strike consent", and typed them as `1/0/empty` strings when they are
  `Nullable(Bool)` — a filter written from that comment (`iubendaTech = '1'`)
  fails outright, and one written as `!= ''` throws a parse error. Rewritten,
  with the three-state trap made explicit: NULL means *nothing recorded*, not
  refused, so "refused" is `= false` and never `1 - granted`. The pre-2024-05-12
  coverage floor, `strk` being app-only, and `gloc` being permanently NULL are
  now caveats there rather than facts each reader rediscovers.

* **Content**: [config/features/iubenda.md](/config/features/iubenda.md),
  [config/features/web-push-notifications.md](/config/features/web-push-notifications.md)
  and [config/features/mobile-app-opt-in.md](/config/features/mobile-app-opt-in.md)
  lost their "describe what this feature does" placeholders and now link up to
  the new concept for the why, per the core-explains/config-is-a-lever rule.
  [data/attribution.md](/data/attribution.md)'s Unconsented bucket links to it
  too.

## 2026-09-15

* **Correction**: [data/dimensions.md](/data/dimensions.md) called its web-vs-app
  dimension **"Platform"** and mapped it to `context`. Everything it said about
  `context` was accurate, but the name was taken: `platform` is a real column, and
  it holds `web` / `ios` / `android`, not `web` / `app`. The failure mode is silent
  — an agent reading "Platform, values app/web" writes `platform = 'app'`, which
  matches no row, raises no error, and returns an empty result that reads as a
  legitimate zero. The dimension is now **Context — Web vs App** (field `context`),
  and **Platform — Operating System** (field `platform`) is documented next to it
  as the separate dimension it always was; the bundle previously had no way to say
  that iOS and Android can be told apart at all. The two are not independent:
  `platform = 'web'` is exactly `context = 'web'` and `platform IN ('ios','android')`
  is exactly `context = 'app'`, so Platform refines Context and crossing them gives
  a diagonal rather than a grid. A handful of app rows carry `platform = 'web'`,
  all with zero qualified sessions, so the equivalence is exact wherever it matters.
  The rename was propagated to the four other places that used "Platform" in the
  old sense — [data/index.md](/data/index.md), the file's own frontmatter,
  [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md) and
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md), where "safe by
  Platform" is now "safe by Context" and means what it always meant. Verified on
  `datamart.jc_sessions_datamart_view` over the last 7 days; the semantic layer
  already had both fields right, so this was drift between the bundle and the
  semantic layer, not a data question. Raised by Alberto, who spotted the
  values didn't match.

* **Verification**: the other claim in that section — `websiteType = 'app'` and
  `context = 'app'` are the same set — was re-checked row by row while fixing the
  above and is exact. Left unchanged.

* **Content**: [core/business/whitelabels.md](/core/business/whitelabels.md) now
  carries the **full white-label inventory** — every domain, with the host it runs
  on and the single country and language it is built for. The file described the
  layer's behaviour well and never said what was in it, so the only way to answer
  "which white labels do we have, and for which market?" was a query against the
  datamarts, which answers a different question: it returns the domains that took
  traffic in a window, not the ones that exist. Three facts came out of writing it
  down. Each white label serves **exactly one market and one language** — the
  mirror image of the core site, where one `website` value covers every market —
  so on white-label rows `website` and `country` are very nearly the same field
  and a breakdown by both is mostly zeroes. `fly-scanner` is the sole exception,
  one `website` value spread over eighteen locale paths in sixteen countries and
  seven languages, and therefore the only one that must be read sliced by country.
  And three of the domains are **car rental, not flights** — two of them record
  car searches and no flight searches at all, so their empty flight metrics are a
  property of the product, not a performance problem. Also recorded: the registry
  spells the UK market `GB` where the datamarts spell it `UK`, and a domain's TLD
  does not name its market (three French white labels are `.be`).

* **Content**: the long-tail caveat in the same file is now half-closed. Those
  roughly twenty near-dormant domains are real and registered — all of them are in
  the inventory, none is a junk value — so the unexplained part is only the uniform
  session count attached to them. Which is why "how many white labels do we have?"
  has two right answers: the table is how many exist, a traffic threshold is how
  many are alive.

* **Content**: [core/business/business-profiles.md](/core/business/business-profiles.md)
  said `veriflights` and `meta-spinner` are each a single site, without ever saying
  where those sites run. They are also each a single *market*: `veriflights.com` is
  Italy in Italian, `multi-destinations.com` is the United States in English. The two
  experiments therefore sit in different countries, so comparing them compares two
  markets as much as two ideas.

* **Convention**: inventory is not a measurement. The rule written the same day —
  no measured numbers in bundle content — was read as covering the white-label
  table, and does not: a domain exists because someone decided to launch it and
  configure it for a market, so it passes that rule's own test unchanged. What the
  domain earned last month remains a query. The distinction is now written into
  the bundle's authoring conventions, with the line to use when a table is
  ambiguous: if the row would still be true with the datamarts switched off, it is
  inventory.

* **New concept**: [core/product/travel-stories.md](/core/product/travel-stories.md).
  Travel Stories have been live in the app for years and appeared nowhere in the
  bundle as a product — the only account of them was the CRM production routine in
  [core/marketing/crm.md](/core/marketing/crm.md), which described how they are
  made every week but never what they are or what they are for. The concept now
  states the purpose the surface is actually defended on: it exists to supply
  intent, turning a user with no route in mind into a user who has just run a
  search, which is why a call to action carries a complete search — route, dates,
  passengers, price — instead of linking to the search form. It also carries the
  three-level content structure (profile, screen, per-country translation), the
  split that matters for reading the numbers — editorial screens cannot be
  clicked at all, so a text profile records zero clicks by construction and must
  never be ranked on click-through against a deal profile — and the fact that an
  impression is one screen rather than one profile opened, so impression volume
  tracks profile length as much as popularity. Last, it says plainly that there
  is no travel-story revenue and should not be one: the search a call to action
  starts is an ordinary app search downstream, so the surface is read on its own
  two events and its revenue contribution is indirect.

* **Documentation**: [config/features/travel-stories.md](/config/features/travel-stories.md)
  was a stub — four placeholder configs and a description that never said what
  the feature did. It now says what the flag switches on, that it is an app flag,
  and where the separate home-screen placement is decided; the reasoning lives up
  in the concept. `CLUSTER-THRESHOLD`,
  `IGNORE-VALIDITY` and
  `MAX-DAYS-BEFORE-EXPIRATION` are still undocumented, pending confirmation from
  whoever implemented them — deliberately left open rather than guessed.

* **Convention**: feature files describe their levers and nothing else, and no
  file in the bundle carries measured numbers — a click rate, a volume, a market
  ranking, or an "as of this date the flag is on in N countries". All of it is
  readable from the datamarts and the feature-flag history, all of it is right
  for a day and wrong afterwards, and nothing here would tell a reader it had
  gone stale. The rule is now written down in the bundle's authoring
  conventions, and applied: the deployment section in
  [config/features/cpa-fallback.md](/config/features/cpa-fallback.md), added the
  day before, is gone, and the travel-stories concept keeps the durable shape —
  editorial screens cannot be clicked at all, so they convert at zero by
  construction — without the quarter's percentages.

* **Documentation**: the `PLACEMENTS-POSITION` config in
  [config/features/home-screen-elements.md](/config/features/home-screen-elements.md)
  now says what it does, because it is the other half of the Travel Stories
  deployment story: the list decides presence and order on the app home screen,
  and an element left out of it does not appear whatever its own flag says, so
  `travel_stories` enabled and `travel_stories` visible are two different
  questions.

## 2026-09-14

* **New concept**: [core/commercials/cpa-fallback.md](/core/commercials/cpa-fallback.md).
  The bundle had no account of a monetisation rule that is live on three
  markets: CPA partner offers are withheld from the flight results page and
  admitted only when the search would otherwise return almost nothing. The
  asymmetry is the point — a CPC click is paid when the user leaves, a CPA
  one only if that user books, so a CPA offer on a healthy page trades
  certain revenue for probable revenue, while on a near-empty page there is
  no CPC click to protect and the alternative is no click at all. The file
  also carries the reason the trade is one-sided rather than
  merely theoretical on those three markets: they are CPC markets, and the CPA
  partners present on them produce an eCPC an order of magnitude below a CPC
  one, where everywhere else — the markets where CPA *is* the supply — CPA
  produces an eCPC in the same range as CPC. The feature is enabled where
  that gap exists, not as a general policy towards CPA. The same
  file covers the second decision layered on top (keeping those clicks out of
  the marketing signals, so bidding platforms don't learn value from traffic
  that exists because a search was poor) and the two reading caveats that
  follow: part of the CPA share on those markets is fallback volume rather
  than CPA partners winning demand, and fallback clicks are worth materially
  less per click than ordinary ones.

* **Documentation**: [config/features/cpa-fallback.md](/config/features/cpa-fallback.md)
  was a stub — two placeholder configs and a description of the mechanism
  that never said what the feature was for. It is now what a feature file
  should be: the three configs, a dated snapshot of where the flag is live,
  and a link up to the concept for the reasoning. `SEND-MKTG-SIGNALS` in
  particular was documented as a general marketing-tag switch; it is scoped
  to clicks on fallback offers only.

## 2026-09-11

* **New concept**: an "Auction, not a list" section in
  [core/commercials/mal/overview.md](/core/commercials/mal/overview.md).
  The bundle described *where* a MAL placement sits and *who* gets paid,
  but never the one structural difference that explains the rest: Core
  is a list where every partner with an offer appears and a bid moves
  rank, MAL is an auction over a handful of slots where only the best
  bid appears at all and everyone else is absent. That is why MAL demand
  is aggregated through networks — few slots against a deep pool of
  advertisers is what holds the clearing price up — and why MAL volumes
  move abruptly where Core ones drift: one advertiser outbidding the
  rest takes a whole market overnight, with no gradual re-ranking. A MAL
  breakdown is the outcome of an auction on that day, not a stable share.

* **Clarification**: the external demand networks are now **named**
  wherever they were described. Both
  [core/commercials/mal/overview.md](/core/commercials/mal/overview.md)
  and [core/business/revenue-streams.md](/core/business/revenue-streams.md)
  said MAL Media's non-direct share arrives through "external ad-tech
  networks (Clicktripz-style)" — a placeholder written before the
  networks had been censused. There are exactly four, no more: the
  internal `mdflow` plus `clicktripz`, `kayak` and `viajala`, verified
  over all of 2026 and across every business profile (`kayak` also shows
  473 clicks on the `meta-spinner` profile, a different profile rather
  than a fifth network). A handful of named counterparts does not need a
  hedge.

* **Correction**: [core/commercials/mal/networks.md](/core/commercials/mal/networks.md)
  noted that `kayak` and `viajala` double as `CORE`/`BACKFILL` supply
  groups. For Kayak it is worse than double. In the month to 2026-09-10
  the same name holds **three** simultaneous positions, each on a
  different field: MAL demand network (`network`, 333,578 clicks,
  €25,677), buyer of Jetcost's own MAL inventory through the rival
  `clicktripz` (`networkPartner`, 252,425 clicks, €1,185), and Core
  content supplier (`groupCode` + `BACKFILL`, 100,321 clicks, €35,293).
  It sells us demand, buys our inventory through a competitor, and feeds
  our result list, at once. The three must not be summed — they are
  three relationships on three fields — and they rank in opposite orders
  by volume and by value: the smallest by clicks earns more than the
  other two combined.

## 2026-09-10

* **Restructure**: MAL moved out of `core/media/` into the new
  [core/commercials/mal/](/core/commercials/mal/index.md) —
  `mal.md` → [overview.md](/core/commercials/mal/overview.md),
  `mal-networks.md` → [networks.md](/core/commercials/mal/networks.md),
  `self-trailingtab.md` → [self-trailingtab.md](/core/commercials/mal/self-trailingtab.md),
  following `core/index.md`'s own rule that a named initiative with
  several documents becomes a subfolder of the function that owns it
  (the [core/product/w2a/](/core/product/w2a/index.md) pattern). The
  folder was wrong on both sides: `core/media/` means **display**
  media — banners — while MAL is a tool of the commercial world, the
  place where the relationship with a partner and its integrations are
  managed, core integrations included, plus the integrations with the
  demand networks. Note what did *not* change: MAL Media revenue is
  still accounted as Media. Ownership of the concept and the accounting
  bucket are two different questions, and the folder answers only the
  first — [core/media/index.md](/core/media/index.md) now says so
  explicitly, since "MAL Media is Media revenue, so MAL lives in
  `core/media/`" is exactly the inference that put it there.

* **Correction**: [core/commercials/mal/overview.md](/core/commercials/mal/overview.md)
  stated that MAL Media is "not sold directly with a partner" and is
  delivered through ad-tech networks, with identifiable buyers as a
  post-2026-01-01 exception on the exit unit. The data says otherwise:
  about half of MAL Media clicks come through the internal `MDFLOW`
  network and are sold directly, eDreams and Opodo being the two
  largest buyers by volume. Direct selling is not the exception on MAL
  Media, it is half the business. Same root cause as the identity
  correction above — the bundle had been reading "no `partnerCode`" as
  "no direct relationship", and that only ever held for the external
  networks' share. The same wrong claim was fixed in
  [core/business/revenue-streams.md](/core/business/revenue-streams.md)'s
  MAL Media section, which restated it independently.

* **New concept**: [core/commercials/mal/networks.md](/core/commercials/mal/networks.md).
  MAL's demand arrives through two levels of integration that the bundle
  had never separated: the **network** (few — `mdflow`, `clicktripz`,
  `kayak`, `viajala`) and the **partner** behind it (~156 distinct buyers
  in a rolling month), which is the one that actually pays for the click
  and owns the domain the user lands on. The network is entirely masked
  from the user. `MDFLOW` is the internal network — Jetcost's own direct
  partner demand plugged into MAL on the same footing as the external
  three — and it is named that way on purpose, to keep it apart from
  Jetcost the **publisher**; the two roles meet on the same row, since
  `JETCOST` is also a buyer inside `mdflow` (`groupCode` `BRAVOMETA`,
  the self trailing tab).

* **Correction**:
  [core/commercials/integration-types.md](/core/commercials/integration-types.md)
  claimed that inline and checkbox MAL Media clicks carry no partner
  identity and are "not tracked in `jc_clicks_datamart`", and that a
  large share of exit-unit clicks has no identifiable buyer. Both are
  wrong. `networkPartner` is populated on **100%** of MAL clicks from
  2026-01-01 — every network, every placement — so the buyer is always
  known. What is partial is the *commercial* identity
  (`groupCode`/`partnerCode`), present only on the `mdflow` share:
  ~50% of MAL Media clicks and ~69% of MAL Core ones in the month to
  2026-09-08. An empty `partnerCode` there means "bought through an
  external network", not "anonymous click", and the file now says so
  and separates the two identities explicitly.

* **New concept**: [core/commercials/levers.md](/core/commercials/levers.md).
  Commercials was the last department with real operation-logs volume and no
  lever taxonomy — every one of its ~520 rows was `internal_event_type:
  unknown`. Tech added a `reason` enum to admin3's commercial
  activation-log endpoint on 2026-09-09 (`activation-change`,
  `targeting-change`, `traffic-cut`, `other`), which is the first thing that
  endpoint has ever said about *why* a change was made rather than only what
  changed, so the taxonomy is now derivable rather than guessable. The three
  specific values become the department's levers verbatim. Also documents
  two things a reader would otherwise get wrong: an `activation-change` does
  not say whether the partner went on or off (read the row, same as
  marketing's `campaign-status-change`), and one commercial decision is
  logged once **per country**, so counting rows overstates activity.

* **Decision**: admin3's fourth reason, `other`, maps to `unknown` and gets
  **no `internal_event_type` of its own**. A dedicated value was drafted and
  rejected. It reads like commercials' `manual-entry`, but the two rest on
  very different evidence: `manual-entry` comes from someone writing the log
  entry themselves, who is the authority on what the operation was, whereas
  `other` is the residual option in a dropdown — and a recurring change
  arriving as `other` means the *source's* vocabulary is missing a value,
  which is outstanding work exactly as `unknown` says. The raw value stays
  in the row's `metadata`, so nothing is lost that a query can't recover;
  a third way of saying "no lever" would have had to be learned by every
  reader of the column instead. Recorded in
  [data/operation-log-classification.md](/data/operation-log-classification.md)
  next to the `unknown`/`manual-entry` rule, since the same "none of the
  above" option will appear in another source eventually.

* **Clarification**:
  [data/operation-log-classification.md](/data/operation-log-classification.md)'s
  `unknown` vs `manual-entry` section gained the case this change created —
  a source whose taxonomy reads a field that only started existing partway
  through the source's own history, leaving every earlier row permanently
  `unknown` (commercials before 2026-09-09). A taxonomy's coverage floor can
  be later than its source's data coverage floor, and those pre-floor rows
  are not outstanding classification work.

## 2026-09-09

* **Clarification**: `data/query-caveats.md`'s UK/GB section now states that
  the split it describes is a property of the **datamarts** only. The
  operation logs (`mcp_utils.jc_operation_logs_data` and its summary table)
  deliberately use ISO throughout, so the UK market is `GB` there — a
  decision taken now that the table is still young rather than inheriting
  the legacy anomaly, and most of its sources (abtest-logs, commercial-logs)
  were already writing `GB`. Prompted by finding both spellings in the table:
  the gads importer was carrying `UK` over from GAds account and campaign
  names, and now normalises on write. Documented for query authors in
  `skills/jc_operation_logs_skill/SKILL.md`, including the consequence that
  joining the logs to a datamart on market needs the datamart side
  normalised.

* **Migration**: the four Country Cluster fields
  (`sessionCampaignCountryCluster`, `sessionContentCountryCluster`,
  `userBasedCampaignCountryCluster`,
  `lastClickNotDirectCampaignCountryCluster`) stopped being computed
  dimensions and became **physical columns** of
  `datamart.jc_sessions_datamart_view`, added to the view's DDL in
  jetcost-bi (task 86cbam9e2) and to Superset dataset 11. In the semantic
  layer skill they moved out of `computed.yml` and into `attributes.yml`
  under `sessions`, with `not_inherited_dimensions` entries on searches,
  clicks and impressions — the columns exist on the sessions view and
  nowhere else, and without those exclusions the inheritance would have
  advertised them on three datamarts that do not have them. The mapping now
  has one definition instead of two; the formula itself stays out of this
  bundle, per *Business concept vs. implementation mechanism* in
  `_meta/conventions.md`.
* **Correction**: two facts in
  [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md)'s
  "Country Cluster" section were wrong once the new mapping went live. The
  US is no longer a pair of single-market clusters `US-EN`/`US-ES`: it is
  the one market the cluster **splits** rather than folds, carrying Local
  vs Ext into the value itself as `US-EN-LOC`, `US-EN-EXT`, `US-ES-LOC`,
  `US-ES-EXT`. And the scope list named three lenses where there are four —
  `sessionContent*` was missing.
* **Clarification**: same section — **`RoW` is the fallback bucket, not a
  market group**, which the old text implied by listing it beside LATAM and
  GERMANIC. It absorbs the `undefined` campaign target that the virtual
  campaigns of the *Campaign* section carry, so it is mostly non-campaign
  traffic: over the 30 days to 2026-09-09, 98% of non-paid sessions fall in
  RoW against 0.7% of paid ones. The cluster is sound on paid traffic,
  which is what it was built for, and meaningless on an unfiltered total.
  This is the trap the earlier `notfound` fallback (2026-09-07 entry below)
  made visible by name; the new fallback hides it behind a real-looking
  market label, so it needed saying explicitly.

## 2026-09-08
* **Rename**: `core/media/self-exit-unit.md` →
  [core/commercials/mal/self-trailingtab.md](/core/commercials/mal/self-trailingtab.md),
  "Self Exit-Unit" → **Self Trailing Tab**. The placement Jetcost
  self-competes on had been recorded as the MAL **exit unit**; it is the
  MAL **trailing tab**. Only the name was wrong — the mechanism, the
  economics, the bid, the fields and the zero-sum balance the file
  documents are all unaffected — so this is a name substitution and
  nothing else. Renamed in the file (title, description, and the three
  prose uses: the placement itself, "Jetcost's trailing-tab bid", and the
  share of the white labels' trailing-tab clicks it wins) and in the two
  inbound places that name what Jetcost bids on:
  [core/business/whitelabels.md](/core/business/whitelabels.md)'s section
  and [core/commercials/integration-types.md](/core/commercials/integration-types.md)'s
  `BRAVOMETA` clause, plus the entry in
  [core/media/index.md](/core/media/index.md). The paragraph reconciling
  the two names is gone along with the mismatch it existed to explain,
  keeping only that mdflow is the serving and auction layer. Left
  untouched: the `clickCategory` 4002 gloss "(MAL Exit Unit)", a label in
  the data rather than this concept's name, and the statements in
  [core/commercials/mal/overview.md](/core/commercials/mal/overview.md), the same
  `integration-types.md` and
  [core/business/revenue-streams.md](/core/business/revenue-streams.md)
  about partner identity appearing on the exit unit from 2026-01-01 —
  those describe MAL Media generally, not the placement renamed here.
  The 2026-09-04 entry below keeps "self exit-unit" in its prose, with
  only its link path updated so it doesn't dangle.

* **Creation**: added [data/sources.md](/data/sources.md), describing where
  ClickHouse data actually comes from. The bundle documented what every
  number *means* and, in
  [data/query-caveats.md](/data/query-caveats.md), several specific traps
  that follow from *when* data becomes complete — but never the layer
  underneath either: the ingestion paths themselves. Three exist, and they
  behave differently in ways that change how a period can be read.
  **Galera**, the production MySQL cluster the site frontend writes to, is
  imported nightly by the internal `maid` tool — append for log-shaped fact
  tables, truncate-and-reload for the reference registries (partners,
  campaigns, markets, configuration). That's why there is no intraday
  Galera data, and why a historical breakdown by a reference attribute is
  labelled with today's answers rather than the period's. **Argo**, the internal realtime event
  collector, produces onto Kafka and is consumed directly by a dedicated
  ClickHouse engine, so its failure mode is the opposite one: the trailing
  edge is present but undercounting, and two reads of the same recent
  window can legitimately disagree. **Third-party vendor APIs** (Google
  Ads, Google Analytics, Google Ad Manager, Apple Ads, ...) are pulled on
  cron, and are the only source where a *past* day can change, because the
  vendor restates its own reports. Written as provenance only: the file
  states the paths and their analytical consequences, and explicitly leaves
  the table-by-table mapping to the ClickHouse semantic layer skill rather
  than baking one datamart's inventory into the bundle.

## 2026-09-07
* **Correction**: made `internal_event_type` a single-spelling namespace.
  The vocabulary had drifted into two conventions: `marketing`'s levers
  were kebab-case (`budget-adjustment`) while `product`'s were snake_case
  (`enable_abtest`), as was the shared `manual_entry` in
  [data/operation-log-classification.md](/data/operation-log-classification.md).
  Nothing surfaced it, because each department's file was internally
  consistent and matched its own importer — the drift is only visible when
  querying across sources, which is the whole point of the pillar. Kebab
  wins on volume (five documented marketing levers plus `release`, against
  four snake values) and because it matches the `source` values these
  levers sit next to (`abtest-logs`, `commercial-logs`). So
  `enable_abtest` → `enable-abtest`, `disable_abtest` → `disable-abtest`,
  `update_abtest_rules` → `update-abtest-rules` in
  [core/product/levers.md](/core/product/levers.md), and `manual_entry` →
  `manual-entry` in the classification file and
  [data/index.md](/data/index.md). Added a "Spelling" section to the
  classification file stating the rule for the whole namespace and
  recording that it drifted, so the next department to add a `levers.md`
  has something to conform to rather than a majority to infer. Earlier
  entries in this log deliberately keep the old spellings — they record
  what was true when written. `agents/import-operation-logs` now rejects a
  non-kebab value at the importer boundary.
* **Creation**: added "The Market Tuple: Country + Language" and "Three
  Different 'Country' Notions" to
  [core/business/markets.md](/core/business/markets.md). The bundle said
  "Jetcost operates across multiple countries and languages" and never
  enumerated them, while the same file's Key Dimensions section asserted
  that Country *determines* language. That is false for the two largest
  non-FR markets: **US** is served in `en` and `es` and **CA** in `en`
  and `fr`, with the second locale at roughly 41% and 48% of the market.
  Both splits also carry materially different paid economics — the ROAS
  gap between the two halves of each runs to tens of percentage points,
  in both cases with the *smaller* half performing better and ARPU
  nearly identical, so the difference sits on the cost side. Grouping US
  or CA by country alone averages them and hides the better half. The 40
  tuples in operation are now listed, and the Key Dimensions bullet was
  rewritten from "Country" to "Market". Deliberately *not* moved to a
  file of its own: the tuple is the same Markets concept at a finer
  grain, not a second one.
* **Update**: recorded that **RU was a market until 2026-07-06** and
  carries no traffic after it. Nothing in the bundle said so, and
  [core/marketing/sem/accounts.md](/core/marketing/sem/accounts.md)
  still listed RU among the markets with "no active campaigns", which
  read as an active market left unadvertised rather than a decommissioned
  one; RU was removed from that list. The end date is also noted on the
  `country` enum in the semantic layer skill, since a window spanning it
  shows the market starting and stopping.
* **Creation**: separated the three things called *country*, which was
  the actual source of the confusion above — the **market**
  (`country`, the tuple's first element), the **user's geography**
  (`countryUser`, geo-IP) and the **campaign's target**
  (`*CountryDetail` and the `*CountryCluster` built from it). Market and
  user geography diverge as a matter of course, not as noise: a large
  minority of sessions sit on a market's site from outside that country,
  most visibly on FR, whose traffic comes substantially from Morocco,
  Belgium, Tunisia, Algeria and francophone West Africa — the diaspora
  pattern the same file already described, now tied to the field that
  measures it. CountryDetail is a property of the *campaign*: because
  EXT campaigns buy users outside the target market on purpose, one
  value spreads across many markets, and the field carries locales that
  are not Jetcost markets at all (`be-fr`, `ch-fr`, `ma-fr`, `de-tr`,
  `cr-es`). It therefore cannot be used as a market list, which is
  exactly what its market-locale shape invites.
* **Update**: the semantic layer skill already enumerated `country` and
  `language` correctly, `nb` and RU included, so only the relationship
  between them was missing: the two are not independent, a market is the
  tuple, and 40 of the 38x15 combinations exist. Added that, the RU end
  date, the Norway `nb`-not-`no` note, and the instruction to add
  `language` whenever US or CA are grouped.
* **Update**: fixed the Country Cluster mapping in the semantic layer
  skill, on all four attribution scopes rather than one, since a partial
  fix would have made the scopes disagree. `CountryDetail` is not
  case-consistent — both `us-en`/`US-EN` and `pt-pt`/`PT-PT` occur — so
  the input is now lowercased and the uppercase forms stop falling to
  `notfound` while their lowercase twins map. Two locales were added on
  the domain owner's call: `be-fr` → FR and `de-tr` → GERMANIC, both EXT
  targets rather than Jetcost markets. Measured on 2026-08 paid traffic,
  the change is purely additive — 21,060 sessions and ~€7.4k of spend
  move out of `notfound` into US-EN, FR, PT and GERMANIC, and **no**
  bucket moves between two real clusters, so no previously reported
  cluster figure goes down.
* **Correction**: an earlier version of this day's entry claimed the
  mapping made NORDICS "materially undercount Norway" because it maps
  `no-no` while the dominant code is `no-nb`. The premise was right and
  the conclusion wrong: `no-nb` is unmapped, but it carries **0 paid
  sessions and €0 spend**, as does every other Nordic `CountryDetail`
  value. NORDICS is near-empty because DK/FI/NO/SE carry essentially no
  SEM spend, not because of a mapping gap — the `computed.yml` note now
  says so, to stop a reader treating a small NORDICS as a defect. The
  same correction applies to the `notfound` figure quoted there: after
  the fix, what remains is dominated by the datamart's own `notfound`
  sentinel, the source field saying it could not identify a target
  locale, which no mapping can recover.
* **Update**: the app marketing-cost caveat in
  [data/query-caveats.md](/data/query-caveats.md) presented the app zero
  as one single structural fact ("by design, not by gap"), which told
  the reader not to worry about the one case they should. It is three
  situations with three different verdicts, now separated: **W2A** is a
  correct zero (the web session absorbed the cost it is due); **OIA** is
  a real distortion, not a convention (the paid click happened, no web
  session materialised, so that cost is spread across the campaign's
  *other* web sessions — web materially carries the cost of
  acquisitions that landed in app, and no attribution model says that
  is right, unlike the lastclicknotdirect rollback which is an explicit
  rule); **app-install** is transitional, resolved from 2026-09-07.
  Section renamed to "App Marketing Cost — Which Zeros Are Real": the
  old title asserted an invariant that stops holding today, and
  "Three Different Zeros" would have aged the same way, since from
  today one of the three is no longer a zero. The cross-reference in
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md) was
  repointed; the 2026-08-26 entry below still names the old title and
  was deliberately left as it stands, being historical record.
* **Update**: the open-ended app invariant was time-bound in both
  files — Marketing Cost read exactly `0` on app *until 2026-09-07*
  (verified on `datamart.jc_sessions_datamart_view` from 2026-02
  through 2026-09-06, daily over the last three weeks of that window).
  From 2026-09-07 paid installs bought on the app stores allocate cost
  onto the app session itself (first open), pro-rata like every other
  stream; W2A and OIA sessions keep reading `0`. **The 2026-09-07 date
  comes from domain-owner confirmation, not from data**: the day was
  not yet processed in the datamart when this was written, so the
  claim is forward-looking and should be re-checked against the
  sessions datamart once the day lands. Left as stated because a
  reader of the old text would have concluded app carries no cost and
  written a query that drops app on data where the cost is now there.
  The app-install bullet also points at the ordinary processing lag,
  so a recent day still reading `0` isn't mistaken for the doc being
  wrong.
* **Update**: added the ROAS consequence readers actually need —
  scoping to web is **not** the cleaner read, because it strips app
  from the numerator but not the OIA cost from the denominator, and
  Google already counts `ios-core-sgtm` / `android-core-sgtm` among
  its conversion signals, so the all-platform read is closer to what
  its bidding optimises against.
* **Update**: recorded in
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md) that
  grouping cost by a Campaign dimension scoped on a different
  attribution model relabels the cost without reallocating it — the
  sessions where the two fields diverge are the direct ones, which
  carry `0`. This is a labelling question, not an allocation error,
  and the file previously left room to read it as one. Verified on the
  sessions datamart: over 2026-08-25→31 the cost totals under
  session-level and lastclicknotdirect scoping agree to float
  summation noise, and both exclusive buckets are exactly `0`. A
  precedence rule electing one paid scoping as authoritative was
  considered and **rejected** for this same reason: the usual
  justification is that numerator and denominator should share an
  attribution scope, and the denominator is identical under both.
  Mirrored into the semantic layer — the ROAS Pro Rata family comment
  in `computed.yml` and a `notes:` on the `paid` segment in
  `segments.yml` (see `skills/jc_clickhouse_semantic_layer_skill`),
  which also disambiguates `paid` from the `paid-search` channel read
  used by `agents/daily-report`.
* **Removal**: dropped the measured "~19k/week non-W2A paid app
  sessions" figure from the OIA bullet. It had already drifted since it
  was written, and a point-in-time count is not what the bullet is
  making — the mechanic is. The illustrative 100/50/50 example stays:
  it is arithmetic, not a measurement, and the allocation mechanic
  doesn't survive without it.
* **New**: the Full Core KPI family in
  `skills/jc_clickhouse_semantic_layer_skill/computed.yml` — added
  2026-09-04 in commit 8b73c99 and logged here retroactively, the
  commit touched only that file. Three base metrics (`clicksFullCore`
  on searches/sessions, `revenueCurrentFullCore` on searches,
  `revenueCurrentProRataFullCore` on sessions) plus the ratios built
  on them (`CTR Full Core`, `eCPC Full Core` against each of those two
  revenue columns, `RPMS Full Core`), completing the Organic Core +
  MAL Core scope that
  until then existed only as the `ROAS Pro Rata - Full Core` numerator
  (see the 2026-08-24 entry). Two decisions worth recording, because
  neither is visible from the metric definitions alone: (1) they are
  **computed expressions over existing columns**, deliberately not new
  datamart columns — no ClickHouse DDL, no historical backfill, and
  the jetcost-bi ETL is untouched; the alternative (materialising them,
  as physical or ALIAS columns) was evaluated and dropped, since
  `clicksCore`/`clicksMalCore` and `revenueCurrentCore`/
  `revenueCurrentMalCore` already sit side by side at the right grain.
  (2) `revenueCurrentProRataFullCore` also exists as a metric on the
  Superset sessions dataset, written there first; the two definitions
  must be kept in sync by hand, and the Superset one is what the ~679
  charts on that dataset render. Per `domain/_meta/conventions.md`'s
  declinations rule these metrics get **no** `domain/` entry of their
  own — Full Core Clicks is already the funnel volume in
  [data/metrics.md](/data/metrics.md), and the rest are that metric
  sliced, which lives in the semantic layer only.
* **Correction**: `skills/jc_clickhouse_semantic_layer_skill/attributes.yml`
  claimed the MalCore/MalMedia split was "available only in clicks
  datamart" — the opposite of the truth, and it would have made the
  Full Core metrics above look uncomputable. Verified against
  `system.columns`: `clicksMalCore`/`clicksMalMedia` exist on searches,
  sessions and impressions; `revenueCurrentMalCore`/`...MalMedia` on
  searches and impressions only; on sessions the MAL Core revenue leg
  exists solely as the pro-rata `revenueCurrentProRataMalCore`; and
  **none** of them exist on `jc_clicks_datamart`, which carries raw
  `clickCategory` instead. Replaced with that availability matrix, plus
  a note that the unsuffixed `Mal` columns do exist at every grain as
  MalCore + MalMedia combined — which on searches is MAL Core alone in
  practice, per [data/revenue-fields.md](/data/revenue-fields.md)'s
  finding that almost no MAL Media click has a search to attach to.
  Same error corrected in R017's notes in
  that skill's `query-rules.yml`, which said `revenueCurrentMalCore` is
  "a direct column on searches/clicks". The 2026-08-24 entry below
  repeats the original wording and is left as-is, per the convention on
  historical entries.
* **New**: query rule **R019** in
  `skills/jc_clickhouse_semantic_layer_skill/query-rules.yml` — on the
  sessions datamart, MAL revenue must be read as
  `revenueCurrentProRataMal` (the network revenue report, allocated),
  never as `revenueCurrentMal` (the winning bids summed off the
  clicks). [data/revenue-fields.md](/data/revenue-fields.md) already
  documented that the two are incompatible facts sharing a prefix and
  which one revenue reporting means; what was missing was anything
  binding a ClickHouse extraction to that choice — R001 is
  `scope: clicks`, so nothing pointed either way at session grain, and
  the wrong column returns a plausible number rather than an error.
  Records for the first time a curation decision taken outside the
  bundle and invisible from ClickHouse: `revenueCurrentMal` has been
  **removed from the Superset sessions dataset** and replaced there by
  the pro-rata column, so a figure built on it is not reproducible from
  the company's dashboards. Gap measured on
  `datamart.jc_sessions_datamart_view`, 2026-08-25, `qualifiedSession =
  true`, both off the same rows: 4321.28 (bids) vs 4654.57
  (network-reported), +7.7%, with the pro-rata legs decomposing exactly
  into MalCore 2746.11 + MalMedia 1908.46. The rule also states why
  `revenueEcpcMal`/`revenueOperationalMal` are deliberately *not*
  covered — their names promise a bid and a bid is what they carry —
  and that the Full Core revenue metrics above therefore rest on a
  bid-based MAL leg on searches and a network-based one on sessions,
  which must never be summed or compared across grains. It also states
  outright that Full Core revenue exists in the Current variant only, at
  every grain — there is no `revenueEcpcFullCore` or
  `revenueOperationalFullCore`, since the `revenueEcpcMalCore` /
  `revenueOperationalMalCore` leg they would need does not exist either
  — and defuses the adjacent naming trap: `eCPC Full Core` is a ratio,
  both its flavours built on `revenueCurrent`, not on `revenueEcpc`.
  Pointer added from `attributes.yml`'s availability matrix.
* **Rename**: `agents/daily-report/db.js` computed Full Core Clicks as
  `SUM(clicksCore) + SUM(clicksMalCore) AS clicks` — the plain `clicks`
  alias being, per [data/metrics.md](/data/metrics.md)'s own note, the
  source of a naming collision that table had to work around. Renamed
  to `clicksFullCore` for consistency with the semantic layer. Safe by
  inspection: the alias is internal to `fetchFunnelMetrics`, read only
  by that query's own `ctr` and `ecpc` expressions and never projected
  in its outer SELECT, so no JS consumer, snapshot or Slack payload
  ever saw it. Untouched, and deliberately so: the unrelated `clicks`
  in `fetchSovBreakdown`, which is a real `UInt64` column on
  `jc_clicks_datamart` scoped to `clickCategory IN (1001)` — Organic
  Core only, not Full Core. [data/metrics.md](/data/metrics.md)'s Field
  column now reads `clicksFullCore` and its collision workaround note
  is dropped as no longer needed.


## 2026-09-04
* **Update**: `OIA` was used across the bundle as a bare acronym, never
  expanded anywhere — [config/features/mobile-app-oia.md](/config/features/mobile-app-oia.md)
  had an empty TODO where its description belongs. It stands for
  **open-in-app**: the touchpoints that open the app directly on a
  content, internal (in-app discovery widgets, the `INTERNAL-OIA-*`
  configs) or external (deep links from a campaign, the `*-BEHAVIOUR`
  ones). Written there, pointing at the cost-attribution caveat in
  [data/query-caveats.md](/data/query-caveats.md), where the acronym is
  now expanded at first use. Deliberately *not* cross-linked with
  [data/sessions-and-users.md](/data/sessions-and-users.md) in either
  direction, per the domain owner: OIA appears there only as one of the
  moments an app session's expiry gets checked, and treating the feature
  and session handling as related concepts would assert a link that
  isn't there.
* **Update**: [data/sessions-and-users.md](/data/sessions-and-users.md)
  described the session as one rule — 30 minutes of inactivity — and the
  user as having a single 1-year lifetime. Per the domain owner, a
  session is closed by **two** rules, and they hold on both platforms:
  that inactivity window, and invalidation at **midnight
  `Europe/Paris`**, enforced backend-side (note the fixed timezone: the
  boundary is one instant worldwide, so it isn't local midnight outside
  that zone). Added a "How each platform enforces it" section, on the
  principle that the session is **one concept with two enforcements**,
  the device being what forces them apart and not the definition: a web
  page talks to the backend on every view, so the check runs server-side
  at the next page view; a mobile app can stay alive for days without
  contacting it, so it carries the inactivity rule client-side
  (`SESSION-DURATION` in
  [config/features/mobile-app-settings.md](/config/features/mobile-app-settings.md),
  30 on every market and never changed, so no time series needs a config
  history reconstructed), scopes the session per market, and evaluates
  expiry only at a few moments — never in foreground or background, only
  on reopen after a kill, on a country/language change, or on an open
  through a W2A tool, a push notification or OIA. The visible
  consequence is bounded and stated as such: a long-lived install picked
  up after days without a kill continues in the same session, past both
  rules, where the equivalent web activity would have been split. Also
  added the country/language change behaviour (a market with no session
  gets one, a market with a still-valid session keeps it, so one user
  can hold several valid sessions at once), split the User lifetime by
  platform (web 1 year; app's `jetuser` never expires and is shared
  across markets, a known gap rather than a design goal), and recorded
  that the session identifier isn't a datamart column on either platform
  — the analysis layer reads the session count, while the identifier
  itself lives only in the raw upstream data. `SESSION-DURATION`'s empty
  TODO in
  [config/features/mobile-app-settings.md](/config/features/mobile-app-settings.md)
  filled in as a lever: what the flag does and its current value only,
  with the session's own rules left to the concept file.
* **Deliberate omission**: no query caveat was added for this. A first
  draft carried one — "An App Session Is Not the Same Unit as a Web
  Session", telling analysts not to compare app and web session counts —
  and the domain owner rejected the framing: the concept stays
  **symmetric** across platforms, the implementations differ because the
  devices do, and from the user's point of view the two are comparable.
  The mechanics that draft was built on are all recorded in
  [data/sessions-and-users.md](/data/sessions-and-users.md); the
  prohibition they were turned into was an inference, not a business
  rule. Sessions remain the primary unit of traffic measurement on both
  platforms, comparable as such.
* **New**: [data/revenue-fields.md](/data/revenue-fields.md) gains a MAL
  section, because on MAL clicks the field names mean something other
  than what the rest of the file describes. `revenueCurrent` on a
  non-Core click is **set equal to `revenueEcpc`** by construction — the
  winning bid, with no booking report entering the click level at all —
  so it must not be read as consolidated revenue, and comparing the two
  fields there answers nothing. Also records that MAL revenue has **three
  representations that do not reconcile**: the click-level bid, the same
  bids summed per search or session, and the `revenueCurrentProRata*`
  columns on the sessions view, which come from the network revenue
  report instead. The same row of that view therefore carries
  `revenueCurrentMal` and `revenueCurrentProRataMal` with incompatible
  semantics, and the gap between them is not an error to chase — for
  revenue reporting and for anything read at session level, the pro-rata
  columns are the figure the network actually reported and the one to
  use. Plus a structural trap: a MAL Media click has no search to attach
  to, so under 1% of them reach the searches datamart (against
  essentially all MAL Core clicks) — MAL revenue read per search is MAL
  Core only, and per-search MAL Media metrics are meaningless by
  construction.
* **Deliberate omission**: a rounding defect in the clicks datamart,
  which distorts click-level revenue for placements priced below a cent,
  is **not** documented here. It is an unintended defect being fixed, not
  business knowledge — context describes how the business works, not
  where the pipeline is currently broken.
* **New**: [core/commercials/mal/self-trailingtab.md](/core/commercials/mal/self-trailingtab.md)
  documents the self exit-unit — the integration in which Jetcost bids on
  its own white labels' MAL exit units and, when it wins, receives a
  search opened in a background tab on the core site. One placement that
  is Media revenue for the white label and paid acquisition cost for
  Jetcost, designed to net to zero. Records the serving layer (mdflow,
  where the placement is called the *trailing tab* — the name that
  actually appears in click and campaign data), that Jetcost bids a flat
  sub-cent CPC set per market in the same backoffice as external
  partners, and the two counter-intuitive facts: Jetcost is **not** the
  highest bidder yet wins a large share, so this auction must not be
  modelled as "highest CPC wins"; and the traffic is backtab traffic,
  with a much lower STR, an order-of-magnitude lower CTR and ARPU, and a
  **paid** classification that dilutes blended paid metrics. Standalone
  it is loss-making for Jetcost's P&L by design, the counterpart being
  the white label's Media revenue. The zero balance is verified over
  multi-month windows and market by market, but the file states it is a
  *maintained* property, not an identity: bid rate and cost report are
  two independent configurations, and markets exist that take traffic
  with a cost and no configured bid.
* **Correction**: [core/commercials/integration-types.md](/core/commercials/integration-types.md)
  had the MAL Media taxonomy wrong in three ways, all verified against
  `datamart.jc_clicks_datamart`. It listed the integration types as
  `CHECKBOX`/`EXITUNIT`/`INLINE`: the exit unit is actually
  `TRAILINGTAB`/`STANDARD` (`EXITUNIT` exists only as a stray handful of
  clicks in March 2026), and `CHECKBOX` is live only on the
  `meta-spinner` profile, not on the Jetcost properties. It documented
  `TRAILINGTAB` as a separate direct-integration placement with
  Core-like partner semantics — it is the exit unit, i.e. MAL Media. And
  it asserted `groupCode`/`partnerCode` are "effectively always empty"
  on MAL Media: they are absent before 2026-01-01 (when
  `integrationType` itself starts being populated) and present on
  roughly half of exit-unit clicks after it, including Jetcost's own
  bids under `BRAVOMETA`. The now-partial rule is propagated to
  [core/commercials/mal/overview.md](/core/commercials/mal/overview.md),
  [core/business/revenue-streams.md](/core/business/revenue-streams.md)
  and [config/partners/index.md](/config/partners/index.md), which all
  stated the absolute version.
* **New**: [core/business/business-profiles.md](/core/business/business-profiles.md)
  documents `businessProfile`, the widest partition in the data and until
  now entirely absent from this bundle — it appeared exactly once, in
  passing, with no definition. Three different business models share one
  data platform: `jetcost` (the original comparison site, ~99% of the
  business), `veriflights` (airline-only comparison, under validation
  since 2026-02-24) and `meta-spinner` (a MAL-Media-only portal, live
  since 2026-06-24, which runs no searches at all — so STR/CTR/CR are
  undefined there rather than broken). Two things recorded because the
  names mislead: veriflights sources its airline inventory through Kayak
  backfill by design, since Jetcost's direct airline integrations aren't
  rich enough, so `groupCode` there identifies the sourcing metasearch
  and never the airline — and meta-spinner's sites carry
  `websiteType = 'multi-destinations'`, not the profile's own name. A
  funnel rate computed across profiles is a weighted average of
  incompatible denominators; the file states why the default `jetcost`
  scope is a business statement rather than a convenience.
* **New**: [core/business/whitelabels.md](/core/business/whitelabels.md)
  documents the white labels — skinned clones of the site with the same
  product behind them, run as a testing ground so a change can meet real
  traffic without risking the core brand, which is also why the self
  exit-unit lives there. Two warnings against treating them as one
  segment: the traffic is heavily concentrated in a couple of domains, so
  a white-label aggregate is those plus noise; and they are not
  interchangeable — paid share ranges from almost fully paid down to zero
  paid sessions and zero spend, so whether a domain has SEM behind it is
  a per-domain fact to check. Also records the direction of the exit-unit
  flow (its sessions land on `websiteType = 'jetcost'`, and
  `sessionCampaignSource = 'mal'` is exactly zero on every white-label
  domain) and that an unqualified domain list includes ~20 domains with
  near-identical session counts, too uniform to be organic and not yet
  diagnosed.
* **New**: [data/dimensions.md](/data/dimensions.md) gains the
  `businessProfile` -> `websiteType` -> `website` hierarchy with its
  values, alongside the existing Country/Device/Platform/Traffic Type
  set. Three verified traps recorded: `website` collapses every
  per-market domain of the core site into one value, so it can never
  split the core site by market and only separates white labels from each
  other; `websiteType = 'app'` and `context = 'app'` are exactly the same
  set, making `websiteType` a strict refinement of Platform on the web
  side; and a profile's name is not its `websiteType` value.
* **Deliberate omission**: `Hotelscan`, a former business profile, is not
  documented. It never appears in the session data at all, and its MAL
  revenue has been zero for every month of 2026 — so no one reading
  `businessProfile` can meet it, and a note would be archaeology rather
  than context.

## 2026-09-03
* **Correction**: removed the learning-period rule from
  [core/marketing/sem/levers.md](/core/marketing/sem/levers.md). It
  asserted "1-2 week learning period after each change; changes larger
  than ~20% restart it" — a precise rule that doesn't hold. Per
  marketing, a tCPA change does not reliably reset learning: whether it
  happens depends on the size of the change, traffic volume and the
  campaign's history, with no deterministic rule, and the team doesn't
  treat it as a binding constraint. The old text implied the opposite
  advice ("don't touch tCPA, you'll reset learning"), which is the
  costlier error of the two, so the file now states explicitly that the
  reset is not a reason to defer or water down a warranted change, and
  not a reason to wait for a calendar boundary either. Google's own
  published thresholds (30-50 conversions/30d, ~15 for tROAS) were
  deliberately left out: platform facts that decay, not Jetcost
  knowledge.
* **Correction**: the SEM account tuple in
  [core/marketing/sem/index.md](/core/marketing/sem/index.md) described
  its fourth variable as "location: geographic targeting within the
  country". It is **localization type — Local or Extended (EXT)**:
  whether the account targets users inside the country or users outside
  it browsing in that market's language. Now documented in the new
  [core/marketing/sem/accounts.md](/core/marketing/sem/accounts.md).
* **Correction**: "Hybrid" campaigns are now called **Branded** (same
  campaigns, cosmetic rename). Updated in
  [core/marketing/sem/index.md](/core/marketing/sem/index.md),
  [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md)
  and [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md),
  each noting that a surviving `hybrid` value means Branded.
* **Correction**: dropped the CPA-tier bid portfolios (High / Medium /
  Low CPA / Low Traffic) from
  [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md)
  — eliminated in the 2025/2026 account refactoring. Routes,
  Destinations and Generics strategies are now segmented by
  macro-region, geography being a dimension the auction can act on
  while a CPA tier is a property of the account's own history.
* **Correction**: removed the flat Bing rules ("Exact match only",
  "desktop only") from
  [core/marketing/sem/index.md](/core/marketing/sem/index.md) rather
  than restating them. Per marketing, Bing match types and device
  coverage vary and are partly under test; the channel is small and its
  operating model unsettled.
  [core/marketing/sem/bing-ads.md](/core/marketing/sem/bing-ads.md) now
  says so, and warns against reading the platform rules documented
  elsewhere in that folder as Bing rules.
* **New concept**: virtual campaigns, in
  [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md).
  The campaign field is never empty — traffic from no campaign
  (direct/referral/organic) is assigned a virtual campaign so it still
  resolves against the campaign registry and keeps every derived
  dimension. Two consequences, both new to the bundle and both recorded
  in [data/query-caveats.md](/data/query-caveats.md): a populated
  campaign field does **not** mean paid traffic (use Traffic Type), and
  paid Google-search spend whose campaign can't be identified lands on
  a not-found virtual campaign, so per-campaign cost doesn't sum to
  total cost. The `vrt` prefix these carry is arbitrary and carries no
  semantics. Also cross-referenced from
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md)'s
  marketing-cost section.
* **Creation**: rewrote Conversion Signals in
  [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md)
  with the two facts that explain the whole tracking setup and were
  absent. First, why signals are sent server-side: client-side values
  are readable by anyone inspecting the page, partners included, so
  attaching an economic value was only possible once tracking moved to
  sGTM — the cookie/GDPR benefits are real but not the reason it
  mattered for bidding. Second, the value itself changed: until
  mid-2026 it was the eCPC per partner, and since 2026-06-01 it comes
  from a model keyed on the clicked route with no partner dimension,
  across every Core sGTM signal (web, iOS, Android). The rationale is
  what the algorithm can act on — route, geography and device are known
  in the auction, which partner wins the click is not. Also documented
  why the app streams need a hand-maintained deferred variant (the jump
  to the app store breaks the normal funnel) and that install signals
  carry no economic value.
* **Correction**: "eCPC" now names three different things, listed in
  [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md):
  the commercial per-partner figure, the `revenueEcpc` field, and the
  conversion value sent to Google. The first and third *were* the same
  number until mid-2026 and are now unrelated.
  [data/revenue-fields.md](/data/revenue-fields.md) records the trap
  that follows: `revenueEcpc` still carries the old per-partner logic
  and has not been realigned with the route model (alignment under
  evaluation, not done as of 2026-09-03), so it is not a proxy for what
  Google is told a click is worth on any date after 2026-06-01. A
  bid-calibration comparison spanning that date compares two valuation
  regimes.
* **Correction**: the note in
  [core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md)
  suspecting the "(eCPC)" beside RPA was a mislabel for Google's
  Enhanced CPC was wrong — it meant eCPC in Jetcost's sense, revenue
  per outbound click, which is what RPA is scoped to SEM. Same file
  gained the tCPA-from-ROAS derivation (unit revenue = CPA × ROAS;
  tCPA = unit revenue / target ROAS), with the warning to feed it the
  Full Core ROAS when the question is bid calibration.
* **Creation**: [core/marketing/sem/accounts.md](/core/marketing/sem/accounts.md)
  — traffic segregation principle, Local vs EXT and why EXT excludes
  same-language accounts, account and campaign naming conventions, the
  `NEW` prefix and the chronic-learning failure the refactoring undid,
  the ten brands, the macro-region partition and its
  no-duplicate-adgroup rule. Market coverage is documented with its
  analytical consequence: markets covered through another account's EXT
  campaigns make a per-account and a per-country read of the same
  traffic disagree. Cross-linked from
  [core/business/markets.md](/core/business/markets.md), which had no
  paid-coverage section.
* **Creation**: [core/marketing/sem/negative-keywords.md](/core/marketing/sem/negative-keywords.md)
  — the global/country list structure and the filing rule for
  no-bidding agreements, including why the two possible mistakes aren't
  symmetric (a country restriction filed globally costs revenue
  everywhere; a global one filed per-country breaches deal terms).
* **Creation**: `core/product/w2a/install-clusters.md`
  and [core/product/metrics.md](/core/product/metrics.md) — how a first
  app open is classified (W2A tool × paid/organic, paid app campaign,
  unknown, direct) and product's own cohort metrics (First Opens, the
  Rev Total components, ARPU, return sessions). ARPU had never been
  documented as a concept despite appearing in reporting. Recorded that
  `App Campaign · Paid` excludes virtual campaigns, and that its cost
  side is untrustworthy while app-install campaigns remain mistracked,
  so its ARPU has no comparable spend to sit against.
  [data/analysis-types.md](/data/analysis-types.md) gained the
  cohort-age windows (D15 → M18) as a comparison convention, since a
  calendar-aligned cohort read measures maturity rather than
  performance.
* **Structure**: [core/marketing/sem/index.md](/core/marketing/sem/index.md)
  now has a real `## Files` listing and holds only the
  platform-shared structure (campaign types, adgroups, keywords, ads,
  landing pages, device), with account architecture moved out to its own
  concept. It also gained the Jetcost-specific ad/asset and
  landing-page rules — including that the ad's Final URL is always the
  homepage and the real page is inherited from keyword level, so
  reading the ad tells you nothing about where a click lands. The same
  pass added AI Max monitoring, standard campaign settings and the PMax
  role/asset-group logic to
  [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md),
  and the device-step and budget-limited nuances to
  [core/marketing/sem/levers.md](/core/marketing/sem/levers.md).
  PMax's "CPA cap" is documented as the *same* `tcpa-adjustment` lever
  reached through a different field path — not as a lever of its own,
  which is what `agents/import-operation-logs/importers/gads.js`
  already does with it.
  Source: a SEM operating guide drafted by the marketing team, plus
  direct clarifications from the domain owner. Deliberately left out of
  the bundle: the eCPC model's internals (training window, geographic
  waterfall, volume thresholds, datamart names, validation deltas),
  which belong to the semantic layer, and generic Google Ads product
  knowledge.

## 2026-09-02
* **Clarification**: a **search** means a search the user actually
  submitted. Searches triggered automatically — *autosearches* — are
  not user demand and are excluded from every search count, and so
  from STR, CTR and RPMSr. The two biggest sources are the result page
  re-running a search on its own to refresh prices after the user has
  sat idle on it, and batch searches launched server-side to fetch
  prices; a third reason code, covering ~26% of them, is not yet
  attributed to either and is deliberately not described. Stated in
  [data/metrics.md](/data/metrics.md)'s Searches row and in
  [core/business/funnel.md](/core/business/funnel.md)'s Search step,
  which previously said only "the user performs a flight search" and
  "number of searches made" — neither wrong, but neither excluding
  anything either. Source: domain owner.
* **Correction**: the exclusion is **not applied uniformly across the
  datamarts**, which is the part that silently breaks analyses.
  Session-based search counts already exclude autosearches upstream,
  so STR and CTR were always autosearch-free; search-level counts do
  not, until the `automaticSearch` flag is used. The same period
  therefore returns two different search totals depending on where it
  was counted — the unfiltered one higher by 5.9-7.1% over 2026-04 →
  2026-08 — so a searches figure quoted without the exclusion
  contradicts the STR and CTR published for the same period, with
  nothing to signal it. The share excluded is also unstable over time
  (6-9% of searches from 2025 through 2026-03, ~24% in April and May
  2026, back to 6-7% since July), which is enough to look like a trend
  on its own in a comparison where only one side is filtered. New
  section in [data/query-caveats.md](/data/query-caveats.md); enforced
  for agents and analysts as `R018` in the ClickHouse semantic layer
  skill. Verified against the datamarts on 2026-09-02.
* **New concept**: [data/operation-log-classification.md](/data/operation-log-classification.md)
  documents the shared part of operation-log classification — where each
  department's levers live, and the distinction between `unknown` and the
  new `manual_entry`. Until now the meaning of `unknown` was only recorded
  outside this bundle, so the distinction had no home in the business
  context at all. `unknown` means an automated source produced a row no
  rule could classify (a backlog item); `manual_entry` means a person
  declared a one-off operation that has no recurring lever type (a
  terminal, correct state). They were previously the same value, which
  made the `unknown` share unreadable as a measure of outstanding
  classification work. Prompted by the arrival of hand-declared
  operations, for systems that expose no API to read their changes back.
* **New department**: `media` now appears in operation logs, alongside
  marketing, commercials, tech and product. Its business content already
  lives in [core/media/index.md](/core/media/index.md); what's new is that
  operations on it are tracked. No lever taxonomy yet — values get
  documented once a lever is seen to recur, not ahead of the data.

## 2026-09-01
* **Clarification**: a Virtual Interline click always points to a
  **single partner** — the user lands on one partner, which sells the
  whole combination and handles issuing/managing the two separate
  tickets. The click is never split across the carriers involved, so
  from a revenue perspective a VI click behaves like any other click
  on that partner (same commercial model, same attribution). This
  replaces the previous bullet in [core/product/flights.md](/core/product/flights.md),
  which said VI clicks "may involve multiple partners and require
  specific attribution logic" — misleading, since the multi-airline
  nature of the itinerary is the partner's problem, not Jetcost's
  attribution problem. Source: domain owner.

## 2026-08-31
* **Correction**: fixed a long-standing documentation error on
  `revenueOperational`'s default rule. It was previously described
  here as a floor at zero (`MAX(revenueCurrent, 0)`); per the domain
  owner, that never reflected actual behaviour — the default rule is,
  and has always been, `revenueOperational = revenueCurrent`, no
  floor, for every partner and click type. Separately, and this part
  is a real system change: `LMNNEXT` flight clicks that generated a
  booking use a new redistribution logic since 2026-06-01, actual
  revenue spread across clicks by the shape of the theoretical
  commission (`theoretical_commission × boost`, `boost` a 30-day
  trailing average per country cluster, recalculated daily), which is
  never negative by construction. Every other `LMNNEXT` click still
  follows the default rule. Documented in
  [data/revenue-fields.md](/data/revenue-fields.md) (rewritten `revenueOperational`
  section: default rule, `LMNNEXT` carve-out, the residual gap vs.
  `revenueCurrent`, and the 2026-06-01 discontinuity in any table
  spanning that date) and [core/commercials/cpa-model.md](/core/commercials/cpa-model.md) (AMC3
  section). Source: commercial team's change notice email
  (2026-08-31) plus a follow-up correction from the domain owner on
  the pre-existing default-rule description.
* **Addition**: Added `update_abtest_rules` to `product`'s
  [levers.md](/core/product/levers.md), and updated `unknown`'s description
  to match — a scope/targeting change to an A/B test's
  website/country/language/device rules (one or more "Added Rule .../Removed
  Rule ..." log lines under admin3's `"Change Rules Recap"` info shape),
  distinct from `enable_abtest`/`disable_abtest`'s on/off status changes
  (`"Change Abtest Recap"`). This is exactly the "country/scope change" case
  `unknown`'s description already anticipated — confirmed against real data
  (22 of 79 `abtest-logs` rows, ~28%, previously falling into `unknown`).
  `agents/import-operation-logs/importers/abtest-logs.js` now dispatches on
  `record.info` (`classifyEvent`) instead of guessing purely off the log
  line's text shape. Also updated
  [core/product/index.md](/core/product/index.md)'s `levers.md` blurb to
  mention rescoping, not just enable/disable, and
  `skills/jc_operation_logs_skill/SKILL.md` §3.1's product row.

## 2026-08-26
* **Code change**: Split `agents/daily-report/db.js`'s inlined `fetchFunnel`
  (see the entry below this one for how it got there) into
  `fetchFunnelMetrics` and `fetchSemRevenue`. Per the domain owner, the
  query was still carrying its old generic-module shape after being
  inlined — device/paidVsNotPaid breakdown support, filter knobs, and a
  dozen metrics (`arpu`, `rpmsr`, `mixCPC`/`mixCPA`/`mixMalCore`, `crCPA`,
  `payoffCPA`, `ecpcCPC`, `ecpcMalCore`, `coreRevenueIndex`,
  `nonBounceRate`, `searchFrequencyRate`, `revenueCpc`/`revenueCpa`/
  `revenueMalCore`) that `commentary.js`/`country-summary.js` never
  actually read — none of which this single-caller agent needs. Traced
  every field this agent's code actually consumes from a funnel row
  (`sessions`, `revenue`, `costMktg`, `grossProfit`, `str`, `ctr`, `ecpc`,
  `cpcIN`, `clicksProRataGAds`, `rpms`, `cpms`, plus `date`/`country`) and
  found the SEM-scoped call sites read only `revenue`/`costMktg` — so
  `fetchSemRevenue` now computes just those two, as its own smaller query
  (no `str`/`ctr`/`ecpc`/etc. computed and discarded) rather than a
  `channelGroups` filter on the full query. Also dropped the three-level
  SELECT nesting the original needed to support arbitrary breakdown
  recombination — with the breakdown fixed to what this agent actually
  requests (by-date-and-country, by-country-only, or whole-business), one
  GROUP BY at the final grain produces identical numbers (verified: SUM
  over dictGet-based rates is associative regardless of grouping
  granularity) with two SQL levels instead of three. No output values
  changed — verified by rendering all four call shapes
  (`fetchFunnelMetrics` by-date and rolled-up, `fetchSemRevenue` by-country
  and whole-business) against a stubbed `query()` and checking the
  generated SQL by hand. Updated the domain references that named
  `fetchFunnel` ([data/metrics.md](/data/metrics.md),
  [core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md),
  [data/dimensions.md](/data/dimensions.md)) and the in-code comments in
  `commentary.js`/`dates.js` and `agents/daily-report/CLAUDE.md` that still
  named it.
* **Code change**: Retired `core/funnel/` entirely. Per the domain owner,
  the module (already touched earlier in this log for the
  `revenueCurrentReal`/`grossProfitReal` naming confusion) had exactly one
  caller — `agents/daily-report/db.js` — which is precisely the case root
  `CLAUDE.md`'s "don't create a new `core/{service}/` module for a
  single-source, single-endpoint integration" rule covers. Moved
  `fetchFunnel` (and its `DIMENSION_SQL`/`BREAKDOWN_DIMENSIONS` helpers)
  verbatim into `agents/daily-report/db.js` as a private function; deleted
  `core/funnel/index.js` and its dev-only `core/funnel/cli.js` (no
  replacement — the module being retired removed the reason to test it in
  isolation). No output changed: same SQL, same field names, same values.
  Updated every domain reference that pointed at `core/funnel/index.js`
  ([data/metrics.md](/data/metrics.md),
  [core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md),
  [data/dimensions.md](/data/dimensions.md)) to point at
  `agents/daily-report/db.js` instead, and updated
  `agents/daily-report/CLAUDE.md`'s data-model section and the in-code
  comments in `commentary.js`/`db.js` that still named the old path.
* **Correction**: [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md)
  carried a stale one-line characterization of the `userBased*` scope as
  "(first-touch, user-acquisition view)" — restated from before
  [data/attribution.md](/data/attribution.md)'s `userbased` section was
  itself corrected (see the entry below this one). Removed the
  parenthetical instead of re-describing the model a second time; the
  bullet now just points to `data/attribution.md`, the single source for
  what the model means.
* **Correction**: [core/business/deal-types.md](/core/business/deal-types.md)'s
  "CPA with Minimum CPC Floor" section described `min_cpc` as
  threshold-triggered — "guarantees a minimum fixed fee per click when CR
  falls below a defined threshold... behaves like a CPC deal for that
  period" — contradicting the more specific
  [core/commercials/cpa-model.md](/core/commercials/cpa-model.md), which
  states the floor is a continuous billing-level override (`Floor = clicks
  × min_cpc`, always computed and compared against `revenueCurrent`, never
  "activated" by a threshold). Rewrote the section to match, per the
  domain owner, and added the incentive-alignment framing they gave: the
  clause keeps optimisation pressure on the partner too — a partner that
  fails to optimise their own conversion flow still pays the floor even
  when Jetcost's own funnel performs, and in an efficient market CPA and
  CPA_MIN_CPC converge to the same outcome over the long run.
* **Correction**: [data/metrics.md](/data/metrics.md)'s `Revenues`
  definition excluded Data Monetisation ("Organic Core, MAL Core, MAL
  Media, and Display Media"), while
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md)'s
  `revenueCurrentProRataTotal` and
  [core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md)'s ROAS
  section both included it — a real split in the codebase, not just a
  docs slip: `core/funnel/index.js`'s `revenue` field (the one wired
  into `agents/daily-report`) never sums Data Monetisation, because
  that stream's pro-rata allocation is monthly-grain only while the
  funnel query runs daily. Per the domain owner, standardized the
  documented concept on **always including** Data Monetisation in
  `revenue` (it's a negligible amount at Jetcost's current scale, and a
  sometimes-in/sometimes-out definition is worse than a small constant
  addition), and flagged the `core/funnel/index.js` gap explicitly in
  both `data/metrics.md` and `core/marketing/sem/metrics.md` rather than
  silently changing what the field means. The domain owner intends to
  retire `core/funnel/index.js` in a separate effort; this gap is tracked
  there, not as a standalone query fix.
* **Code change**: `core/funnel/index.js` internally aliased its revenue
  and gross-profit CTE columns as `revenueCurrentReal`/`grossProfitReal`,
  then re-aliased them to `revenue`/`grossProfit` in the outer SELECT —
  the only names any caller ever saw. Per the domain owner,
  `revenueCurrentReal` had to go: it reads like a real semantic-layer
  column (`revenueCurrentCore`, `revenueCurrentMalCore`, etc. are real
  datamart fields — see `skills/jc_clickhouse_semantic_layer_skill`) but
  isn't one, and the two-name detour was exactly the kind of confusion
  this log's other entries above were already correcting in the docs.
  Renamed the internal CTE columns to `revenue`/`grossProfit` directly,
  collapsing the double-aliasing; no external field name or computed
  value changes. `revenueCurrentReal`/`grossProfitReal` no longer appear
  anywhere in the repo.
* **Creation**: Added an "App Marketing Cost Reads Zero — By Design, Not
  By Gap" section to [data/query-caveats.md](/data/query-caveats.md).
  Verified on `datamart.jc_sessions_datamart_view`: `costProRataMktg` and
  `clicksProRataGAds` are exactly `0` on `platform IN ('android', 'ios')`
  every month from 2026-02 through 2026-08, web absorbing 100% in each —
  a structural zero, distinct from the generic "no allocation rate for
  this slice" zero already documented in
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md). Per the
  domain owner: three app engagement paths tie back to a paid campaign
  without ever carrying their own cost share — W2A installs/reopens (the
  web `gclid` propagates into the app session, but the app touchpoint is
  excluded at cost-attribution time), OIA reopens (no web session
  involved at all, yet the campaign's cost is still allocated only
  across its web sessions), and app-install campaigns (not yet correctly
  tracked as of this date). Cross-linked from
  [data/pro-rata-allocation.md](/data/pro-rata-allocation.md)'s Marketing
  Cost section, whose "safe by Platform" bullet could otherwise be read
  as implying app gets its own cost share.
* **Correction**: [data/attribution.md](/data/attribution.md)'s `userbased`
  section wrongly characterized the model as pure first-touch ("attributes
  the booking to the first touchpoint of the user, not the last"). Verified
  against `userBasedCluster`/`userBasedClusterDebug` on
  `datamart.jc_sessions_datamart_view` (last 7 days) and a flow chart
  provided by the domain owner: the model is last-click on the current
  session by default (New Paid/Returning Paid credit the current session),
  falling back to a first-touch read only when the current session isn't
  paid but the user's first session was (Marketing-Driven) — the opposite
  priority from what the old text implied. Added the six `userBasedCluster`
  bucket names and the web-to-app (W2A) behavior: an app session opened via
  a W2A install inherits its attribution from the underlying web session(s)
  rather than being read on its own. Kept the exact branch mechanics (13
  debug cases) out of `domain/`, per the business-concept-vs-mechanism
  authoring rule in the bundle's `_meta/` conventions — added there instead
  to `skills/jc_clickhouse_semantic_layer_skill/attributes.yml`'s
  `userBasedCluster` comment, which previously only documented the
  Unconsented (98/99) branches, not the other 11.

## 2026-08-24
* **Fix**: [data/pro-rata-allocation.md](/data/pro-rata-allocation.md) — the
  MAL Core row of the "Why some streams need it and others don't" table
  wrongly justified it with "sold to backfill/ad-tech networks, not
  invoiced per click" — that's MAL Media's mechanism, not MAL Core's.
  [core/commercials/mal/overview.md](/core/commercials/mal/overview.md),
  [core/commercials/integration-types.md](/core/commercials/integration-types.md),
  and [core/business/revenue-streams.md](/core/business/revenue-streams.md)
  all agree MAL Core is a direct integration sold to an identifiable
  partner (same `groupCode`/`partnerCode` as that partner's Core clicks)
  and it's MAL Media that's network-delivered with no partner identity —
  a distinction already corrected once before, in the opposite direction,
  on 2026-07-31. The row now cites MAL Core's real reason instead:
  `revenueCurrentMalCore` exists as a direct column on clicks/searches
  (priced as a placement fee separate from the partner's CPC/CPA rate,
  per `mal.md`) but has no non-pro-rata counterpart on the sessions
  datamart, unlike `revenueCurrentCore`. Flagged by `semantic-checker`.
* **Fix**: [data/dimensions.md](/data/dimensions.md) — the Device
  section pointed at the wrong raw field. It named `deviceType` as
  Device's raw field and used `context = app` + `deviceType = tablet`
  as the example of Platform/Device independence. Verified on
  `datamart.jc_sessions_datamart_view`: `deviceType` has no `tablet`
  value at all and is perfectly nested with `context` (only
  `app`/`app`, `web`/`desktop`, `web`/`mobile` occur across
  2025-01-01 to 2026-08-15), so that combination could never happen —
  because `deviceType` is actually a *derived* field that folds
  Platform into the device form factor (`context = app` always
  collapses to `deviceType = app`; `context = web` sessions get
  `desktop`/`mobile`, with `tablet` rolling into `desktop`). The
  true, Platform-independent device-form-factor field
  is `device` (values: `desktop`/`phone`/`tablet`), and on that field
  the original business point holds: `context = app` +
  `device = tablet` is real (~44k sessions observed 2026-01-01 to
  2026-08-15). Device's section now documents `device` as its raw
  field and calls out `deviceType` as a distinct, non-independent
  derived attribute instead of conflating the two.
* **Creation**: [core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md) —
  added a "Two ROAS numerators" section explaining that whole-business
  ROAS (Core + MAL + Media + Data Monetisation, the `revenue` default)
  is the wrong base for judging Google Ads bid calibration: its bid
  strategies only ever see Core and MAL Core Click Signals as
  conversions (per [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md)),
  so a whole-business ROAS can look like "bidding is working" purely on
  Media revenue the algorithm never touched. Paired with a new
  `ROAS Pro Rata - Full Core` computed metric (Core + MAL Core only)
  in `skills/jc_clickhouse_semantic_layer_skill/computed.yml`. Also
  added query rule R017 in that skill's `query-rules.yml` — generalised
  beyond ROAS after review: "Core" is overloaded across the whole
  semantic layer (Organic Core only as a field-name component vs.
  Organic Core + MAL Core as the business macro-category and as this
  glossary's "Full Core"), so R017 requires always disambiguating which
  scope a "Core" answer covers — for ROAS, clicks, revenue, or any
  other Core-based metric — rather than defaulting silently one way,
  plus the `revenueCurrentMalCore` (searches/clicks) vs
  `revenueCurrentProRataMalCore` (sessions) naming trap noted there.
  Verified
  against `datamart.jc_sessions_datamart_view`, paid-search
  2026-07-17 to 2026-08-15: desktop 115.7% whole-business vs 88.5%
  Full Core, mobile 94.2% vs 81.6%, and on FR desktop crosses the 100%
  ROAS bid target in opposite directions depending on the numerator
  (130% vs 85%) — a decision-changing gap, not a rounding difference.
* **Rename**: "Super Core" → "Full Core" across the bundle — the
  business has standardised on "Full Core" for the Organic Core + MAL
  Core concept (revenue and clicks alike), so every occurrence of
  "Super Core" in current domain content was renamed to match:
  [data/metrics.md](/data/metrics.md)'s "Full Core Clicks" volume
  (formerly "Super Core Clicks"), its Mix CPC/CPA and blended-eCPC
  formulas, [data/index.md](/data/index.md)'s metrics table, and
  `domain/_meta/conventions.md`'s declinations example, plus this same
  session's new `ROAS Pro Rata - Full Core` metric/rule/doc above (not
  yet committed under the old name). Historical `domain/log.md` entries
  that pre-date the rename (e.g. 2026-08-13's "Introduced Super Core
  Clicks...") are left as-is — they record what the concept was called
  at the time, not what it's called now.

## 2026-08-20
* **Creation**: Added [data/pro-rata-allocation.md](/data/pro-rata-allocation.md) —
  the business concept behind pro-rata allocation: why MAL Core, MAL
  Media, Display Media, Data Monetisation revenue, and all Marketing
  Cost (`costMktg`/`costProRataMktg`, GAds Cost/Clicks) are spread
  onto sessions rather than measured directly (only Organic Core has
  real per-click `revenueCurrent`), and why a pro-rata figure reading
  zero is ambiguous (no rate configured for that slice vs. genuinely
  nothing happened) rather than a settled fact. Includes a per-stream
  breakdown of which dimensions each allocation is safe to read by —
  MAL, Display Media's two combined allocations, Data Monetisation
  (flagged as the sharpest case: monthly grain, no Country/Device
  split at all, so a daily or per-country read of it is meaningless
  by construction), and Marketing Cost's two combined allocations —
  verified empirically against
  `datamart.jc_sessions_datamart`/`_view` via the ClickHouse MCP
  connector: MAL's allocation carries no separate web-vs-app field
  but still zeroes out MAL Media on app because app traffic gets its
  own dedicated site value; the GAds-specific cost allocation keys on
  the user's geo-IP country, not the market-level `country` field the
  rest of the bundle uses; `device`/`deviceType` are two different
  raw fields that draw different lines depending on which allocation
  uses them, flagged as a cross-cutting caveat rather than papered
  over. Deliberately keeps the allocation formula itself (the
  `dictGet` rate-table lookups) out of `domain/` — that detail stays
  in `skills/jc_clickhouse_semantic_layer_skill` only. Confirms
  `costMktg` is entirely a pro-rata figure, not a separately-tracked
  cost; [data/metrics.md](/data/metrics.md)'s Marketing Cost row now
  cross-links here. Indexed in [data/index.md](/data/index.md).

* **Correction**: Tightened the authoring-tooling-directory rule this
  bundle's conventions doc carries — no file outside that directory
  may name it at all, in any form, not just link to it; a plain
  backtick citation was previously allowed and no longer is, because
  it's still a trace of this bundle's own authoring history sitting
  inside content whose job is to state business facts. Purged the
  resulting references from every current-state file that had one:
  the bundle root's own overview, [data/metrics.md](/data/metrics.md)
  (twice), and the file just added above. Reworded this same date's
  entries above to match.

* **Correction**: Renamed "Costi Marketing" to **Marketing Cost** as
  `costMktg`'s English business name in
  [data/metrics.md](/data/metrics.md), [data/index.md](/data/index.md),
  and the file just added above — the Italian name violated this
  repo's English-only rule for domain content (see the root
  `CLAUDE.md`'s "Language" section). Left untouched in this log's own
  older entries below, which describe what was true at the time they
  were written, same treatment as the earlier "CPC Medio" → "Average
  CPC" rename.

* **Correction**: Unlike the rename above, the authoring-tooling-directory
  rule tightened two entries up is a rule about what may exist in
  this log's own text, not just a naming preference — so, unlike
  "Costi Marketing," its older violations elsewhere in this same file
  were reworded rather than left standing: every remaining named
  citation of that directory or its files, in the 2026-08-17,
  2026-08-13, and 2026-07-22 entries below, now describes the same
  fact in prose instead ("the bundle's authoring conventions," "an
  authoring rule," "that directory"). No entry's substance changed,
  only whether it names something that must never appear outside the
  directory itself.

## 2026-08-18
* **Creation**: Added `asset-upgrade` as a new `internal_event_type` in [core/marketing/sem/levers.md](/core/marketing/sem/levers.md), for Google Ads `CAMPAIGN` events toggling "AI Max" asset automation (`aiMaxSetting.enableAiMax` plus the accompanying `assetAutomationSettings` OPTED_IN/OPTED_OUT entries, which move in lockstep with that one boolean and aren't reported separately) — previously fell through to `unknown`. `agents/import-operation-logs/importers/gads.js`'s `LEVER_RULES.CAMPAIGN` gained the matching rule in the same change.

* **Creation**: Added `campaign-status-change` as a new `internal_event_type` in [core/marketing/sem/levers.md](/core/marketing/sem/levers.md), for Google Ads `CAMPAIGN` `status` changes (`ENABLED`/`PAUSED`/`REMOVED`) — previously fell through to the generic `unknown` fallback with a raw field-diff summary (e.g. "UPDATE CAMPAIGN ... — status: PAUSED → ENABLED"). One type covers both directions (pause and enable), with old → new in the row's own summary rather than split into direction-specific types, matching how `tcpa-adjustment`/`budget-adjustment` already handle their own before/after values. `agents/import-operation-logs/importers/gads.js`'s `LEVER_RULES.CAMPAIGN` gained the matching rule in the same change.

## 2026-08-17
* **Creation**: Added a "Country Cluster" section to [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md) — reverses the 2026-08-13 entry's decision to drop "country cluster" as a candidate dimension for lack of a verifiable field, now that `sessionCampaignCountryCluster`/`sessionContentCountryCluster`/`userBasedCampaignCountryCluster`/`lastClickNotDirectCampaignCountryCluster` exist in `skills/jc_clickhouse_semantic_layer_skill/computed.yml`, one per attribution scope, each grouping the market-locale (`*CountryDetail`) into macro clusters (LATAM, GERMANIC, NORDICS, OTHER-EU, RoW, plus single-market clusters) of countries similar enough in user behaviour to analyse together. The clustering formula itself stays in `computed.yml` only, per the bundle's business-concept-vs-mechanism authoring rule.

* **Correction**: Fixed two `semantic-checker` `okf_conformance`/`domain_integrity` findings on this file. Merged the eleven numbered `## 2026-08-13 (N)` sub-headings (plus the stray unnumbered `## 2026-08-13` further down) into a single `## 2026-08-13` heading with all that day's entries as bullets underneath, and renamed `## 2026-08-14 (1)` to `## 2026-08-14` — OKF §7 requires a bare ISO 8601 `YYYY-MM-DD` heading per date, with same-day entries grouped as bullets under it, not split into per-entry sub-headings. Reworded the 2026-08-13 entry describing the authoring-tooling link-removal fix, which spelled out an example link into that directory in bracket-then-paren form inside backticks — a code span isn't a real link to a human reader, but `domain-integrity.js`'s link checker matches link-shaped text with a raw regex regardless of backticks, so it read as a broken link into a directory never loaded at runtime. Also updated two now-dangling numbered cross-references (`(4) and (9)`, `(3)-(7)`) left over from the old sub-heading numbering. See the repo root `CLAUDE.md`'s "Domain content hygiene" rule, added at the same time, for the authoring rules that prevent both recurring.

## 2026-08-14
* **Correction**: Fixed [data/analysis-types.md](/data/analysis-types.md)'s WoW
  definition — it read "same week one year prior," which is what this file
  defines MoM to conventionally mean, not WoW. WoW compares a week against
  the *immediately preceding* week, consistent with
  `jc_date_utils_skill`'s actual implementation (`getPreviousWTDRange`, the
  "Weekly Report" example subtracting 7 days) and with why
  [data/seasonality.md](/data/seasonality.md) warns that a holiday window
  can produce a misleading WoW read — that warning only makes sense if WoW
  is adjacent-week, since a same-week-last-year comparison would largely
  cancel out holiday timing instead. Caught while setting up the
  `jc-data-analyst` Claude Project.

## 2026-08-13
* **Creation**: Added [core/marketing/sem/dimensions.md](/core/marketing/sem/dimensions.md) — marketing's first function-owned dimensions file (Campaign, Campaign Type, Source, Local vs Ext, Bidding Strategy/Type), the SEM counterpart to [core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md). Applies the same declination rule used for `data/metrics.md`: Campaign/Campaign Type/Source/Local-vs-Ext each exist as several raw fields (`sessionCampaign*`, `lastClickNotDirect*`, `userBased*`) — one per attribution scope, not several distinct dimensions. `sessionCampaign` is last-click attribution scoped to the session itself (distinct from the two cross-session models it's read alongside, `lastclicknotdirect`/`userbased` from [data/attribution.md](/data/attribution.md), which attribute a booking rather than a session). Cross-links the existing "Campaign Types" taxonomy in [core/marketing/sem/index.md](/core/marketing/sem/index.md) instead of restating it. Explicitly dropped two candidate dimensions (`campaignCluster`, "country cluster") that couldn't be verified against any field in the codebase or ClickHouse semantic layer skill. Indexed in [data/index.md](/data/index.md)'s Dimensions Index.

* **Correction**: Deleted the "Modeled Revenue" section from [data/metrics.md](/data/metrics.md) entirely — flagged "unconfirmed against code" in earlier entries above (the same day's metrics.md verification and cleanup), and confirmed by the domain owner not to exist. Not moved anywhere; recoverable from git history if ever needed.

* **Correction**: Major cleanup of [data/metrics.md](/data/metrics.md) — reversed the previous "declinations stay in data/" stance (see the earlier entries above, same day) after realizing it was wrong: `paidSessions`/`notPaidSessions`, `sessionsWithSearchFlight`/`Car`/`DynamicPackage`, `clicksCore`/`clicksMalCore`, `clicksCoreModelCpc`/`clicksCoreModelCpa`, `revenueCurrentCore`/`Cpc`/`Cpa`/`MalCore`/`MalMedia`/`Media`, GAds Clicks/Cost, `crCPA`, `payoffCPA`, `ecpcCPC`, `ecpcMalCore`, `mixMalCore`, `nonBounceRate`, and `searchFrequencyRate` are all "a shared metric at one value of a dimension," not concepts of their own — whether a datamart precomputes that slice as its own column or requires a filter is an implementation choice that varies by datamart, so documenting it in `domain/` bakes in one datamart's schema as a business fact. Removed the entire "Raw Field Reference" declination catalog. Kept only true metrics independent of any datamart: the funnel volumes/rates (now including a proper **Gross Profit** section, previously undocumented as its own concept) and a small "Other Independent Metrics" set (RPMS, RPMSr, CPMS, CPS, blended eCPC, `cpcIN`) that are named business ratios someone asks about directly, confirmed to stay per user review. Updated the bundle's "declinations" authoring rule to match (it previously said the opposite). Fixed dangling `crCPA`/`payoffCPA` references in [data/query-caveats.md](/data/query-caveats.md) and [data/revenue-fields.md](/data/revenue-fields.md) to point to the surviving CR/Payoff names.

* **Correction**: Removed three clickable links into the bundle's authoring-conventions doc from bundle content ([data/dimensions.md](/data/dimensions.md), [data/index.md](/data/index.md), and one `log.md` entry). Added a new rule to that doc itself: the authoring-tooling directory it lives in is never loaded into an agent's runtime context, so no file outside it may link into it — a link implies "follow this," but at runtime it resolves to nothing.

* **Creation**: Added [data/dimensions.md](/data/dimensions.md) — the common breakdown dimensions (Country, Device, Platform/web-vs-app, Traffic Type), their raw field names, and how they combine. Prompted by `core/funnel/index.js`'s `BREAKDOWN_DIMENSIONS` having no business-meaning counterpart. Clarifies a real distinction found while investigating: `deviceType` (device form factor — phone, desktop, tablet, connected TV, with rare types clustered into "desktop") and `context` (web vs app) are independent dimensions that combine (e.g. app + tablet), not one subsuming the other — `core/product/web-vs-app.md` doesn't cover this yet (it's a stub). Indexed in [data/index.md](/data/index.md)'s new Dimensions Index, alongside `data/sessions-and-users.md` and `data/attribution.md` as the other existing shared dimensions.

* **Correction**: Renamed `clicksProRataGAds`/`costProRataGAds` in [data/metrics.md](/data/metrics.md) to business names **GAds Clicks**/**GAds Cost** — the pro-rata allocation is a semantic-layer implementation detail, not part of the business concept, and shouldn't be the headline name in `domain/`.
* **Creation**: Added the previously-missing `qualifiedSession` field to [data/metrics.md](/data/metrics.md)'s Session base fields — the mandatory filter every other field on that page is already computed under — linked from [core/business/funnel.md](/core/business/funnel.md)'s existing "qualified sessions" explanation.
* **Creation**: Added a "Business concept vs. implementation mechanism" authoring rule: `domain/` cites a field's business name and raw field name, never *how* it's computed (filters, joins, allocations) — that's the ClickHouse semantic layer skill's job. Generalizes both the `qualifiedSession` and GAds Cost/Clicks fixes above into a reusable test.

* **Correction**: Fixed [data/revenue-fields.md](/data/revenue-fields.md)'s "Actual Revenue" note, added earlier the same day — wrongly claimed it was informal language for `revenueCurrent`. It's a real, distinct figure: billing/invoicing revenue from finance systems, entirely outside any ClickHouse datamart, aggregated at a much coarser grain than the click-level fields this file documents (no per-date/country/device breakdown), which is why it can't be reconciled against `revenue`/`revenueCurrent` directly.

* **Correction**: Verified `data/metrics.md`'s Raw Field Reference against the actual code it claims to document (`core/funnel/index.js`), not just the separate ClickHouse BI semantic layer skill, and fixed several drifts found in the process:
  - Renamed "CPC Medio" to **Average CPC** (bilingual naming, no field impact).
  - Removed `sessionsWithSearchDirect` as if it were its own ClickHouse column — it's a query-level rename `core/funnel/index.js` applies to the raw `sessionsWithSearch` datamart column, not a distinct field. Folded the explanation into the `sessionsWithSearch` bullet.
  - Introduced **Super Core Clicks** as the business name for `clicksCore + clicksMalCore` (the code's own `clicks` variable) — deliberately not reusing "Core" (the revenue-streams.md macro-category, same set of clicks but a different context) or `clicksCore` (Organic Core only, a different set). Added a note that a true all-placements click total (including MAL Media) isn't currently computed by the funnel module.
  - Renamed `revenueCurrentReal`/`grossProfitReal` to **`revenue`**/**`grossProfit`** — those are internal SQL aliases inside `core/funnel/index.js`; the field names any caller actually receives are `revenue`/`grossProfit`.
  - Fixed `rpms`/`rpmsr`, which were documented using the modeled `revenues` — the code (lines 154-155) uses the real `revenueCurrentReal` (now `revenue`).
  - Flagged the "Modeled revenue" section (`revenuesCore`/`revenues`/`grossProfit`) as unconfirmed against code — not found anywhere in the repo — and renamed its outputs to explicit `revenuesModeled`/`grossProfitModeled`/`clicksModeled` so they can't collide with the now-unsuffixed real fields, pending a separate check of whether that section reflects anything actually implemented.
* **Creation**: Extended [data/revenue-fields.md](/data/revenue-fields.md) — which already covered `revenueCurrent`/`revenueEcpc`/`revenueOperational` at the click level — with how the funnel-level `revenue` metric rolls up from `revenueCurrent` (plain `SUM`, same caveats), and a note that "Actual Revenue" (seen in `agents/pcl-report` and `agents/daily-report` footers) is informal reporting language for `revenueCurrent`/`revenue`, not a distinct fourth field — no `revenueActual` exists anywhere in the codebase.

* **Creation**: Added a "Funnel Volumes" section to [data/metrics.md](/data/metrics.md) — Sessions, Searches, Clicks, Conversions, Costi Marketing, Revenues (`revenueCurrentReal`) — as the base counts behind the existing rates (STR, CTR, CR, Mix CPC/CPA, CPC Medio, Payoff), completing the "main funnel" set per the new shared-vs-function-owned convention. Also added the previously undocumented `searches` raw field (used throughout the file's formulas but never itself defined).
* **Creation**: Turned [data/index.md](/data/index.md) into a real metric index — a table mapping each metric to its owning file — instead of a plain file list, per the new authoring rule that shared funnel metrics live in `data/metrics.md` and function-owned ones (e.g. marketing's ROAS/GP/CPA mktg/RPA) live in the function's own `metrics.md`.

* **Correction**: Applied the new "core explains, config is a lever" convention to [config/features/detail-card.md](/config/features/detail-card.md) and [config/features/mobile-app-detail-page.md](/config/features/mobile-app-detail-page.md) — both had re-stated the CPA/CPC business rationale that now lives solely in [core/product/detail-page.md](/core/product/detail-page.md), which is the exact class of duplication that caused the previous entry's contradiction. Trimmed both feature files to their mechanical description plus a link up to `detail-page.md`; added the missing links down from `detail-page.md` to both flags.

* **Correction**: Fixed [config/features/detail-card.md](/config/features/detail-card.md), whose CPA/CPC deployment rule was stated as a blanket market-level fact, contradicting [core/product/detail-page.md](/core/product/detail-page.md)'s placement × market table (which shows Sponsored has no detail page in any market, including CPA-heavy European ones). Clarified the missing mechanism: the detail card only ever applies to Core offers — MAL-Core (Sponsored) deals are always CPC, so the conversion-quality trade-off doesn't apply to them and they never carry a detail card — and that actual availability is always governed by the ENABLED flag rather than an automatic CPA/CPC rule. Added the same explanation to `detail-page.md`'s Clickout Mode table. Prompted by a `semantic-checker` finding.

## 2026-08-12
* **Creation**: Added `product` as a `core/` function with its own operation-logs taxonomy — [core/product/levers.md](/core/product/levers.md), documenting `enable_abtest`/`disable_abtest` (plus `unknown`) for the new `abtest-logs` source/`product` department. `agents/import-operation-logs/importers/abtest-logs.js` now writes these values instead of the `unknown` placeholder, reading admin3's `/api/abtest/logs` endpoint the same way `commercial-logs.js` reads `/api/commercials/activation-logs`.
* **Correction**: Gave [core/product/index.md](/core/product/index.md) a real `## Files` listing (OKF §6) — it was pure prose that linked none of its own concept files (`detail-page.md`, `features.md`, `flights.md`, `sorting.md`, `web-vs-app.md`, `w2a/`), the same "prose misusing the reserved `index.md` filename" anti-pattern already fixed for the bundle root and `core/business/` on 2026-07-22. `core/tech/index.md`, `core/marketing/index.md`, and `core/product/w2a/index.md` have the same gap and are not yet fixed.

## 2026-08-11
* **Creation**: Added a "Dynamic Package: Active Window Only" caveat to [data/query-caveats.md](/data/query-caveats.md) — DP was live only between 2023-07-19 and 2025-09-30 (~58.5k searches total), with no data before or after, while `FLIGHT`/`CAR` run to date. A DP metric reading zero for a recent period is therefore expected and must not be reported as a drop; a period straddling 2025-09-30 mixes active and inactive months. Window confirmed during review, not inferred from the data alone. Also records that the `destinationCountry` column — which looks like it should carry the DP destination — is always NULL by construction (a hardcoded NULL literal in `jetcost-bi`'s `modeled_jc_searches_data.sql`, a placeholder never wired), empty even on DP rows; DP origin/destination live in `countryFrom`/`countryTo` like flights.
* **Correction**: Completed [data/query-caveats.md](/data/query-caveats.md)'s UK/GB country-code split, previously verified only against `jc_clicks_datamart` and only for four fields. Re-verified on 2026-08-11 across all five datamarts (`sessions`, `searches`, `clicks`, `impressions`, `users`): the market/user family (`country`, `countryUser`, `firstSessionCountry`, `firstSessionCountryUser`, `appOpening*Country*`) uses `UK`, the route/car family (`countryFrom`, `countryTo`, plus the previously undocumented `pickupCountry`/`dropoffCountry`) uses `GB`. Added that the split is **per field, not per row** — no column holds both codes — and two consequences that were missing: anything derived from a route field inherits `GB` (a country-level route reads `GB-IT`, never `UK-IT`), and comparing two market/user fields needs no normalisation at all. Prompted by an automated check on `skills/jc_clickhouse_semantic_layer_skill/`: the rule existed in `domain/` but had never been carried into the semantic layer, which could therefore emit silently-wrong UK queries. Now enforced there as `R015`.
* **Creation**: Added `tech` as a sixth `core/` function ([core/index.md](/core/index.md)) — engineering operations with business impact (code releases, infrastructure/security configuration), distinct from the other five in that its events aren't a lever pulled on purpose, they're a common explanation for an *unintended* change elsewhere. Added [core/tech/index.md](/core/tech/index.md) and [core/tech/levers.md](/core/tech/levers.md), documenting the one value tracked today (`release`, from `gitlab`/`TAG`) — deliberately doesn't invent entries for known-future sources (e.g. Cloudflare firewall rules) that have no operation-logs importer yet. `gitlab.js` now writes `internal_event_type: 'release'` instead of the `unknown` placeholder.
* **Creation**: Added [core/marketing/sem/levers.md](/core/marketing/sem/levers.md) — the SEM levers marketing actively manages (tCPA, device bid adjustment, budget) with their business effect, plus two non-lever technical events (`bidding-strategy-change`, `rename`) and the `unknown` fallback. Moved the "Bid Management Levers" section out of [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md) (which keeps bid strategies, bid management methodology, and conversion tracking) — deliberately excludes derivation/matching detail (that lives in code, see `LEVER_RULES` in `agents/import-operation-logs/importers/gads.js`) and formulas (already in [metrics.md](/core/marketing/sem/metrics.md)).
* **Creation**: `levers.md`'s frontmatter enumerates the `internal_event_type` values (`budget-adjustment`, `device-bid-adjustment`, `tcpa-adjustment`, `bidding-strategy-change`, `rename`, `unknown`) that `agents/import-operation-logs/importers/gads.js` now writes to `jc_operation_logs_data`/`jc_operation_logs_summary_data` on ClickHouse. `gitlab`/`commercial-logs` sources have no taxonomy yet and always write `unknown`.

## 2026-08-05
* **Correction**: Added `data/query-caveats.md`'s UK/GB country-code split — `country`/`countryUser` (market/site, user geo-IP) use `UK`, the one non-ISO exception across ~38 markets; `countryFrom`/`countryTo` (route geography) use the real ISO code `GB`. Verified against `jc_clicks_datamart`: filtering or joining across the two groups on the same literal silently breaks for the UK specifically. Cross-linked from [core/business/markets.md](/core/business/markets.md).
* **Creation**: Added [core/commercials/partner-splitting.md](/core/commercials/partner-splitting.md) — documents "artificial partners": when a deal needs differentiated economics on a dimension the registry doesn't support natively (web vs. app, local vs. non-local traffic), Jetcost registers multiple `partnerCode`s for one real counterparty, each independently priced, activated mutually exclusively per scenario. Verified example: `SMARTFARES_US`/`SMARTFARES_NONUS` — non-overlapping `countryUser` populations. Corrected the "Channel variants" note in [config/partners/index.md](/config/partners/index.md), which previously described these suffixes as just a tracking tag for the same deal — they can carry independent terms.

## 2026-07-31
* **Correction**: Fixed the min_cpc floor model in [core/commercials/cpa-model.md](/core/commercials/cpa-model.md) — revenue on `CPA_MIN_CPC`/`CPA%_MIN_CPC` deals was previously modeled as `clicks × max(min_cpc, effective_cpc)`, treating the floor as what's observed. Corrected to: `revenueCurrent` is always the CPA reality; `minCpc` is a separate billing-level override to be compared against it (`Δ = floor − produced`), not merged into the revenue figure. Explicitly scoped to `cpcSource = 'ecpc_min'` partners only — plain CPA/CPA%/RS have no floor and no comparison to make. Prompted by a colleague's domain proposal (Dario Simeoni, Revenue & Commercial) that caught this inversion.
* **Creation**: Added [core/commercials/integration-types.md](/core/commercials/integration-types.md) — the `integrationType`/`integrationSubType` taxonomy verified against `jc_clicks_datamart`, distinguishing direct integrations (`CORE`/`STANDARD`, `TRAILINGTAB`, `PROMOBOX`/MAL Core — real `groupCode`/`partnerCode` identity) from network-sourced clicks (`CORE`/`BACKFILL` — content from other metasearches, verified: `KAYAK`, `VIAJALA`, `SKYSCANNER`; and MAL Media — delivered through ad-tech networks, no partner identity at all). Notes that `KAYAK` plays two distinct, unrelated roles — a negotiated CPA partner and a `BACKFILL` content source — to prevent conflating them.
* **Creation**: Added a "groupCode / partnerCode taxonomy" section to [config/partners/index.md](/config/partners/index.md) documenting the *mechanism* (multi-brand OTA resellers, airlines bundled under one technical umbrella, `_APP`/`_VI`/`_VI_APP` channel-variant suffixes) with verified examples (`ETRAVELI` → 42 partnerCodes, `METACONNECT` → ~32 airlines, `ODIGEO` → 8, `LMNNEXT` → 14) rather than an exhaustive list — the live registry remains the source of truth for the full mapping.
* **Creation**: Documented Clickout Mode in [core/product/detail-page.md](/core/product/detail-page.md), previously a stub — detail-page presence by market/placement and its consequences for comparability, time series, and metric choice.
* **Correction**: Fixed [core/commercials/mal/overview.md](/core/commercials/mal/overview.md) and [core/business/revenue-streams.md](/core/business/revenue-streams.md), which described MAL Media as "sold directly with partners" — it isn't. MAL Media is delivered through ad-tech networks (Clicktripz-style) with no partner identity in the data, structurally different from MAL Core (which does carry the same partner identity as that partner's Core clicks).
* **Creation**: Added [data/revenue-fields.md](/data/revenue-fields.md) explaining what `revenueCurrent`, `revenueEcpc`, and `revenueOperational` each actually measure at the click level: `revenueEcpc` is the click-time estimate (real CPC for CPC deals, cpc-calculator moving-average estimate for CPA, currently set to `minCpc` for floor deals as an implementation choice of the calculator, not a guaranteed identity); `revenueCurrent` is booking-report-consolidated revenue, back-filled with `revenueEcpc` while a partner's report is lagging; `revenueOperational` floors negative revenue at 0 for marketing/AB-test use and is out of scope for commercial reading. Lives in the shared data layer rather than `cpa-model.md` since the distinction applies across deal types, not just CPA. Cross-linked from `cpa-model.md` (including the AMC3 section, where `revenueOperational` would understate `LMNNEXT`'s real loss periods), [config/partners/index.md](/config/partners/index.md) (the CPA-lag fill mechanism), and [data/query-caveats.md](/data/query-caveats.md) (the general, shorter-window version of the same lag).

## 2026-07-23
* **Creation**: Added a new CPA sub-type, AMC3 — Margin Share (Inter-Company), to [core/commercials/cpa-model.md](/core/commercials/cpa-model.md): Jetcost is paid the partner's own margin on the booking, which can be negative — unlike every other sub-type in that file. Cross-linked from `LMNNEXT`'s entry in [config/partners/index.md](/config/partners/index.md) as the mechanism behind its unusually large swings.
* **Creation**: Added a "Known CPA-lag partners" section to [config/partners/index.md](/config/partners/index.md) naming `LMNNEXT`, `DOHOP`, `KIWI`, `KAYAK` — the existing generic CPA-lag caveat in [partner-lifecycle.md](/core/commercials/partner-lifecycle.md) had no partner names attached to it.
* **Clarification**: Expanded [config/partners/index.md](/config/partners/index.md)'s `LMNNEXT` = ICO entry — ICO stands for "inter-company": `LMNNEXT` is a partner within Jetcost's own group, not an external arm's-length partner, which is the reason its revenue is volatile/subject to corrections.
* **Creation**: Added the first entry to [config/partners/index.md](/config/partners/index.md)'s previously-empty groupCode taxonomy — `LMNNEXT` = ICO, revenue known to be volatile/subject to corrections. Moved out of an agent-specific prompt (`agents/daily-report/commentary.js`) into domain content proper, loaded as context like any other business fact.
* **Clarification**: Resolved the open "revenue base unconfirmed" note on [core/marketing/sem/metrics.md](/core/marketing/sem/metrics.md)'s ROAS section — confirmed `revenueCurrentReal / costMktg * 100` as the formula, and documented META ROAS (unscoped) vs SEM ROAS (scoped to the `paid-search` channel group) as the same ratio at two scopes. Prompted by wiring both into `agents/daily-report`'s new per-country canvas commentary.

## 2026-07-22
* **Migration**: Adopted the Open Knowledge Format (OKF) for `domain/`. Added YAML frontmatter (`type`, `description`, `tags`, `timestamp`) to all concept files, and converted every cross-file reference into a real markdown link.
* **Creation**: Documented SEM bid-management levers and metrics — split `core/marketing/sem.md` into [sem/index.md](/core/marketing/sem/index.md), [sem/google-ads.md](/core/marketing/sem/google-ads.md), [sem/bing-ads.md](/core/marketing/sem/bing-ads.md), and [sem/metrics.md](/core/marketing/sem/metrics.md).
* **Restructure**: Renamed the bundle-root `index.md` and `core/business/index.md` to [overview.md](/overview.md) and [core/business/overview.md](/core/business/overview.md) — both were prose business overviews misusing the reserved `index.md` filename (OKF §3.1). Real directory-listing `index.md` files now exist in their place.
* **Creation**: Established this log.
* **Creation**: Added `core/media/` as a fifth core function — advertising and data revenue, independent of the click funnel. Expanded the former stub `core/product/mal.md` into [core/commercials/mal/overview.md](/core/commercials/mal/overview.md) (MAL is one initiative producing two revenue streams, MAL Core and MAL Media), and added `core/media/display-ads.md` (since split into GAM and AFS files) and [core/media/data-monetization.md](/core/media/data-monetization.md). Cross-linked from `core/business/revenue-streams.md`.
