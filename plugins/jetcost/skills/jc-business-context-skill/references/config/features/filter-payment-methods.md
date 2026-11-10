---
type: Feature Flag
description: "Order the payment-method filter of flight results, with a chosen set of top methods first."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# FILTER-PAYMENT-METHODS

Orders the list of the payment-method filter on the flight results page
(the `pmfees` filter of
[config/features/flights-filters.md](/config/features/flights-filters.md)),
where the user ticks the payment methods they will pay with and each
offer's price is recomputed with the fee of the cheapest ticked method.
The flag never adds or removes a method: the list always holds every
method found in the results, and only its order changes. It is not
read by the web site: the search backend splits the methods into a
`top` and an `others` group (`sorted_displayed_payment_methods_ids`).
The Jetcost and white-label sites show the `top` group first, with the
others behind a "show more" link, or the `others` group at once when
`top` is empty. Which methods exist, and which ones the displayed price
is computed with, is
[config/features/payment-methods-configuration.md](/config/features/payment-methods-configuration.md).

## Configs

### ENABLED
Boolean, default `0`. With `1`, the order follows the two configs
below. With `0`, every method goes to `others`, in alphabetical order,
and the filter lists them all at once. With `1` but
`MAX-PAYMENT-METHODS-ON-TOP` at `0` and `TOP-PAYMENT-METHODS` empty,
the search backend switches the feature off by itself, with the same
result.

### MAX-PAYMENT-METHODS-ON-TOP
Number, default `0`. Above `0`, the first that many methods of
`TOP-PAYMENT-METHODS` found in the results go to `top`, in their
configured order, and the filter shows only them at first; the others
go to `others`, in alphabetical order, behind "show more". With `0`,
`top` stays empty and `others` holds every method, those of
`TOP-PAYMENT-METHODS` first in their configured order and then the
rest in alphabetical order, all shown at once.

### TOP-PAYMENT-METHODS
List of payment-method codes (such as `VI-CR` or `PAYPAL`). The methods
to put first, in this order; codes absent from the results are
skipped.
