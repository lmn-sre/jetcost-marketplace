---
type: Feature Flag
description: "Enables exit-unit ads on the cars search form, with trailing tab option."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# MAL-CARS-EXITUNIT-FORM

The exit unit of the car rental search form: the cars sibling of
[config/features/mal-flights-exitunit-form.md](/config/features/mal-flights-exitunit-form.md),
which describes the tab-under and the configs. It works the same way on
the cars form, with one difference: if no advertiser bids, the tab falls
back to the Jetcost car rental home page. The results of a search whose
submit opened it do not also get
[config/features/mal-cars-exitunit-page.md](/config/features/mal-cars-exitunit-page.md),
and when
[config/features/mal-cars-checkboxes.md](/config/features/mal-cars-checkboxes.md)
is on too and has partners to offer, a submit goes through the
checkboxes first.

It exists on the Jetcost site and on white-label sites, and shows only
while [config/features/mal.md](/config/features/mal.md) is on.

## Configs

### ENABLED
Boolean, default `0`. With `1`, submitting the car rental search form
opens the exit unit. With `0`, the form submits normally.

### MAX-PARTNERS
Number, default `5`. Maximum number of advertiser bids MAL may use for
the exit unit while `TRAILING-TAB-ENABLED` is off; with it on it has no
effect. Same as on flights.

### TRAILING-TAB-CHECKBOX
Boolean, default `0`. Read only when `TRAILING-TAB-ENABLED` is on. With
`1`, the form shows the ticked trailing-tab checkbox and the tab-under
opens only while it stays ticked; same as on flights.

### TRAILING-TAB-ENABLED
Boolean, default `0`. Which MAL placement the form asks for; the user
sees the same tab-under either way. With `1`, the form asks MAL for the
`trailing-tab` placement; with `0`, for `exitunit-form`. When MAL
notifies the click, the MAL webhook records it with integration type
`TRAILINGTAB` / sub-type `STANDARD` with `1`, `EXITUNIT` / `FORM` with
`0`; clicks bought through `mdflow` instead carry the type and sub-type
MDFLOW sends with the click (see
[core/commercials/integration-types.md](/core/commercials/integration-types.md)).
Every other click attribute is the same: the click category (4002), the
home-deep (`HomeDeep` 5) and the `_POP` suffix of the partner code.
Which campaigns MAL serves on each placement is decided on MAL's side;
on white-label sites Jetcost itself is one of the trailing-tab bidders
(see
[core/commercials/mal/self-trailingtab.md](/core/commercials/mal/self-trailingtab.md)).
