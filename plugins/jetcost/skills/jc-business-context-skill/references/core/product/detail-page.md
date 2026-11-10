---
type: Product Feature
description: "The detail page product feature that shifts conversion from blind clicking to informed selection, and how its clickout-mode configuration affects comparability of commercial metrics."
tags: [product, commercials]
timestamp: 2026-10-13T00:00:00Z
---

# Detail Page

## Overview

The detail page is a product feature that enriches
flight offers with additional information before
the user clicks out. It shifts the conversion
model from blind clicking to informed selection,
improving traffic quality — particularly valuable
in CPA markets where CR directly affects revenue.

## Clickout Mode

The detail page is not a cosmetic add-on — its presence or absence
changes the identity of the click itself. A click mediated by a
detail page and a direct click are economically different events:
different friction, different intent, different expected value.

Where the detail page is deployed is a deliberate commercial decision,
not an automatic consequence of anything: availability is always
governed by the flag's `ENABLED` config, and no rule in the product
derives it. The reasoning behind the decision is the durable part.

**Sponsored placements never carry a detail page, in any market or on
any platform.** MAL-Core (Sponsored) deals are always CPC, so the
conversion-quality trade-off the detail page exists for doesn't apply
to them — there is nothing to gain by adding friction to a click that
is itself the revenue.

On Core, the same trade-off is what the per-market choice turns on: the
detail page is worth its friction where revenue depends on what happens
*after* the click, and costs without returning where the click is the
revenue.

The choice is taken per **market × platform**, not per market: the same
market can run with a detail page on app and without one on web, so
"a market does/doesn't have the detail page" is not a well-formed
statement.

Which markets have it right now is not written here, because it is
configuration: it is whatever the flags' `ENABLED` config says. Web and
app are separate implementations with separate levers,
[config/features/detail-card.md](/config/features/detail-card.md) and
[config/features/mobile-app-detail-page.md](/config/features/mobile-app-detail-page.md),
so the current state is read from the live state of those two flags,
and when it changed from their history in the operation logs.

### Consequences for analysis

- **Comparability.** Summing an element with a detail page and one
  without is apples and pears. It is not forbidden — sometimes it is
  the only cut available — but it must be done knowingly and
  declared. The dangerous case is not the deliberate aggregation; it
  is the involuntary comparison: lining the same partner up across
  two markets and reading the delta as performance, when part of the
  delta is the detail page. The trap has a web-vs-app form too: in a
  market where the two platforms differ on exactly this, a web/app
  split is not a clean read of platform behaviour.
- **Time series.** If the configuration changes inside the analysis
  window, the discontinuity is a configuration artefact, not a
  commercial movement. Before attributing a break to a partner or an
  action, verify against the flags' history that the setup was constant over
  the period.
- **Metric choice.** CTR and eCPC are comparable only within a
  homogeneous mode. Outside it, normalise the comparison or drop it.
