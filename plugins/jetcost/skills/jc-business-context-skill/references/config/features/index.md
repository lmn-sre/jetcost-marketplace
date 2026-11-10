# Feature Flags Overview

This folder documents Jetcost's feature-flag configurations — one file per
feature, controlling behaviour across web, app, and partner-facing surfaces.
Use this index to find the file relevant to a given feature before opening it;
each entry below is a one-line summary of what that flag controls.

These files describe what each flag *can* do, not what it was last set to.
Changes to a feature's live configuration are recorded as operation logs
instead — `source: feature-logs`, keyed on the feature's own code — so a
question about when a feature was last touched belongs there, not here. See
[core/product/levers.md](/core/product/levers.md). What each flag is set to
right now, per website, market, device and app version, is the live feature
state, read through the Jetcost Services connector's `features_*` tools
(Claude Desktop, on the company network/VPN): read it there, never infer it
from these files.

- [config/features/abtest-bau-integrations.md](/config/features/abtest-bau-integrations.md) — Exclude a list of partner integrations from flight searches; by its name, meant for an A/B arm that measures searching without them.
- [config/features/afs.md](/config/features/afs.md) — Switches on the AdSense for Search text-ad blocks of the web results, SEO, flights-to-everywhere and editorial pages, with their placement and the traffic gates that withhold them.
- [config/features/ai-crawlers.md](/config/features/ai-crawlers.md) — Names the AI bots the site recognises, by purpose, and lets AI assistants launch flight and car searches and click-outs within a per-minute limit.
- [config/features/ai-overview-insights-box.md](/config/features/ai-overview-insights-box.md) — Showed an overview box, presented as AI insights, above the flight results; the site no longer reads the flag, so it has no effect.
- [config/features/alternative-transportation.md](/config/features/alternative-transportation.md) — Let train, bus and mixed itineraries into flight results, route by route: next to the flights or as an intermediate card.
- [config/features/app-search-form-settings.md](/config/features/app-search-form-settings.md) — Configure search form layout and appearance settings on app.
- [config/features/best-price-nearby-airports-intercard.md](/config/features/best-price-nearby-airports-intercard.md) — Display best prices for nearby airports in results intercard.
- [config/features/best-price-nearby-dates-intercard.md](/config/features/best-price-nearby-dates-intercard.md) — Show best-price flight deals across nearby dates in intercard.
- [config/features/book-now-price-indicator.md](/config/features/book-now-price-indicator.md) — Tell the user, on flight results, when the cheapest price found is low against past prices for similar searches.
- [config/features/cars-suggester.md](/config/features/cars-suggester.md) — Show car rental suggestions based on recent and nearby airports search history.
- [config/features/cpa-fallback.md](/config/features/cpa-fallback.md) — Hold CPA partner offers out of flight results, admitting them only when the result set would otherwise stay thin.
- [config/features/cug.md](/config/features/cug.md) — Surface app-exclusive flight prices on web to incentivize app downloads.
- [config/features/detail-card.md](/config/features/detail-card.md) — Show expandable flight details on results for self-qualifying traffic quality.
- [config/features/direct-dates-intercard.md](/config/features/direct-dates-intercard.md) — Suggest nearby dates with a direct flight on the searched route, in a results intercard shown when the search has no direct flight.
- [config/features/dynamic-page-title.md](/config/features/dynamic-page-title.md) — Replaced a page's main heading with the Google Ads keyword the visitor came from; the site no longer reads the flag, so it has no effect.
- [config/features/email-marketing.md](/config/features/email-marketing.md) — Email opt-in forms and subscription modal on the Jetcost flights pages, sending the address to Braze.
- [config/features/filter-payment-methods.md](/config/features/filter-payment-methods.md) — Order the payment-method filter of flight results, with a chosen set of top methods first.
- [config/features/flexible-dates.md](/config/features/flexible-dates.md) — Enable flexible date search with suggestion modal for cheaper alternatives.
- [config/features/flights-city-info.md](/config/features/flights-city-info.md) — Show a box of key facts about a destination or route (cheapest price and month, flight time and frequency, airlines) on Jetcost airport and route SEO pages.
- [config/features/flights-filters.md](/config/features/flights-filters.md) — The detailed filters of the flight results page, and the order of the filters and of the mobile filter chips.
- [config/features/flights-homepage-deals.md](/config/features/flights-homepage-deals.md) — Display featured flight deals on homepage.
- [config/features/flights-itinerary-info.md](/config/features/flights-itinerary-info.md) — Display warnings and context on flight cards and detail views for baggage, airport changes, and connection risks.
- [config/features/flights-not-found-intercards.md](/config/features/flights-not-found-intercards.md) — Show alternative search suggestions when no flights are found on the search results page.
- [config/features/flights-price-graph.md](/config/features/flights-price-graph.md) — Show a chart of the average price per month on the SEO page of a flight route.
- [config/features/flights-product-page-deals.md](/config/features/flights-product-page-deals.md) — Show a box of cheap flight deals from the user's departure airport on the Jetcost flights product page.
- [config/features/flights-quick-filters.md](/config/features/flights-quick-filters.md) — Enable quick filter capsules for airlines, price clusters, and stops on results.
- [config/features/flights-redirect-short-deeplink.md](/config/features/flights-redirect-short-deeplink.md) — Make flight and car offers carry a short id of the partner deeplink, stored in Redis, instead of the full encrypted URL; read by the search backend, not by the site.
- [config/features/flights-results-w2a-bottom-sheet.md](/config/features/flights-results-w2a-bottom-sheet.md) — Show a W2A sheet over the flight results while they load, inviting the user to continue the search in the app.
- [config/features/flights-results-w2a-elements.md](/config/features/flights-results-w2a-elements.md) — Show non-blocking W2A invitations on flight results (sidebar, in-feed row, toast, save icon) that open an app download modal.
- [config/features/flights-suggester.md](/config/features/flights-suggester.md) — Suggest nearby airports, recent searches, and recent airports in search input.
- [config/features/flights-to-budget.md](/config/features/flights-to-budget.md) — Add a budget mode to the Jetcost flights search form, leading to a page of round-trip deals within a chosen price and month.
- [config/features/flights-to-country.md](/config/features/flights-to-country.md) — Let users pick a whole country as the destination of a flight search and see the cheapest price found to each of its airports.
- [config/features/flights-to-everywhere.md](/config/features/flights-to-everywhere.md) — Let users search flights from an airport to everywhere and see the cheapest price found to each country on their dates.
- [config/features/flights-w2a-blocking-page.md](/config/features/flights-w2a-blocking-page.md) — Interrupt one flight search per browser session on web with a closable page that points the user to the app.
- [config/features/home-screen-elements.md](/config/features/home-screen-elements.md) — Control visibility and positioning of home screen sections like deals, stories, and watched items.
- [config/features/inspirational-intercard.md](/config/features/inspirational-intercard.md) — Show inspirational flight destination cards between search results.
- [config/features/itinerary-trusted-partner-badge.md](/config/features/itinerary-trusted-partner-badge.md) — Shows the trusted-partner badge on the offers of partners marked as trusted, in the flight detail view.
- [config/features/iubenda.md](/config/features/iubenda.md) — Configure cookie consent banner and privacy settings via Iubenda integration.
- [config/features/landing-screens-airport-from-elements.md](/config/features/landing-screens-airport-from-elements.md) — Control visibility and colors of elements on departure airport landing screens.
- [config/features/landing-screens-airport-route-elements.md](/config/features/landing-screens-airport-route-elements.md) — Control visibility and colors of elements on route-specific airport landing screens.
- [config/features/landing-screens-airport-to-elements.md](/config/features/landing-screens-airport-to-elements.md) — Control visibility and colors of elements on arrival airport landing screens.
- [config/features/login.md](/config/features/login.md) — Login to a Jetcost user account with Google or Facebook; login is switched off in code, so the flag no longer has any effect.
- [config/features/mal-cars-checkboxes.md](/config/features/mal-cars-checkboxes.md) — Controls the presence of the MAL Media checkbox placement on the cars product, and how many partners it offers.
- [config/features/mal-cars-exitunit-form.md](/config/features/mal-cars-exitunit-form.md) — Enables exit-unit ads on the cars search form, with trailing tab option.
- [config/features/mal-cars-exitunit-page.md](/config/features/mal-cars-exitunit-page.md) — Enables exit-unit advertising on cars results page.
- [config/features/mal-cars-inline-not-found.md](/config/features/mal-cars-inline-not-found.md) — Shows inline ads when no car results found, controlling partner count.
- [config/features/mal-flights-checkboxes.md](/config/features/mal-flights-checkboxes.md) — Controls the presence of the MAL Media checkbox placement on the flights product, and how many partners it offers.
- [config/features/mal-flights-exitunit-form.md](/config/features/mal-flights-exitunit-form.md) — Enables exit-unit ads on flights search form with trailing tab option.
- [config/features/mal-flights-exitunit-page.md](/config/features/mal-flights-exitunit-page.md) — Enables exit-unit advertising on flights results page.
- [config/features/mal-flights-inline-not-found.md](/config/features/mal-flights-inline-not-found.md) — Shows inline ads when no flight results found, controlling partner count.
- [config/features/mal-hotels-checkboxes.md](/config/features/mal-hotels-checkboxes.md) — Controls the presence of the MAL Media checkbox placement on the hotels product (deprecated), and how many partners it offers.
- [config/features/mal-hotels-exitunit-form.md](/config/features/mal-hotels-exitunit-form.md) — Enables exit-unit ads on hotels search form with trailing tab option (deprecated).
- [config/features/mal-hotels-exitunit-page-flight.md](/config/features/mal-hotels-exitunit-page-flight.md) — Opens a hotel advertiser's pop-under from the flight results page of round-trip searches, where the flight results-page exit unit does not run.
- [config/features/mal.md](/config/features/mal.md) — Master switch of MAL on web and app, with the settings every MAL unit shares: the auction token, the ad disclosure and the Jetcost redirect page for sponsored promoboxes.
- [config/features/meta-tag.md](/config/features/meta-tag.md) — Sets the Google Tag Manager containers loaded on every web page, the Facebook and Awin site-verification tags and the Criteo profile id handed to the tag layer.
- [config/features/mobile-app-ads.md](/config/features/mobile-app-ads.md) — Configures in-app ad placement, sizing, and inventory management across multiple surfaces.
- [config/features/mobile-app-braze.md](/config/features/mobile-app-braze.md) — Enables Braze marketing platform integration with optional WAPN requirement.
- [config/features/mobile-app-cars-results-page.md](/config/features/mobile-app-cars-results-page.md) — Controls car rental click behavior on mobile app results page.
- [config/features/mobile-app-data-monetization.md](/config/features/mobile-app-data-monetization.md) — Enables user data monetization features on mobile app.
- [config/features/mobile-app-deals.md](/config/features/mobile-app-deals.md) — Configures deals tab badge display and carousel limits based on price thresholds.
- [config/features/mobile-app-detail-page.md](/config/features/mobile-app-detail-page.md) — Shows detailed itinerary preview before partner click-through on mobile app.
- [config/features/mobile-app-flights-results-page.md](/config/features/mobile-app-flights-results-page.md) — Controls filter and list layout options on mobile app flights results.
- [config/features/mobile-app-oia.md](/config/features/mobile-app-oia.md) — Hands mobile-web flight searches to the app from chosen touchpoints, and picks which app screen external open-in-app links to airport pages open.
- [config/features/mobile-app-onboard.md](/config/features/mobile-app-onboard.md) — Controls mobile app user onboarding flow with optional simplified variant.
- [config/features/mobile-app-opt-in.md](/config/features/mobile-app-opt-in.md) — Configures push notification opt-in prompts based on user engagement triggers.
- [config/features/mobile-app-sections.md](/config/features/mobile-app-sections.md) — Controls which sections are displayed in the mobile app.
- [config/features/mobile-app-settings.md](/config/features/mobile-app-settings.md) — Manages mobile app configuration including services, popups, updates, and transparency disclaimers.
- [config/features/mobile-app-store-reviews.md](/config/features/mobile-app-store-reviews.md) — Triggers store review prompts based on user activity thresholds.
- [config/features/mobile-app-welcome-element.md](/config/features/mobile-app-welcome-element.md) — Controls welcome element display on mobile app onboarding and standard flows.
- [config/features/multi-city.md](/config/features/multi-city.md) — Offer a multi-city choice in the Jetcost flight search form that sends the user to an external multi-city search.
- [config/features/partner-feedback.md](/config/features/partner-feedback.md) — Displays partner feedback surveys after minimum clickouts are reached.
- [config/features/partner-pixels.md](/config/features/partner-pixels.md) — Enables partner pixel tracking across the platform.
- [config/features/partner-quality-score.md](/config/features/partner-quality-score.md) — Shows each partner's quality score, as a star rating, on the offers of the flight detail view.
- [config/features/payment-methods-configuration.md](/config/features/payment-methods-configuration.md) — Payment-method fees in flight offer prices: which methods are active, which ones the displayed price is computed with, and the fee deviation that is monitored.
- [config/features/popular-destinations.md](/config/features/popular-destinations.md) — Show a hand-picked list of destinations, with photo and link, in a box on the Jetcost flights home page.
- [config/features/price-calendar.md](/config/features/price-calendar.md) — Colour each day of the Jetcost flight date picker by how prices for a departure on that day compare on the route.
- [config/features/promobox-cars.md](/config/features/promobox-cars.md) — Shows promotional boxes for car rental offers with placement rules.
- [config/features/promobox.md](/config/features/promobox.md) — Displays promotional boxes with general and placement-based rules.
- [config/features/refresh-modal.md](/config/features/refresh-modal.md) — Show a modal asking the user to refresh the flight or car results after a set time on the results page.
- [config/features/review-banner.md](/config/features/review-banner.md) — Shows Trustpilot review banner based on search activity thresholds.
- [config/features/sis.md](/config/features/sis.md) — Switches the score of flight results on and sets the weights of price, duration and stops in it.
- [config/features/social-links.md](/config/features/social-links.md) — Shows a block of links to the site's social media pages and to the app on the CMS editorial pages.
- [config/features/travel-stories.md](/config/features/travel-stories.md) — Switches on the app's story-format discovery surface and the validity and selection rules its content is served under.
- [config/features/watched-elements.md](/config/features/watched-elements.md) — Shows saved watched flights and cars with configurable layouts.
- [config/features/web-ads.md](/config/features/web-ads.md) — Manages web advertising placements, GAM configuration, and intelligent refresh.
- [config/features/web-push-notifications.md](/config/features/web-push-notifications.md) — Chose the engine that sends the web push notifications, Jetcost's own (WPN) or Braze; no code reads it any more, so its configs no longer have any effect.
- [config/features/web-to-app-smart-button.md](/config/features/web-to-app-smart-button.md) — Displays context-aware web-to-app promotion button with app links.
- [config/features/web-to-app.md](/config/features/web-to-app.md) — Controls web-to-app promotion intercard with dynamic linking support.
