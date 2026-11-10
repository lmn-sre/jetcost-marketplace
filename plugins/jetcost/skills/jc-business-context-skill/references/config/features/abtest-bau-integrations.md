---
type: Feature Flag
description: "Exclude a list of partner integrations from flight searches; by its name, meant for an A/B arm that measures searching without them."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# ABTEST-BAU-INTEGRATIONS

Leaves a list of partner integrations out of flight searches. By its
name, it is meant to be scoped on an A/B arm (see
[core/product/abtests.md](/core/product/abtests.md)): the searches of
that arm query every partner except the listed ones, so their offers
are missing from the results, and comparing the two arms shows the
impact of searching without those partners. It is not
read by the web site: the search backend applies it when it starts a
flight search, on web and in the app alike, and sets the search profile
of those searches to `BAU-INT-ABT` (`settings.profile` in the results).

## Configs

### INTEGRATIONS-NAME
List of partner codes, empty by default; case does not matter. The
partners excluded from the search while `ENABLED` is on. A code that
matches no partner has no effect.

### ENABLED
Boolean, default `0`. With `1`, the partners of `INTEGRATIONS-NAME` are
excluded from the search. With `0`, every partner is queried as usual.
