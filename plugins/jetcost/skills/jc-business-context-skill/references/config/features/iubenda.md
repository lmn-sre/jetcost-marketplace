---
type: Feature Flag
description: "Configure cookie consent banner and privacy settings via Iubenda integration."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# IUBENDA

The cookie consent banner and the GDPR consent state it collects. The
configs below are the banner's levers — which policy it serves, how it
may be rejected, which vendor-side settings are on. What the consents
*mean*, and how they are read downstream, is in
[data/consents.md](/data/consents.md).

The banner shows on the Jetcost and white-label sites, which load its
configuration from the site's own API when a page opens; the app downloads
the same configuration through its API, together with a platform
stylesheet and `FULLSCREEN`. Rules can also target app platform and app
version, which only the app's request passes.

## Configs

### COOKIE-POLICY-ID
String, no default. The Iubenda cookie policy the banner serves
(`cookiePolicyId` in iubenda settings). Iubenda names the consent cookie
after it, and the site reads that cookie on every request to know the
user's consents: a new value leaves earlier choices unread, so users are
asked again.

### FULLSCREEN
Boolean, default `0`. Available only on jetcost-mobile-app: sent to the
app as `fullscreen` next to the banner configuration, and ignored by the
web. By its name, the app shows the banner full screen.

### GOOGLE-ADDITIONAL-CONSENT-MODE
Boolean, default `1`. `googleAdditionalConsentMode` in iubenda settings:
with `1`, the banner also produces Google's Additional Consent string,
which covers Google's ad-tech providers that are not in the IAB TCF
vendor list.

### GOOGLE-CONSENT-MODE
Boolean, default `0`. `googleConsentMode` in iubenda settings: with `1`,
the banner passes the user's choices to Google's tags as Consent Mode
signals. Which Consent Mode signals each Iubenda purpose grants, and
which tags read them, is in [data/consents.md](/data/consents.md).

### REJECT-MODE
Select, default `button`, among `button` ("Button"), `x` ("X Link") and
`link` ("Link in body"): how the banner lets the user refuse. With
`button`, a reject button; with `x`, a close X that rejects; with
`link`, neither, the refusal being a link in the banner text. The
backoffice reserves "X Link" for the app and "Link in body" for the
websites, but the code applies all three everywhere, so the restriction
is up to whoever sets it. Every
option needs a dedicated translation, which becomes the banner text:
iubenda/banner/dynamic.body_button, iubenda/banner/dynamic.body_x,
iubenda/banner/dynamic.body_link.

### SITE-ID
String, no default. The Iubenda site the banner belongs to (`siteId` in
iubenda settings); on web it also picks the Iubenda script loaded with
the banner. When the consent cookie named after `COOKIE-POLICY-ID` is
missing, the site looks for one named after the site id instead.

### TCF-ENABLED
Boolean, default `1`. `enableTcf` in iubenda settings: with `1`, the
banner also runs the IAB TCF framework, whose consent string advertising
libraries read, and on web Iubenda's TCF scripts are loaded with it. With
`0`, no TCF consent string is produced.

### ENABLED
Boolean, default `1`. Not a switch: no code shows or hides the banner on
it. When the feature is marked *always enabled* in the backoffice,
`ENABLED` has no effect: every eligible request gets the feature on.
Whether it is marked so is live state — check the feature state, not
this file. Without the mark, `0`, or no rule setting it for a market,
would make every config above and below fall back to the defaults
listed here, which leave `SITE-ID` and `COOKIE-POLICY-ID` empty.

### EXPIRE-AFTER
Number, default `120`. Sent to the Iubenda Cookie Solution as its option
`preferenceCookie.expireAfter`: the days the preference cookie lasts,
after which the banner asks again.

### INVALIDATE-CONSENT-BEFORE
Number, default `0`. Sent as the Iubenda option
`invalidateConsentBefore`, a date given as a timestamp: consents given
before it are discarded and the banner shows again. With `0`, the option
is not set (sent as null) and no consent is discarded.

### NEW-CONSENT-AT-VENDOR-LIST-UPDATE
Number, default `0`. Sent as the Iubenda option
`newConsentAtVendorListUpdate`, meaningful only with `TCF-ENABLED`: the
days after a TCF vendor-list update within which consent is asked again.
With `0`, the option is not set (sent as null).
