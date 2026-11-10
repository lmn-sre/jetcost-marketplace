---
type: Feature Flag
description: "Payment-method fees in flight offer prices: which methods are active, which ones the displayed price is computed with, and the fee deviation that is monitored."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# PAYMENT-METHODS-CONFIGURATION

The per-market list of payment methods the flight search works with,
and whether offer prices include a payment-method fee. It is not read
by the web site: the search backend applies it and the results, on web
and in the app, arrive with it already applied. The active methods are
the ones the payment-method filter of the results lists; the checked
ones are the methods the displayed price is computed with. The site
does not read `CHECKED` to tick the filter: the filter starts with the
methods the results mark as ticked, counts as already applied when one
arrives unticked, and recomputes prices with the cheapest fee among the
methods the user ticks. The order of that filter is
[config/features/filter-payment-methods.md](/config/features/filter-payment-methods.md);
see [core/commercials/magic-method.md](/core/commercials/magic-method.md)
for why prices that depend on the payment method matter.

## Configs

### ACTIVE-PM
List of payment methods, each with a `checked` flag and its own
positive and negative deviation. When it is not empty, it replaces
`ACTIVE` and `CHECKED` entirely: its methods are the active ones, those
flagged `checked` are the checked ones, and a method's own deviation
overrides `DEVIATION`. When it is empty, `ACTIVE` and `CHECKED` apply.

### DEVIATION
A positive and a negative percentage, empty by default. Used only when
`ACTIVE-PM` is set, for the methods that do not set their own deviation
there. It does not change the displayed price: a fee above the base
price times the positive percentage, or below minus the base price
times the negative one, is logged and counted in a metric. Empty means
no check; `0` flags any fee above or below zero.

### ENABLED
Boolean, default `0`. With `0`, an offer displays the partner's base
price, without any fee. With `1`, it displays the base price plus the
lowest fee among the offer's methods that are both active and checked;
an offer with no such method gets no price and is not shown. Offers of
backfill integrations (see
[core/commercials/integration-types.md](/core/commercials/integration-types.md))
get every active and checked method, at fee `0`.

### ACTIVE
Multiple choice of payment methods, empty by default. The active
methods: recognised by the search backend and listed in the
payment-method filter. Ignored while `ACTIVE-PM` is not empty.

### CHECKED
Multiple choice of payment methods, empty by default. The methods the
displayed price is computed with, among the active ones. Ignored while
`ACTIVE-PM` is not empty.
