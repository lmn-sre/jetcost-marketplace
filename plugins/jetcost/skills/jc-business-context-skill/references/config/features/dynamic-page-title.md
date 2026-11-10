---
type: Feature Flag
description: "Replaced a page's main heading with the Google Ads keyword the visitor came from; the site no longer reads the flag, so it has no effect."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# DYNAMIC-PAGE-TITLE

The web site no longer reads this flag: changing it has no effect. It
used to replace the main heading of the home pages, the flights product
page and the SEO pages with the Google Ads keyword the visitor came
from, when the landing address carried a campaign and keyword pair
registered in Jetcost's marketing data (for the SEM landing pages, see
[core/marketing/sem/index.md](/core/marketing/sem/index.md)). The
heading is now always the page's standard translated title.

## Configs

### ENABLED
Boolean, default `0`. No longer has any effect: it switched the keyword
heading on.
