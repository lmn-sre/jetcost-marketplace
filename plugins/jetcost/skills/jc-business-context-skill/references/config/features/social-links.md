---
type: Feature Flag
description: "Shows a block of links to the site's social media pages and to the app on the CMS editorial pages."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# SOCIAL-LINKS

A "find us on" block of cards on the CMS editorial pages (the editorial
homepage, the special pages and the media pages): one card per social
network whose link is set, each opening in a new tab, plus an "App" card
that opens the app through the `editorial-banner-w2a` dynamic link (a W2A
link, see [core/product/w2a/index.md](/core/product/w2a/index.md)). No
config controls the App card, and since every page carrying the block
gets it, the block shows whenever the flag is on, even with no social
link set. It exists on the Jetcost and white-label sites; other pages
never show it.

## Configs

### ENABLED
Boolean, default `0`. With `1`, the block shows on the editorial pages.
With `0`, it never shows.

### FACEBOOK-LINK
String, empty by default. Address of the Facebook card. Empty: no
Facebook card.

### INSTAGRAM-LINK
String, empty by default. Address of the Instagram card. Empty: no
Instagram card.

### TWITTER-LINK
String, empty by default. Address of the card labelled "Twitter". Empty:
no Twitter card.
