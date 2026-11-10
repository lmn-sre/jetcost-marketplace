---
type: Feature Flag
description: "Email opt-in forms and subscription modal on the Jetcost flights pages, sending the address to Braze."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# EMAIL-MARKETING

The email opt-in of the Jetcost site: the forms where a user leaves an
email address to receive Jetcost's emails, which feed the email channel
of [core/marketing/crm.md](/core/marketing/crm.md). They appear on
flights pages only: a box on the flights homepage and on the flight SEO
pages ([core/product/seo-pages.md](/core/product/seo-pages.md)), a
subscribe button in the header on desktop, a card in the side column of
the flight results on wide screens (only while the
[config/features/book-now-price-indicator.md](/config/features/book-now-price-indicator.md)
flag is off, even on searches where its card stays hidden), and the
subscription modal those buttons open. The modal can also open by
itself on the flight results, and the refresh modal can carry the form.
On white-label sites the flag shows nothing.

A user who has subscribed on a country and language never sees it there
again for a year, the life of the cookie that records the subscription,
and traffic that comes from the newsletter never sees it. The address
reaches Braze only if the user has accepted the technical consent of
the cookie banner ([data/consents.md](/data/consents.md)); otherwise
nothing is recorded and no confirmation shows, though the GA4
`subscribe` interaction event is still sent. Besides website, country,
language and device, the flag's rules can target the user's IP country
(`country_user`) and the campaign the session came from (`campaigns`).

## Configs

### DOUBLE-OPT-IN
Boolean, default `0`. With `1`, double opt-in: the subscription stays
pending until the user confirms it by email. The address is recorded in
Braze with the state `SUBSCRIBED`, not `OPTED_IN`, and the confirmation
step of the modal uses the double opt-in copy. With `0`, single opt-in:
the address is recorded as `OPTED_IN` at once. Either way the flow is
stored on the user's Braze profile.

### EMAIL-OPTIN-SEARCH-AUTOMATIC-ACTIVATION
Boolean, default `0`. With `1`, the subscription modal opens by itself
on the flight results, once the search has completed, for a user who has
made at least `EMAIL-OPTIN-SEARCH-AUTOMATIC-SEARCH` flight searches;
`EMAIL-OPTIN-SEARCH-AUTOMATIC-TYPE` decides when. Searches are counted
only while it is on, and the count restarts when the modal opens by
itself (not when a button opens it) and whenever a page is served with
the feature off, any non-flights page included. If the refresh modal
opens first, the automatic modal is cancelled. With `0`, the modal opens
only from its buttons.

### EMAIL-OPTIN-SEARCH-AUTOMATIC-SCROLL
Number, default `6`. With `EMAIL-OPTIN-SEARCH-AUTOMATIC-TYPE` on
`SCROLL`, the result that opens the modal when it scrolls into view: with
`6`, the sixth result of the list. If that result never shows on
screen, the modal does not open. Ignored with `TIME`.

### EMAIL-OPTIN-SEARCH-AUTOMATIC-SEARCH
Number, default `3`. Number of flight searches from which the modal
opens by itself: with `3`, from the results of the third search on. Once
it has opened, the count starts again. Read only when
`EMAIL-OPTIN-SEARCH-AUTOMATIC-ACTIVATION` is on.

### EMAIL-OPTIN-SEARCH-AUTOMATIC-TYPE
Select, default `TIME`, between `TIME` and `SCROLL`. What opens the
automatic modal once the search has completed: `TIME` waits
`EMAIL-OPTIN-SEARCH-AUTOMATIC-SECONDS`, `SCROLL` waits for the result set
by `EMAIL-OPTIN-SEARCH-AUTOMATIC-SCROLL` to come into view. Read only
when `EMAIL-OPTIN-SEARCH-AUTOMATIC-ACTIVATION` is on.

### ENABLED
Boolean, default `0`. With `1`, the opt-in forms show on the Jetcost
flights pages, under the conditions above. With `0`, none of them shows
and the automatic modal's search count is reset.

### REFRESH-MODAL-EMAIL-MARKETING
Boolean, default `0`. With `1`, the refresh modal of
[config/features/refresh-modal.md](/config/features/refresh-modal.md)
on the Jetcost flight results shows an email opt-in version, with the
subscription form, instead of its standard content; closing it still
relaunches the search. It applies only where the opt-in itself shows,
so not to users who have already subscribed. With `0`, the standard
refresh modal.

### EMAIL-OPTIN-SEARCH-AUTOMATIC-SECONDS
Number, default `180`. With `EMAIL-OPTIN-SEARCH-AUTOMATIC-TYPE` on
`TIME`, seconds between the completion of the search and the opening of
the modal: with `180`, three minutes. If the user leaves the page
earlier, it does not open. Ignored with `SCROLL`.
