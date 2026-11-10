---
type: Feature Flag
description: "Switches the score of flight results on and sets the weights of price, duration and stops in it."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# SIS

Named "Sorting" in the backoffice. The score of the flight results:
whether the search backend computes it, and how much price, total
duration and number of stops weigh in it. Every offer gets a score,
truncated to 5 decimals, that adds three terms; each lowest value is
the lowest of the same search:

- `DELTA-PRICE` × (price + 1) / (lowest price + 1);
- `DELTA-DURATION` × (duration + 1) / (lowest duration + 1);
- `DELTA-STOPS` × (stops + 1) / (lowest number of stops + 1).

Lower is better, and an itinerary scores as its best offer. It is read
by the search backend, which computes the scores and returns the order
with the results, on web and in the app; the web site applies the order
it receives. The orderings that use the score are explained in
[core/product/sorting.md](/core/product/sorting.md): the weights count
in tiered sorting, except in its `NEW-SORTING` A/B arm, and in the pure
score ordering, not in sorting 2.0.

## Configs

### DEFAULT-SORTING
Choice between `price` and `score`, default `price`. The switch of the
score: with `score` the search backend computes it, with any other
value it computes none. The web site also uses it as the order shown
before the first results arrive (see `ENABLED`); from the first results
on, it follows the order the results carry. The user can still change
the order.

### DELTA-DURATION
Number, default `0`. Weight of the total duration in the score. With
`0`, duration does not count.

### DELTA-PRICE
Number, default `0`. Weight of the price in the score. With `0`, price
does not count.

### DELTA-STOPS
Number, default `0`. Weight of the number of stops in the score. With
`0`, stops do not count. With all three weights at `0`, every itinerary
scores the same, and in the pure score ordering partner gain decides,
then the itinerary id.

### ENABLED
Boolean, default `1`. The search backend does not check it:
`DEFAULT-SORTING` alone switches the score on or off. The web site
reads it only for a fallback order shown before the first results
arrive. When the feature is marked *always enabled* in the backoffice,
`ENABLED` has no effect: every eligible request gets the feature on.
Whether it is marked so is live state — check the feature state, not
this file. With the mark, that fallback follows `DEFAULT-SORTING`;
without it, `0`, or no rule setting it, would make the fallback
`price`.
