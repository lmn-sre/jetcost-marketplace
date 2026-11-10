---
type: Feature Flag
description: "Sets the Google Tag Manager containers loaded on every web page, the Facebook and Awin site-verification tags and the Criteo profile id handed to the tag layer."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# META-TAG

The tag-layer settings of every web page, on the Jetcost and white-label
sites: which Google Tag Manager containers load, a client one and
optionally a server-side (sGTM) one, two site-verification meta tags and
the Criteo profile id. The containers are injected only once the consent
banner has loaded; what the tags inside them send, and how they react to
consent, is in [core/martech/tags.md](/core/martech/tags.md). The app has
no tag layer: the native app does not read this flag, and the app's web
pages (the `jetcost-mobile-app` site) load no GTM container, though they
carry the two verification meta tags when set.

## Configs

### AWIN-VERIFICATION
String, empty by default. When set, every page carries a `verification`
meta tag with this value, the code Awin uses to verify that the site is
Jetcost's. Empty: no tag.

### CRITEO-PROFILE-ID
String, empty by default. Handed to the tag layer as
`tmCriteoProfileId`, in the data layer every page starts with, for the
Criteo tag in GTM. The site does nothing else with it.

### FACEBOOK-VERIFICATION
String, empty by default. When set, every page carries a
`facebook-domain-verification` meta tag with this value, the code
Facebook uses to verify that the domain is Jetcost's. Empty: no tag.

### SGTM-CONTAINER-HOST
String, empty by default. The host that serves the server-side GTM
container. The server-side container loads, from this host, only when
both this and `SGTM-CONTAINER-ID` are set, and it loads next to the
client container, not instead of it.

### SGTM-CONTAINER-ID
String, empty by default. The id of the server-side GTM container,
loaded only when `SGTM-CONTAINER-HOST` is set too. Unlike the client
container, its loading does not release the events the site holds for
GTM (see `GTM-CONTAINER-ID`).

### ENABLED
Boolean, default `1`. When the feature is marked *always enabled* in
the backoffice, `ENABLED` has no effect: every eligible request gets the
feature on. Whether it is marked so is live state — check the feature
state, not this file. Without the mark, `0`, or no rule setting it,
would make the configs above and below fall back to the defaults given
with each one.

### GTM-CONTAINER-ID
String, default `GTM-WCBM`. The client GTM container every page loads.
The GA4 events the site's scripts send wait until this container has
loaded: with an empty value no client container loads, and those events
are never sent.
