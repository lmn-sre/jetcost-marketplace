---
type: Feature Flag
description: "Enables partner pixel tracking across the platform."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# PARTNER-PIXELS

The tracking pixels of third-party travel marketing partners. For each
partner selected in `PARTNER-PIXELS-LIST-ENABLED`, the site loads the
partner's script and sends it the page type (home, results, partner
redirect or other) with the search and, on the redirect page, the offer
the user chose. On web they load on flights and cars pages only, and only
for users who accepted every consent purpose; they exist on the Jetcost
site and on white-label sites. Unlike the tags of
[core/martech/tags.md](/core/martech/tags.md), they are built into the
site, not deployed through Google Tag Manager, so a container publish
does not change them.

On the app there are no pixels: the app reports its home, results and
redirect events, flights and cars, to the backend, which forwards them
server to server to the partners selected for the app. When GDPR applies,
an event that comes without the user's consent string is refused.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the partners selected in
`PARTNER-PIXELS-LIST-ENABLED` receive the events described above, from
web and from the app. With `0`, none of them receives anything.

### PARTNER-PIXELS-LIST-ENABLED
Multiple choice, empty by default, among `SOJERN` (Sojern), `ADARA`
(Adara), `TRAVEL-AUDIENCE` (Travel Audience) and `EVORRA` (Evorra). The
partners whose pixels load and whose app events are forwarded. For
Evorra the site only loads its script, with no page event of its own,
and the app's events are not forwarded to it. With the list empty,
nothing is sent even with `ENABLED` on.
