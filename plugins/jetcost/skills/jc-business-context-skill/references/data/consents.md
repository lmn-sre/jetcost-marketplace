---
type: Data Convention
description: "The consents a session can carry: the four GDPR purposes collected through Iubenda (tech, mktg, dtra, meas) and the three collected outside it (gloc, strk, wapn), how they map to Iubenda's purposes and to Google Consent Mode signals, everything on web and app that depends on them, their raw field names, why a missing consent is not a refused one, what a refusal removes from the web-to-app handoff, and the meta universal key (muk) that replaces the identifiers there."
tags: [data]
timestamp: 2026-10-29T00:00:00Z
---

# Consents

## Overview

What a user has and hasn't allowed us to do. Consent state is attached
to the session and travels down the funnel with it, which makes it a
breakdown dimension like any other in
[data/dimensions.md](/data/dimensions.md) — but one that also *causes*
gaps elsewhere in the data, because a refused consent removes a signal
rather than just labelling it.

There are **two macro categories**, and they are not the same kind of
object:

- **GDPR consents**, collected through **Iubenda** — the consent
  management platform behind the cookie banner.
- **Consents collected internally**, on features that ask for a
  permission of their own, outside the banner entirely.

They end up side by side on the same row, which is the reason to
document them together — and the reason to be explicit that the second
group is not Iubenda's.

## Where the Values Come From

No data is read from Iubenda directly. The consent state is taken from
an **internal table that proxies Iubenda**, kept in sync through
Iubenda's own **JavaScript hooks** — they fire client-side as the user
expresses a preference, and we write our own copy from them. Everything
downstream, the datamarts included, reads that copy.

The web site's pages are the exception: what they load and send
follows Iubenda's own state, not the copy. Their scripts wait for
Iubenda's answer in the browser, and on every request the server reads
Iubenda's consent cookie for the purposes accepted and for whether any
preference was expressed at all. When the copy is written, the site
updates the web push subscription and the consent attributes sent to
Braze from it.

Worth holding on to when a consent figure looks off: the vendor is
where the user's choice is made, the table is what we can actually
query, and the two are connected by hooks running in the user's
browser rather than by a lookup against Iubenda at read time.

## GDPR Consents (Iubenda)

Four purposes, each granted or refused separately. A user who accepts
one has not accepted the others: read each purpose on its own rather
than treating any of them as a single "accepted the banner" flag.

- **`tech`** — technical consent. The consents the portal needs to
  work at all, so this is not a real choice: it is never recorded as
  refused. Its practical use is the opposite of a preference — it
  marks that a consent state was recorded for the session at all.
- **`mktg`** — consent to marketing tracking.
- **`dtra`** — consent to transferring data to third parties.
- **`meas`** — consent to tracking for measurement purposes.

The banner itself — which policy, which reject mode, TCF and Google
consent-mode settings — is a feature flag:
[config/features/iubenda.md](/config/features/iubenda.md).

### Mapping to Iubenda Purposes and Google Consent Mode

Each of the four is one of Iubenda's numbered purposes, and each purpose
is translated into the Google Consent Mode signals that Google's tags
read. The mapping is the reference for every consent requirement on
this page: a tag that needs `ad_storage` is a tag that needs `mktg`.

| Consent | Iubenda purpose | Google Consent Mode signals |
|---|---|---|
| `tech` | 1 — Necessary | `security_storage` |
| `dtra` | 2 — Simple interactions and functionalities | `functionality_storage` |
| — | 3 — Experience improvement | `personalization_storage` |
| `meas` | 4 — Measurement | `analytics_storage` |
| `mktg` | 5 — Targeting and advertising | `ad_storage`, `ad_user_data`, `ad_personalization` |

- **Purpose 3 is not collected.** Neither the site nor the app offers a
  personalised experience, so there is nothing for it to allow. It has
  no consent of ours and no field, and `personalization_storage` never
  reflects a user choice.
- **`dtra` is mapped to the wrong purpose — under discussion.** Its
  meaning is the transfer of data to third parties, yet it is wired to
  purpose 2 and to `functionality_storage`, which are about site
  functionality. Why is not known, and the fix is still open. It is not
  a cosmetic issue: `dtra` gates the data-monetisation integration in
  the app (see [Where Consents Are Used](#where-consents-are-used)), so
  what the user is actually agreeing to when that integration turns on
  depends on how this is resolved.

## Consents Collected Outside Iubenda

Three, none of them part of the GDPR banner:

- **`gloc`** — consent to geolocation. App only, and **forward-looking**:
  the consent exists in the model but is not being asked of users
  today, so nothing collects it. Absence here is "never requested",
  not "everybody refused".
- **`strk`** — consent to system tracking. App only. This is the
  operating system's own tracking permission (App Tracking
  Transparency on iOS and the Android advertising-ID equivalent), so
  what is recorded is the outcome of a prompt Apple and Google own,
  not of one of our surfaces — we can influence when it is shown, not
  what it asks.
- **`wapn`** — consent to send push notifications. **One consent for
  both web and app**: the browser notification permission on web and
  the push permission in app are the same consent here, so it is the
  one of the three that is meaningful on both sides of
  [Context](/data/dimensions.md). When it is asked differs per surface.
  On web it is fixed in code, not configured: the browser permission is
  asked on every page but the partner redirect pages, and only after the
  cookie banner allows it (see
  [Where Consents Are Used](#where-consents-are-used));
  [config/features/web-push-notifications.md](/config/features/web-push-notifications.md)
  is not read by the site. In app, the primer/prompt triggers are
  [config/features/mobile-app-opt-in.md](/config/features/mobile-app-opt-in.md)
  for app settings versions 2 to 5, and from version 6 the
  `POPUP-CUSTOM-PUSH-PRIMER` and `POPUP-CUSTOM-PROMPT` popups of
  [config/features/mobile-app-settings.md](/config/features/mobile-app-settings.md).

## Reading Them

All seven are raw fields carrying an `iubenda` prefix — `iubendaTech`,
`iubendaMktg`, `iubendaDtra`, `iubendaMeas`, `iubendaGloc`,
`iubendaStrk`, `iubendaWapn`. **The prefix is a naming artefact of the
first four, not a statement of origin**: `gloc`, `strk` and `wapn` are
collected by us and have nothing to do with Iubenda, however the column
is spelled.

Each is **three-state, not boolean**: granted, refused, or nothing
recorded. The third state is the one that misleads — it means the
question was never answered (or never asked, as with `gloc`), which is
a different fact from a refusal and must not be counted as one. So
"refused" is not the complement of "granted", and a share computed as
`1 - granted` silently folds the unanswered sessions into the refusals.
See the semantic layer skill for the per-datamart availability window
and the exact null handling.

## Where Consents Are Used

Every tracking tag, integration and product behaviour that depends on a
consent, on web and app. **This table is the single place where a
dependency is stated**: the page linked on each row explains what the
thing is and does, and points back here for its consent requirement
rather than repeating it.

Two ways of depending on a consent, which read very differently in the
data:

- **Gated** — without the consent the thing does not run at all.
  Whatever it would have sent is absent.
- **Adapts** — it runs either way and changes what it sends: data
  without identifiers, anonymised, or not personalised. Volume is
  still there; what is lost is the link to the user.

| What | Surface | Requires | Without it | Explained in |
|---|---|---|---|---|
| GA4 | web | `meas` (to verify) | adapts — native Consent Mode | [core/martech/tags.md](/core/martech/tags.md) |
| Google Ads conversions | web | as GA4 (to verify) | adapts — native Consent Mode | [core/martech/tags.md](/core/martech/tags.md) |
| Google Ads remarketing | web | — | adapts — native Consent Mode | [core/martech/tags.md](/core/martech/tags.md) |
| Floodlight (signals to Bing) | web | unknown — possibly native, as Google's tags (to verify) | to verify | [core/martech/tags.md](/core/martech/tags.md) |
| Facebook | web | `mktg` (`ad_storage` + `ad_user_data`) | gated | [core/martech/tags.md](/core/martech/tags.md) |
| Criteo | web | `mktg` (`ad_storage` + `ad_user_data`) | gated | [core/martech/tags.md](/core/martech/tags.md) |
| OpenAI | web | `mktg` (`ad_storage` + `ad_user_data`) | gated | [core/martech/tags.md](/core/martech/tags.md) |
| Clarity | web | `mktg` + `meas` (`ad_storage` + `ad_user_data` + `analytics_storage`) | gated | [core/martech/tags.md](/core/martech/tags.md) |
| Display banners (GAM) | web | an answer to the cookie banner; `mktg` + `meas` for personalised ads | gated until the banner is answered, then adapts — ads not personalised (on US IPs, restricted data processing instead) | [core/media/gam.md](/core/media/gam.md) |
| AdSense for Search | web | an answer to the cookie banner; every purpose for the full request | gated until the banner is answered, then adapts — the request carries `ivt=false`, which leaves Google only its invalid-traffic storage | [core/media/afs.md](/core/media/afs.md) |
| Partner pixels | web | every purpose (`tech` + `dtra` + `meas` + `mktg`) | gated | [config/features/partner-pixels.md](/config/features/partner-pixels.md) |
| Email opt-in (Braze) | web | `tech` to send the address; `mktg` for web custom events and personalisation | without `tech`, gated — the address is not sent; without `mktg`, no web custom events and the profile is marked not personalisable | [core/marketing/crm.md](/core/marketing/crm.md) |
| Push permission request | web | `tech` + `mktg` | gated — the browser permission is never asked | [core/marketing/crm.md](/core/marketing/crm.md) |
| GA4 | app | native Consent Mode | adapts | [core/martech/tags.md](/core/martech/tags.md) |
| AppsFlyer | app | `meas` + `mktg` | adapts — data sent anonymised | [core/martech/tags.md](/core/martech/tags.md) |
| Display banners | app | `mktg`, plus the optional choice of single providers | adapts — ads not personalised | [core/media/gam.md](/core/media/gam.md) |
| Data-monetisation integration | app | `dtra` + `meas` + `mktg` | gated | [core/media/data-monetization.md](/core/media/data-monetization.md) |
| Partner events (server to server) | app | where GDPR applies, the user's TCF consent string | gated — the event is refused | [config/features/partner-pixels.md](/config/features/partner-pixels.md) |
| Web-to-app handoff | web + app | tracking consent on both sides | adapts — only the `muk` travels | the section below |
| Push notifications | web + app | `wapn` | gated | [core/marketing/crm.md](/core/marketing/crm.md) |
| Session qualification | web + app | a recorded consent state (`tech`) | session not qualified, on some channels | [core/business/funnel.md](/core/business/funnel.md) |

Notes on the rows:

- **Requirements in Consent Mode signals are read through the mapping
  above.** `ad_storage` and `ad_user_data` are both carried by `mktg`,
  `analytics_storage` by `meas`.
- **The provider choice on app banners is a subset of `mktg`.** A user
  who grants `mktg` can still switch off single ad providers; a user
  who refuses `mktg` has nothing left to choose. Read it as a
  refinement inside `mktg`, not as a consent of its own.
- **"To verify" marks an expectation, not a fact.** Google's tags handle
  Consent Mode by themselves, so their exact behaviour is Google's and
  has not been checked tag by tag. Treat those rows as the working
  assumption until they are confirmed.
- **Web ads need an answer, not an acceptance.** GAM banners and AFS
  blocks load only once Iubenda reports a preference expressed in the
  cookie banner, whatever it is; until it does, no ad is requested.

## What a Refusal Removes: the Web-to-App Handoff

The clearest case of a consent removing a signal rather than
labelling it. When a user crosses from web to app, the opening is
meant to carry the **web identifiers** of the journey behind it — the
web session, its marketing session and the web user. Those travel
only if the user allowed the tracking **on both sides**, web and app.
A refusal on either one is enough to stop them. The app then still
learns it was opened from web, through the **`muk`** described
below, but nothing that would let us walk back to the originating
session comes with it.

That split is what the app-opening data records as **origin type**:

- **Consented** — the web identifiers arrived; the opening is
  attributable back to its web session.
- **Unconsented** — only the `muk` arrived. The web origin is known,
  its attribution is not.
- **Unidentified** — neither arrived, only the code of the web tool
  that sent the user to the app. The web origin is known and nothing
  else is. Unlike the two above it is not a consent outcome: nothing
  says whether the user refused, the handoff simply carried that code
  alone.
- **No web origin** — not a web-to-app opening at all.

The `muk` fallback exists only since **2025-07-24**. Before that an
unconsented W2A opening carried nothing and is indistinguishable from
an ordinary app opening, so it cannot be recovered in hindsight: the
split is measurable going forward, not backwards. **Unidentified**
exists only since **2026-09-02**, when the Android app started reading
the tool code from the store install referrer. Before that the same
installs arrived with no code at all, so a W2A series crossing that
date gains visibility, not volume.

Two things follow, and both belong in any W2A reading:

- **The `fromWeb*` opening metrics count consented openings only.**
  Nobody chose that filter — the metrics are built by joining on the
  web session id, which unconsented openings do not have. In 2026 the
  unconsented share is **32%** of consented and unconsented openings
  together, so those metrics understate real W2A volume by about a
  third, and the gap moves with consent rates rather than with
  product performance. Unidentified openings have no web session id
  either, and are missing on top of that.
- **"Consented" here means the identifiers arrived, not that a
  consent was verified.** It is read off the handoff, not off the
  consent table, and the two do disagree: ~0.6% of consented openings
  sit on sessions with no consent state recorded at all — the `tech`
  case above.

Downstream this is the same broken chain as the **Unconsented**
bucket of the `userbased` model
([data/attribution.md](/data/attribution.md)), named twice. Unidentified openings break the chain the same way
and land in the same **Unconsented** bucket.

### The Meta Universal Key (`muk`)

The **meta universal key** is a **framework**, not a single field: a
general way to keep tracking users who did not give consent, in
aggregate, without identifying them. A consented journey is linked
through pointers to a specific user, session and marketing session;
the `muk` replaces them with a more generic string that points to
none of them. It still lets the user be **counted in aggregate data**,
without being followed individually.

What it makes possible is a **weak join**: two events are known to
belong together, but the join stops there. It never reaches the user,
the session or the campaign behind them.

**Today the framework is applied in one context only: the web-to-app
handoff described above**, where the weak join links the web side and
the app side of the same opening. Everywhere else a missing consent
still leaves no trace at all. Nothing in the framework is specific to
W2A, though, and it is meant to be applied to other contexts where
consent breaks a link between events. When that happens, read this
section as the definition of the framework, and the W2A handoff as its
first application.

## Why It Matters Beyond Compliance

- **Attribution.** The **Unconsented** bucket of the `userbased` model
  ([data/attribution.md](/data/attribution.md)) exists because an app
  install chain can't always be resolved — the handoff above is how it
  breaks: mostly through a refusal, and since 2026-09-02 also through
  Unidentified openings. With no web session there is no paid/not-paid
  or new/returning read to be had, so those sessions are not an anomaly
  to investigate but a consequence of this page.
- **Marketing signal quality.** Measurement and marketing consent are
  what allow conversions to reach the ad platforms; their absence is
  the reason server-side tagging and Consent Mode exist at all — see
  [core/marketing/sem/google-ads.md](/core/marketing/sem/google-ads.md).
- **CRM reach.** Push notification volume is bounded by `wapn`, not by
  the audience size a campaign targets — see
  [core/marketing/crm.md](/core/marketing/crm.md).
