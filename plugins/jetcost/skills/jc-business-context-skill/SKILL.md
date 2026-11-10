---
name: jc-business-context-skill
description: Complete business domain knowledge for Jetcost, a flight metasearch company — revenue streams, commercial models (CPC/CPA), funnel and attribution metrics, marketing channels, product areas, web-to-app flows, and feature-flag configurations. Use this skill whenever the user asks about Jetcost's business, product, marketing, monetization, or feature flags, or needs context to interpret Jetcost data, reports, or decisions.
---

# Jetcost business domain

This skill bundles Jetcost's internal business documentation. Content is organized by area under `references/`.

## How to use

Treat this documentation as the authoritative source for Jetcost's business, product, and commercial context — rely on it over general assumptions when answering. The reference catalog below lists every bundled file with its type, tags, and a one-line description — use it to find the file(s) relevant to the question, then open only those on demand: the docs are split by topic on purpose, don't load everything at once. If nothing in the catalog looks relevant, say so rather than guessing.

## Reference catalog (domain content v122)

Every file below is under `references/`. Use type/tags/description to pick the file(s) relevant to the question, then open only those — don't load everything.

### references/

- **references/index.md** — start here for context on this area
- **references/log.md**
- **references/overview.md** (Business Concept) [business] — Condensed Jetcost business context for agents — what the business is, its two products, the funnel, and geographic presence.

### references/config/

- **references/config/index.md** — start here for context on this area

### references/config/features/

- **references/config/features/index.md** — start here for context on this area
- **references/config/features/abtest-bau-integrations.md** (Feature Flag) [feature] — Exclude a list of partner integrations from flight searches; by its name, meant for an A/B arm that measures searching without them.
- **references/config/features/afs.md** (Feature Flag) [feature] — Switches on the AdSense for Search text-ad blocks of the web results, SEO, flights-to-everywhere and editorial pages, with their placement and the traffic gates that withhold them.
- **references/config/features/ai-crawlers.md** (Feature Flag) [feature] — Names the AI bots the site recognises, by purpose, and lets AI assistants launch flight and car searches and click-outs within a per-minute limit.
- **references/config/features/ai-overview-insights-box.md** (Feature Flag) [feature] — Showed an overview box, presented as AI insights, above the flight results; the site no longer reads the flag, so it has no effect.
- **references/config/features/alternative-transportation.md** (Feature Flag) [feature] — Let train, bus and mixed itineraries into flight results, route by route: next to the flights or as an intermediate card.
- **references/config/features/app-search-form-settings.md** (Feature Flag) [feature] — Configure search form layout and appearance settings on app.
- **references/config/features/best-price-nearby-airports-intercard.md** (Feature Flag) [feature] — Display best prices for nearby airports in results intercard.
- **references/config/features/best-price-nearby-dates-intercard.md** (Feature Flag) [feature] — Show best-price flight deals across nearby dates in intercard.
- **references/config/features/book-now-price-indicator.md** (Feature Flag) [feature] — Tell the user, on flight results, when the cheapest price found is low against past prices for similar searches.
- **references/config/features/cars-suggester.md** (Feature Flag) [feature] — Show car rental suggestions based on recent and nearby airports search history.
- **references/config/features/cpa-fallback.md** (Feature Flag) [feature] — Hold CPA partner offers out of flight results, admitting them only when the result set would otherwise stay thin.
- **references/config/features/cug.md** (Feature Flag) [feature] — Surface app-exclusive flight prices on web to incentivize app downloads.
- **references/config/features/detail-card.md** (Feature Flag) [feature] — Show expandable flight details on results for self-qualifying traffic quality.
- **references/config/features/direct-dates-intercard.md** (Feature Flag) [feature] — Suggest nearby dates with a direct flight on the searched route, in a results intercard shown when the search has no direct flight.
- **references/config/features/dynamic-page-title.md** (Feature Flag) [feature] — Replaced a page's main heading with the Google Ads keyword the visitor came from; the site no longer reads the flag, so it has no effect.
- **references/config/features/email-marketing.md** (Feature Flag) [feature] — Email opt-in forms and subscription modal on the Jetcost flights pages, sending the address to Braze.
- **references/config/features/filter-payment-methods.md** (Feature Flag) [feature] — Order the payment-method filter of flight results, with a chosen set of top methods first.
- **references/config/features/flexible-dates.md** (Feature Flag) [feature] — Enable flexible date search with suggestion modal for cheaper alternatives.
- **references/config/features/flights-city-info.md** (Feature Flag) [feature] — Show a box of key facts about a destination or route (cheapest price and month, flight time and frequency, airlines) on Jetcost airport and route SEO pages.
- **references/config/features/flights-filters.md** (Feature Flag) [feature] — The detailed filters of the flight results page, and the order of the filters and of the mobile filter chips.
- **references/config/features/flights-homepage-deals.md** (Feature Flag) [feature] — Display featured flight deals on homepage.
- **references/config/features/flights-itinerary-info.md** (Feature Flag) [feature] — Display warnings and context on flight cards and detail views for baggage, airport changes, and connection risks.
- **references/config/features/flights-not-found-intercards.md** (Feature Flag) [feature] — Show alternative search suggestions when no flights are found on the search results page.
- **references/config/features/flights-price-graph.md** (Feature Flag) [feature] — Show a chart of the average price per month on the SEO page of a flight route.
- **references/config/features/flights-product-page-deals.md** (Feature Flag) [feature] — Show a box of cheap flight deals from the user's departure airport on the Jetcost flights product page.
- **references/config/features/flights-quick-filters.md** (Feature Flag) [feature] — Enable quick filter capsules for airlines, price clusters, and stops on results.
- **references/config/features/flights-redirect-short-deeplink.md** (Feature Flag) [feature] — Make flight and car offers carry a short id of the partner deeplink, stored in Redis, instead of the full encrypted URL; read by the search backend, not by the site.
- **references/config/features/flights-results-w2a-bottom-sheet.md** (Feature Flag) [feature] — Show a W2A sheet over the flight results while they load, inviting the user to continue the search in the app.
- **references/config/features/flights-results-w2a-elements.md** (Feature Flag) [feature] — Show non-blocking W2A invitations on flight results (sidebar, in-feed row, toast, save icon) that open an app download modal.
- **references/config/features/flights-suggester.md** (Feature Flag) [feature] — Suggest nearby airports, recent searches, and recent airports in search input.
- **references/config/features/flights-to-budget.md** (Feature Flag) [feature] — Add a budget mode to the Jetcost flights search form, leading to a page of round-trip deals within a chosen price and month.
- **references/config/features/flights-to-country.md** (Feature Flag) [feature] — Let users pick a whole country as the destination of a flight search and see the cheapest price found to each of its airports.
- **references/config/features/flights-to-everywhere.md** (Feature Flag) [feature] — Let users search flights from an airport to everywhere and see the cheapest price found to each country on their dates.
- **references/config/features/flights-w2a-blocking-page.md** (Feature Flag) [feature] — Interrupt one flight search per browser session on web with a closable page that points the user to the app.
- **references/config/features/home-screen-elements.md** (Feature Flag) [feature] — Control visibility and positioning of home screen sections like deals, stories, and watched items.
- **references/config/features/inspirational-intercard.md** (Feature Flag) [feature] — Show inspirational flight destination cards between search results.
- **references/config/features/itinerary-trusted-partner-badge.md** (Feature Flag) [feature] — Shows the trusted-partner badge on the offers of partners marked as trusted, in the flight detail view.
- **references/config/features/iubenda.md** (Feature Flag) [feature] — Configure cookie consent banner and privacy settings via Iubenda integration.
- **references/config/features/landing-screens-airport-from-elements.md** (Feature Flag) [feature] — Control visibility and colors of elements on departure airport landing screens.
- **references/config/features/landing-screens-airport-route-elements.md** (Feature Flag) [feature] — Control visibility and colors of elements on route-specific airport landing screens.
- **references/config/features/landing-screens-airport-to-elements.md** (Feature Flag) [feature] — Control visibility and colors of elements on arrival airport landing screens.
- **references/config/features/login.md** (Feature Flag) [feature] — Login to a Jetcost user account with Google or Facebook; login is switched off in code, so the flag no longer has any effect.
- **references/config/features/mal-cars-checkboxes.md** (Feature Flag) [feature] — Controls the presence of the MAL Media checkbox placement on the cars product, and how many partners it offers.
- **references/config/features/mal-cars-exitunit-form.md** (Feature Flag) [feature] — Enables exit-unit ads on the cars search form, with trailing tab option.
- **references/config/features/mal-cars-exitunit-page.md** (Feature Flag) [feature] — Enables exit-unit advertising on cars results page.
- **references/config/features/mal-cars-inline-not-found.md** (Feature Flag) [feature] — Shows inline ads when no car results found, controlling partner count.
- **references/config/features/mal-flights-checkboxes.md** (Feature Flag) [feature] — Controls the presence of the MAL Media checkbox placement on the flights product, and how many partners it offers.
- **references/config/features/mal-flights-exitunit-form.md** (Feature Flag) [feature] — Enables exit-unit ads on flights search form with trailing tab option.
- **references/config/features/mal-flights-exitunit-page.md** (Feature Flag) [feature] — Enables exit-unit advertising on flights results page.
- **references/config/features/mal-flights-inline-not-found.md** (Feature Flag) [feature] — Shows inline ads when no flight results found, controlling partner count.
- **references/config/features/mal-hotels-checkboxes.md** (Feature Flag) [feature] — Controls the presence of the MAL Media checkbox placement on the hotels product (deprecated), and how many partners it offers.
- **references/config/features/mal-hotels-exitunit-form.md** (Feature Flag) [feature] — Enables exit-unit ads on hotels search form with trailing tab option (deprecated).
- **references/config/features/mal-hotels-exitunit-page-flight.md** (Feature Flag) [feature] — Opens a hotel advertiser's pop-under from the flight results page of round-trip searches, where the flight results-page exit unit does not run.
- **references/config/features/mal.md** (Feature Flag) [feature] — Master switch of MAL on web and app, with the settings every MAL unit shares: the auction token, the ad disclosure and the Jetcost redirect page for sponsored promoboxes.
- **references/config/features/meta-tag.md** (Feature Flag) [feature] — Sets the Google Tag Manager containers loaded on every web page, the Facebook and Awin site-verification tags and the Criteo profile id handed to the tag layer.
- **references/config/features/mobile-app-ads.md** (Feature Flag) [feature] — Configures in-app ad placement, sizing, and inventory management across multiple surfaces.
- **references/config/features/mobile-app-braze.md** (Feature Flag) [feature] — Enables Braze marketing platform integration with optional WAPN requirement.
- **references/config/features/mobile-app-cars-results-page.md** (Feature Flag) [feature] — Controls car rental click behavior on mobile app results page.
- **references/config/features/mobile-app-data-monetization.md** (Feature Flag) [feature] — Enables user data monetization features on mobile app.
- **references/config/features/mobile-app-deals.md** (Feature Flag) [feature] — Configures deals tab badge display and carousel limits based on price thresholds.
- **references/config/features/mobile-app-detail-page.md** (Feature Flag) [feature] — Shows detailed itinerary preview before partner click-through on mobile app.
- **references/config/features/mobile-app-flights-results-page.md** (Feature Flag) [feature] — Controls filter and list layout options on mobile app flights results.
- **references/config/features/mobile-app-oia.md** (Feature Flag) [feature] — Hands mobile-web flight searches to the app from chosen touchpoints, and picks which app screen external open-in-app links to airport pages open.
- **references/config/features/mobile-app-onboard.md** (Feature Flag) [feature] — Controls mobile app user onboarding flow with optional simplified variant.
- **references/config/features/mobile-app-opt-in.md** (Feature Flag) [feature] — Configures push notification opt-in prompts based on user engagement triggers.
- **references/config/features/mobile-app-sections.md** (Feature Flag) [feature] — Controls which sections are displayed in the mobile app.
- **references/config/features/mobile-app-settings.md** (Feature Flag) [feature] — Manages mobile app configuration including services, popups, updates, and transparency disclaimers.
- **references/config/features/mobile-app-store-reviews.md** (Feature Flag) [feature] — Triggers store review prompts based on user activity thresholds.
- **references/config/features/mobile-app-welcome-element.md** (Feature Flag) [feature] — Controls welcome element display on mobile app onboarding and standard flows.
- **references/config/features/multi-city.md** (Feature Flag) [feature] — Offer a multi-city choice in the Jetcost flight search form that sends the user to an external multi-city search.
- **references/config/features/partner-feedback.md** (Feature Flag) [feature] — Displays partner feedback surveys after minimum clickouts are reached.
- **references/config/features/partner-pixels.md** (Feature Flag) [feature] — Enables partner pixel tracking across the platform.
- **references/config/features/partner-quality-score.md** (Feature Flag) [feature] — Shows each partner's quality score, as a star rating, on the offers of the flight detail view.
- **references/config/features/payment-methods-configuration.md** (Feature Flag) [feature] — Payment-method fees in flight offer prices: which methods are active, which ones the displayed price is computed with, and the fee deviation that is monitored.
- **references/config/features/popular-destinations.md** (Feature Flag) [feature] — Show a hand-picked list of destinations, with photo and link, in a box on the Jetcost flights home page.
- **references/config/features/price-calendar.md** (Feature Flag) [feature] — Colour each day of the Jetcost flight date picker by how prices for a departure on that day compare on the route.
- **references/config/features/promobox-cars.md** (Feature Flag) [feature] — Shows promotional boxes for car rental offers with placement rules.
- **references/config/features/promobox.md** (Feature Flag) [feature] — Displays promotional boxes with general and placement-based rules.
- **references/config/features/refresh-modal.md** (Feature Flag) [feature] — Show a modal asking the user to refresh the flight or car results after a set time on the results page.
- **references/config/features/review-banner.md** (Feature Flag) [feature] — Shows Trustpilot review banner based on search activity thresholds.
- **references/config/features/sis.md** (Feature Flag) [feature] — Switches the score of flight results on and sets the weights of price, duration and stops in it.
- **references/config/features/social-links.md** (Feature Flag) [feature] — Shows a block of links to the site's social media pages and to the app on the CMS editorial pages.
- **references/config/features/travel-stories.md** (Feature Flag) [feature] — Switches on the app's Travel Stories discovery surface and the validity and selection rules its content is served under.
- **references/config/features/watched-elements.md** (Feature Flag) [feature] — Shows saved watched flights and cars with configurable layouts.
- **references/config/features/web-ads.md** (Feature Flag) [feature] — Manages web advertising placements, GAM configuration, and intelligent refresh.
- **references/config/features/web-push-notifications.md** (Feature Flag) [feature] — Chose the engine that sends the web push notifications, Jetcost's own (WPN) or Braze; no code reads it any more, so its configs no longer have any effect.
- **references/config/features/web-to-app-smart-button.md** (Feature Flag) [feature] — Displays context-aware web-to-app promotion button with app links.
- **references/config/features/web-to-app.md** (Feature Flag) [feature] — Controls web-to-app promotion intercard with dynamic linking support.

### references/config/partners/

- **references/config/partners/index.md** — start here for context on this area
- **references/config/partners/deal-template.md** (Partner Deal Template) [commercials] — Template for documenting a partner's active commercial deal: deal type, rate card, min_cpc floor, and contractual notes.

### references/core/

- **references/core/index.md** — start here for context on this area

### references/core/business/

- **references/core/business/index.md** — start here for context on this area
- **references/core/business/business-profiles.md** (Business Concept) [business] — The three business models Jetcost runs side by side — jetcost, veriflights and meta-spinner — what each one is for, and why every default analysis is scoped to the first.
- **references/core/business/deal-types.md** (Business Concept) [business] — Explains Jetcost's two monetisation models, CPC and CPA, and how deal type shapes revenue, risk, and which funnel metrics matter.
- **references/core/business/funnel.md** (Business Concept) [business] — Describes the sequential user funnel from session to booking and the business formulas connecting each step.
- **references/core/business/initiatives.md** (Business Concept) [business, strategy] — The macro activities Jetcost is running through the end of 2026, grouped into five strategic pillars: what each initiative is, the Jira code it is tracked under, and its metric, baseline and target.
- **references/core/business/markets.md** (Business Concept) [business] — Describes the country-language market tuples Jetcost operates, how they differ from user geography and campaign targeting, and how deal structure, ticket value, and traffic patterns vary across markets.
- **references/core/business/overview.md** (Business Concept) [business] — Full reference on Jetcost's business model: revenue streams, funnel, partners, platforms, and geographic presence.
- **references/core/business/revenue-streams.md** (Business Concept) [business] — Describes Jetcost's five revenue streams across the Core and Media macro-categories, plus the emerging Data Monetisation and FPRS streams outside both.
- **references/core/business/whitelabels.md** (Business Concept) [business] — The white labels: full-feature clones of the Jetcost site under a different skin, used as a testing ground for changes too risky for the core brand — the full domain inventory with each one's market and language, and why they are neither one perimeter nor interchangeable with each other.

### references/core/commercials/

- **references/core/commercials/index.md** — start here for context on this area
- **references/core/commercials/cpa-fallback.md** (Commercial Concept) [commercials] — Why CPA partner offers are withheld from flight results and admitted only when the result set would otherwise be near-empty, and how that shows up in the data.
- **references/core/commercials/cpa-model.md** (Commercial Model) [commercials] — Operational detail of CPA deal sub-types: commission structures, min_cpc floor clauses, and attribution.
- **references/core/commercials/cpc-model.md** (Commercial Model) [commercials] — Operational detail of the CPC deal structure: a single flat fee-per-click model with no sub-types.
- **references/core/commercials/fprs.md** (Commercial Concept) [commercials] — FPRS (Flight Price Ranking Service): a subscription that sells partners insight on where they ranked in users' searches, clicked or not — a revenue stream of its own, paid apart from and independent of the core CPC/CPA deals.
- **references/core/commercials/integration-types.md** (Data Taxonomy) [commercials] — The integrationType/integrationSubType taxonomy: which placements are direct integrations with a negotiated partner, which are sourced through another metasearch or an ad-tech network, and where partner identity is only partially present.
- **references/core/commercials/levers.md** (Operational Levers) [commercials, operation-logs] — Commercial operations tracked in operation logs, and the `internal_event_type` values that identify them on jc_operation_logs_data (source: commercial-logs).
- **references/core/commercials/magic-method.md** (Commercial Concept) [commercials] — The magic method: a partner technique of returning a lower price valid only with an outdated payment method nobody uses, to win the top position on price — why it works and what it costs the partner down the funnel.
- **references/core/commercials/partner-lifecycle.md** (Business Process) [commercials] — Describes the stages a partner goes through from sourcing to go-live and ongoing performance monitoring.
- **references/core/commercials/partner-splitting.md** (Commercial Technique) [commercials] — How Jetcost applies differentiated deal economics on a dimension the system doesn't natively support: registering multiple 'artificial' partnerCodes for one real counterparty, activated mutually exclusively per scenario.

### references/core/commercials/mal/

- **references/core/commercials/mal/index.md** — start here for context on this area
- **references/core/commercials/mal/networks.md** (Commercial Concept) [commercials, media] — MAL's two integration levels: the NETWORK, one of a handful of platforms that supply the demand, and the PARTNER, one of many advertisers that actually pays for the click and owns the domain the user lands on — and which of the two each data field is talking about.
- **references/core/commercials/mal/overview.md** (Commercial Tool) [commercials, media] — MAL (Meta Advertising Layer): the commercial tool that manages partner relationships and integrations — core, MAL Core, MAL Media and the demand networks — and, as a by-product of where its placements sit, produces revenue in two different buckets.
- **references/core/commercials/mal/self-trailingtab.md** (Commercial Concept) [commercials, media, marketing] — Self trailing tab: on a Jetcost white label the MAL trailing tab can sell its click to Jetcost itself, which bids alongside the external networks — one placement that is Media revenue for the white label and paid acquisition cost for Jetcost, designed to net to zero.

### references/core/marketing/

- **references/core/marketing/index.md** — start here for context on this area
- **references/core/marketing/app-install.md** (Marketing Channel) [marketing] — App-install campaigns on Google (Play Store and App Store) and Apple Search Ads (App Store): what they buy, what they optimise on, and why their value is read on the install cohort rather than on the session.
- **references/core/marketing/crm.md** (Marketing Channel) [marketing] — Describes CRM's retention channels — Web Push, Email, and App Push — their campaigns, cadences, and ownership, and how each channel and campaign type is identified in session data.
- **references/core/marketing/levers.md** (Operational Levers) [marketing, operation-logs] — The marketing levers that are not tied to one channel or buying platform, and the `internal_event_type` values that identify them on jc_operation_logs_data, whichever source reported the row.
- **references/core/marketing/llm-ads.md** (Marketing Channel) [marketing] — Paid ads inside ChatGPT, bought on OpenAI: contextual ads shown in the conversation — paid acquisition, distinct from the unpaid referral of users following a link in an AI assistant's answer.
- **references/core/marketing/organic.md** (Marketing Channel) [marketing] — Covers non-paid acquisition: SEO strategy, content, and direct traffic.
- **references/core/marketing/other-channels.md** (Marketing Channel) [marketing] — The Not SEM branch of paid acquisition — the display, checkbox and llm channel groups, the sources behind each, and which marketing-cost bucket each one's spend lands in.
- **references/core/marketing/remarketing.md** (Marketing Channel) [marketing] — Paid remarketing: Criteo on the web site today, paid social on Instagram/Facebook due by the end of 2026 — bringing back users who already showed intent on Jetcost, which is why they are not acquisition of new users.
- **references/core/marketing/social.md** (Marketing Channel) [marketing] — Organic social on Instagram and Facebook: brand activity run by the marketing team, not a performance channel — judged on brand, not on the sessions or revenue it brings.
- **references/core/marketing/traffic-taxonomy.md** (Data Convention) [marketing] — How marketing clusters traffic — not-campaign vs campaign by the registry's technical flag, campaign into paid and not paid, paid into SEM and Not SEM by channel group — and why marketing cost has to be read against that tree rather than through its platform buckets.

### references/core/marketing/sem/

- **references/core/marketing/sem/index.md** — start here for context on this area
- **references/core/marketing/sem/accounts.md** (Marketing Concept) [marketing] — How the SEM account fleet is segregated (country, language, brand, Local vs EXT), the account and campaign naming conventions, the brands and markets covered, and the macro-regions Routes/Destinations campaigns are split by.
- **references/core/marketing/sem/bing-ads.md** (Marketing Channel) [marketing] — The state of the Bing channel: small, not yet stabilised, and deliberately not documented as a set of rules.
- **references/core/marketing/sem/dimensions.md** (Data Convention) [marketing] — Marketing's own campaign-level dimensions — Campaign (including the virtual campaigns given to non-campaign traffic), Campaign Type and its reporting cluster-types, Source, Local vs Ext, Country Cluster — and the attribution scope each is read through.
- **references/core/marketing/sem/goals.md** (Marketing Concept) [marketing] — SEM daily goals — the weekly plan marketing sets for SEM cost, revenue and GP, by day and by country cluster, for two perimeters (SEM-only and ALL traffic), and how to read it against actuals.
- **references/core/marketing/sem/google-ads.md** (Marketing Channel) [marketing] — Google Ads bid strategies, standard campaign settings, the day-to-day bid management methodology, and the conversion signals sent to Google — including what economic value each carries and how that value is computed today.
- **references/core/marketing/sem/levers.md** (Operational Levers) [marketing, operation-logs] — The SEM levers marketing actively manages day to day, and the `internal_event_type` values that identify them on jc_operation_logs_data (source: gads). Extends the marketing-wide levers in core/marketing/levers.md.
- **references/core/marketing/sem/metrics.md** (Metric Glossary) [marketing] — SEM-specific bid-management metrics: ROAS, GP per channel, CPA mktg, RPA, and how a tCPA target is derived from a ROAS objective.
- **references/core/marketing/sem/negative-keywords.md** (Operational Levers) [marketing] — How SEM exclusions are structured into global and country/brand lists, and the rule for filing a partner covered by a no-bidding agreement.

### references/core/martech/

- **references/core/martech/index.md** — start here for context on this area
- **references/core/martech/levers.md** (Operational Levers) [martech, operation-logs] — Martech operations tracked in operation logs, and the `internal_event_type` values that identify them on jc_operation_logs_data (source: gtm).
- **references/core/martech/tags.md** (Marketing Concept) [martech] — The tracking tags Jetcost runs on web through GTM and the much smaller set on app, what each one sends and to whom, and the two ways a tag reacts to a missing consent: Google's tags adapt natively, third-party tags are gated by GTM.

### references/core/media/

- **references/core/media/index.md** — start here for context on this area
- **references/core/media/afs.md** (Media Concept) [media] — AdSense for Search (AFS): query-matched Google text ads on the web site only, paid per click, switched on and off per surface and per traffic type as a strategic trade-off against cannibalising Core click-outs.
- **references/core/media/data-monetization.md** (Media Concept) [media] — Emerging revenue stream from selling anonymised user data to partners — early stage, excluded from core business metrics, and loaded by hand so gaps in the data are missing uploads rather than lost revenue.
- **references/core/media/gam.md** (Media Concept) [media] — Google Ad Manager (GAM): the banner inventory of the web site and of the app, paid per impression and sold both in open auction and through direct deals, the latter unstable by nature.
- **references/core/media/metrics.md** (Metric Glossary) [media] — Media's own metrics: gross vs net media revenue, the GAM inventory metrics (ad requests, impressions, fill rate, eCPM, viewability) and the AFS ones (queries, coverage, ad clicks, CTR, CPC, RPM), and how they combine into revenue.

### references/core/product/

- **references/core/product/index.md** — start here for context on this area
- **references/core/product/abtests.md** (Product Concept) [product, data] — What an A/B test is at Jetcost: how its perimeter is defined, how exposed sessions are segmented in the data, and why its active window is not continuous.
- **references/core/product/detail-page.md** (Product Feature) [product, commercials] — The detail page product feature that shifts conversion from blind clicking to informed selection, and how its clickout-mode configuration affects comparability of commercial metrics.
- **references/core/product/features.md** (Product Concept) [product] — Explains what a 'feature' (operational config lever) is and how its configuration structure works.
- **references/core/product/flights.md** (Product Concept) [product] — Defines the flight domain terminology — itinerary, trip, segment, offer — and flight/search type distinctions.
- **references/core/product/levers.md** (Operational Levers) [product, operation-logs] — Product operations tracked in operation logs, and the `internal_event_type` values that identify them on jc_operation_logs_data (sources: abtest-logs, feature-logs).
- **references/core/product/metrics.md** (Metric Glossary) [product] — Product's own app-side metrics: First Opens, the app revenue components, ARPU per install cohort, and return sessions as a retention proxy.
- **references/core/product/seo-pages.md** (Product Concept) [product] — SEO pages: the static destination, origin and route pages that serve both organic acquisition and SEM landing traffic, and the legal 15-day limit on the age of the cached prices they show.
- **references/core/product/sorting.md** (Product Feature) [product] — Describes how flight offer sorting works and why it's one of the highest-leverage product decisions.
- **references/core/product/traffic-control.md** (Product Concept) [product, data] — What a traffic control is at Jetcost, how it differs from an A/B test, how controlled sessions show up in the data, and what each traffic-control code is for.
- **references/core/product/travel-stories.md** (Product Feature) [product, marketing] — The app's story-format discovery surface: what a Travel Story is, the profile/story/translation structure, the editorial vs Deal Scout split, and how its impression and CTA-click numbers should be read.
- **references/core/product/web-vs-app.md** (Product Concept) [product] — Documents behavioural, funnel, and revenue differences between the web and app platforms.

### references/core/product/w2a/

- **references/core/product/w2a/index.md** — start here for context on this area
- **references/core/product/w2a/blocking-page.md** (Product Feature) [product] — A W2A tool that intercepts web users before search to prompt switching to the app.
- **references/core/product/w2a/cug.md** (Product Feature) [product] — A W2A mechanism that shows app-only flight prices on web, with the partner name blurred, and sends the click to the app to incentivise switching.
- **references/core/product/w2a/other-tools.md** (Product Feature) [product] — Documents W2A mechanisms beyond blocking page and CUG: smart-button, fare alert tool, and app QR code.

### references/core/tech/

- **references/core/tech/index.md** — start here for context on this area
- **references/core/tech/levers.md** (Operational Levers) [tech, operation-logs] — Tech operations tracked in operation logs, and the `internal_event_type` values that identify them on jc_operation_logs_data.

### references/data/

- **references/data/index.md** — start here for context on this area
- **references/data/analysis-types.md** (Data Convention) [data] — Defines the standard comparison periods (WoW, WTD, MoM, MTD) used consistently across all teams, and the fixed cohort-age windows used when the subject is a cohort rather than a calendar span.
- **references/data/attribution.md** (Data Convention) [data] — Describes Jetcost's three attribution models and which one is the default for reporting and reconciliation.
- **references/data/consents.md** (Data Convention) [data] — The consents a session can carry: the four GDPR purposes collected through Iubenda (tech, mktg, dtra, meas) and the three collected outside it (gloc, strk, wapn), how they map to Iubenda's purposes and to Google Consent Mode signals, everything on web and app that depends on them, their raw field names, why a missing consent is not a refused one, what a refusal removes from the web-to-app handoff, and the meta universal key (muk) that replaces the identifiers there.
- **references/data/dimensions.md** (Data Convention) [data] — The common breakdown dimensions used to slice any metric — Business Profile/Website, Country, Macro Area, Device, Context (web vs app), Platform (operating system) and Traffic Type — with their raw field names and how they combine.
- **references/data/metrics.md** (Metric Glossary) [data] — Glossary of the main funnel — volumes (Sessions, Searches, Full Core Clicks, Conversions, Marketing Cost, Revenues), rates (STR, CTR, CR, Average CPC, Payoff, Gross Profit, Gross Margin), and a handful of independently-named ratios (RPMS, CPS, cpcIN...) — datamart-specific slices live in the ClickHouse semantic layer skill only.
- **references/data/operation-log-classification.md** (Data Convention) [data, operation-logs] — How an operation-log row is classified by business meaning: what `internal_event_type` is, where each department's values are documented, and the difference between `unknown` and `manual-entry`.
- **references/data/pro-rata-allocation.md** (Data Concept) [data, commercials] — What pro-rata allocation is, why some revenue and marketing-cost streams need it while others don't, which dimensions it's safe to slice a pro-rata figure by, how it behaves when no allocation rate exists for a given slice, and why MAL repeats the previous day's figure on the most recent day.
- **references/data/query-caveats.md** (Query Caveat) [data] — Gotchas that silently skew a query or analysis: the CPA conversion reporting lag, the MAL pro-rata figure that repeats the previous day on the most recent day, the Dynamic Package active window, the UK/GB country-code split, which app marketing-cost zeros are real, search counts that include autosearches, the campaign field being populated for traffic that came from no campaign, and A/B test slices that vanish while the test is off.
- **references/data/revenue-fields.md** (Data Concept) [data, commercials] — What revenueCurrent, revenueEcpc, and revenueOperational each actually measure at the click level and why they diverge, what revenueCurrent shows while partner conversion data is missing or partial and how it is recovered, why revenueEcpc is no longer the value sent to Google as a conversion value, why the funnel-level `revenue` metric is the sessions pro-rata total and not their sum (only its Organic Core leg is click-level revenueCurrent), why MAL revenue has three different representations that do not reconcile, and why 'Actual Revenue' is billing/invoicing data outside ClickHouse entirely, not a fourth datamart field.
- **references/data/seasonality.md** (Data Convention) [data] — Describes Jetcost's annual and weekly traffic seasonality patterns and how they affect WoW/YoY reads.
- **references/data/sessions-and-users.md** (Data Convention) [data] — Distinguishes Session, User, and Marketing Session — three related but distinct units of user activity measurement — including the two rules that close a session on both platforms and how web and app each enforce them.
- **references/data/sources.md** (Data Concept) [data] — The three ingestion paths that fill ClickHouse — Galera (production MySQL) imported nightly by maid, Argo realtime events streamed through Kafka, and third-party vendor APIs pulled on cron — and what each one implies about freshness, completeness of the trailing edge, whether a past day can change, and why reference attributes carry no history.

