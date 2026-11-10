---
type: Feature Flag
description: "Shows Trustpilot review banner based on search activity thresholds."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# REVIEW-BANNER

Named "Trustpilot Feedbck" in the backoffice. A popup over the flight
results page asking the user to rate the site from one to five stars.
Four or five stars open the Trustpilot page set in `TRUSTPILOT-LINK` in
a new tab, to leave a public review there; one to three stars ask for a
written comment instead, which is emailed to an internal reviews mailbox
and never reaches Trustpilot. The user can also postpone it ("remind me
later") or close it. It exists on the Jetcost and white-label sites.

It opens once the user has made `SEARCHES-THRESHOLD` flight searches in
the browser session, and only where `TRUSTPILOT-LINK` is set. Once the
user rates it or closes it, it stays away for the days set by the two
cookie configs. The search count and the pause are kept separately for
each country and language of the site. As the code stands it can open
only on sites without an FAQ page: where one exists the popup fails to
render and the results page stops scrolling (see `FAQ-PAGE-ENABLED`).

## Configs

### ENABLED
Boolean, default `0`. With `1`, the popup opens on the flight results
under the conditions above; flight searches are counted only while it is
on and not paused. With `0`, it never opens.

### FAQ-PAGE-ENABLED
Boolean, default `0`. Meant to add a link to the site's FAQ page,
opened in a new tab, to the written-comment step. It has no effect as
the code stands: the link tests a value the popup cannot read, so on
sites with an FAQ page the popup breaks whatever this config says, and
on sites without one there is no link.

### HIGH-RATING-COOKIE-EXPIRATION-DAYS
Number, default `180`. Days the popup stays away after a rating of four
or five stars.

### LOW-RATING-COOKIE-EXPIRATION-DAYS
Number, default `30`. Days the popup stays away after a rating of one to
three stars, or after the user closes it. "Remind me later" pauses
nothing: it only restarts the search count.

### SEARCHES-THRESHOLD
Number, default `3`. Number of flight searches in the browser session
after which the popup opens: with `3`, on the results of the third
search. The count restarts whenever the popup is answered, postponed or
closed.

### TRUSTPILOT-LINK
String, empty by default. Address of the Trustpilot page that a rating
of four or five stars opens. While it is empty the popup never opens and
no search is counted, whatever `ENABLED` says.
