---
type: Feature Flag
description: "Enables exit-unit ads on flights search form with trailing tab option."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# MAL-FLIGHTS-EXITUNIT-FORM

The exit unit of the flights search form, a MAL Media placement (see
[core/commercials/integration-types.md](/core/commercials/integration-types.md)).
When the user submits the form, the results open in a new tab while the
original tab goes, through MAL, to the site of the advertiser that won
the auction on that search, and stays behind the results (a tab-under).
If no advertiser bids, that tab falls back to a Jetcost page: a search
to everywhere from the same origin, or the home page. On the results
page it opens only when the user changes the search: relaunching the
same search does not open it, unless `TRAILING-TAB-CHECKBOX` is on. The
results of a search whose submit opened it do not also get the
results-page exit unit
([config/features/mal-flights-exitunit-page.md](/config/features/mal-flights-exitunit-page.md)).

It exists on the Jetcost site and on white-label sites; nothing in code
limits it to a device, the flag's device rules decide. It shows only
while [config/features/mal.md](/config/features/mal.md) is on. When
[config/features/mal-flights-checkboxes.md](/config/features/mal-flights-checkboxes.md)
is on too and has partners to offer, a submit goes through the
checkboxes first, and the exit unit opens only if the user then picks
the plain search. One sibling per product: `MAL-FLIGHTS-EXITUNIT-FORM`,
`MAL-CARS-EXITUNIT-FORM`.

## Configs

### ENABLED
Boolean, default `0`. With `1`, submitting the flights search form opens
the exit unit as described above. With `0`, the form submits normally.

### MAX-PARTNERS
Number, default `5`. While `TRAILING-TAB-ENABLED` is off, the maximum
number of advertiser bids MAL may use for the exit unit. The user still
gets a single advertiser tab; how MAL uses more than one bid there is
decided on MAL's side. `0` also means 5. With `TRAILING-TAB-ENABLED` on
it has no effect: the `mauction` trailing-tab unit ignores it and sends
MAL no maximum.

### TRAILING-TAB-CHECKBOX
Boolean, default `0`. Read only when `TRAILING-TAB-ENABLED` is on. With
`1`, the form shows a ticked checkbox, with an info popover linking to
the terms and conditions, and the tab-under opens only while the box
stays ticked. On the results page it then also opens when the same
search is relaunched from the open form, never from the collapsed form,
whose search button only relaunches the search. With `0`, there is no
checkbox and the exit unit behaves as described above.

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
`TRAILING-TAB-CHECKBOX` only works with it on.
