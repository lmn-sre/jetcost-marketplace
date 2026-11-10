---
type: Feature Flag
description: "Surface app-exclusive flight prices on web to incentivize app downloads."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# CUG — Closed User Group

A W2A tool that surfaces on web flight offers whose prices are exclusively available on app. The offer keeps its price, labelled as an app price with the full price struck through and the discount shown, while the partner name is blurred; clicking it opens an overlay that sends the user to the app. See also [core/product/w2a/cug.md](/core/product/w2a/cug.md).

## Configs

### ENABLED
Enables or disables the CUG feature. On the web, a search whose stored `accessibility` lists `w2a` gets its results page only while `ENABLED` is on and `TYPE` is `TO_APP`; otherwise the site relaunches it (`invalid_search`).

### CLUSTER-THRESHOLD
Number, default `5`. Not read by the web: it is handed to the app with its settings (`clusterThreshold` on the oldest settings version, `cluster_threshold` on the newer ones); where CUG is off for the app, the app receives the default. Its effect is decided inside the app: by its name, a minimum number of CUG offers.

### VALUABLE-ROW-THRESHOLD
Number, default `50`. App only: the web never reads it. Only the oldest version of the app settings service still sends it (`valuableRowThreshold`), so app versions on a newer settings version never receive it; what it does is decided inside the app.

### MAX-OFFERS-PER-BRAND
Number, default `5`. Not read by the site; by its name, the maximum number of CUG offers from the same partner in the results.

### MULTIPLE-CUG-OFFERS-PER-ITINERARY
Whether multiple CUG offers can be shown for the same itinerary (e.g. from different partners).

### PRICE-MIN-DIFF-PERCENTAGE
Minimum price difference (as a percentage) between a CUG offer and the corresponding web deal for the CUG offer to be eligible to appear. Ensures the app-exclusive price is meaningfully better.

### MIN-PERCENTAGE-TO-SHOW-DISCOUNT
Minimum price advantage (as a percentage) a CUG offer must have over the web deal to show a discount label. A CUG offer can appear without the label if it passes PRICE-MIN-DIFF-PERCENTAGE but not this threshold.

### SHOW-MORE-EXPENSIVE-THAN-STANDARD-CUG-OFFERS
Boolean, default `0`. Not read by the site; whether the search backend still reads it is not confirmed. By its name, whether CUG offers dearer than the standard offer may be shown.

### DYNAMIC-LINK
Name of the dynamic link (deep link) associated with the CUG campaign, used to redirect users to the app.

### DYNAMIC-LINK-CPA
The dynamic link used when the partner's business model is CPA.

### DYNAMIC-LINK-CPC
The dynamic link used when the partner's business model is CPC.

### TYPE
Defines the type of dynamic link to use.

### TUTORIAL-SHOWN-THRESHOLD
Number, default `2`. App only: the web never reads it. It is handed to the app with its settings; where CUG is off for the app, the app always receives the default. Its effect is decided inside the app: by its name, it caps how many times the app shows the CUG tutorial. Only the oldest version of the app settings service still sends it, so app versions that call a newer settings version never receive it.

### WLBL-ENABLED
Boolean, default `0`. Not read by the site. "wlbl" is the feature's route whitelist/blacklist (origin–destination pairs, by airport or country, marked allowed or blocked), not white-label sites; by the backoffice description, this config decides whether CUG's on/off status is also checked against that list.
