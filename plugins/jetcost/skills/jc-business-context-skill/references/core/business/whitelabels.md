---
type: Business Concept
description: "The white labels: full-feature clones of the Jetcost site under a different skin, used as a testing ground for changes too risky for the core brand — the full domain inventory with each one's market and language, and why they are neither one perimeter nor interchangeable with each other."
tags: [business]
timestamp: 2026-09-15T00:00:00Z
---

# White Labels

## Overview

A white label is a **full clone of the Jetcost site under a different
skin**: same features, same funnel, same integrations, a different visual
identity and a handful of pages of its own. They sit inside the `jetcost`
business profile (see
[core/business/business-profiles.md](/core/business/business-profiles.md)),
identified by `websiteType = 'whitelabel'`, one `website` value per
domain.

They exist as a **testing ground**. The point of running a second set of
front-ends with the same product behind them is to try things without
putting the core brand at risk — a change can meet real traffic on a
white label before, or instead of, reaching the core site.

That purpose explains their shape: not a distribution channel with its
own commercial deal, but a controlled surface where the perimeter of an
experiment can be drawn around a domain instead of a traffic split.

## The inventory

One row per white label, with the market and language it is built for.
The first column is the `website` value carried in the data, so this
table is also the join between a domain someone names in a conversation
and the rows a query returns.

| `website` | Host | Country | Language |
|---|---|---|---|
| `rumbo` | rumbo.com.br | BR | pt |
| `fluge-buchen` | fluge-buchen.de | DE | de |
| `baratos-vuelos` | baratos-vuelos.es | ES | es |
| `los-vuelos-baratos` | los-vuelos-baratos.es | ES | es |
| `vuelos-confortables` | vuelos-confortables.com | ES | es |
| `vuelosbaratosconfortables` | vuelosbaratosconfortables.es | ES | es |
| `billet-avion` | billet-avion.be | FR | fr |
| `billet-avion-express` | billet-avion-express.com | FR | fr |
| `billet-express` | billet-express.fr | FR | fr |
| `comparateur-billet-avion` | comparateur-billet-avion.fr | FR | fr |
| `comparateurprixvol` | comparateurprixvol.fr | FR | fr |
| `dates-flexibles` | dates-flexibles.fr | FR | fr |
| `omeilleursprix` | omeilleursprix.com | FR | fr |
| `ryan-vols` | ryan-vols.fr | FR | fr |
| `unvolpascher` | unvolpascher.fr | FR | fr |
| `vol-direct` | vol-direct.fr | FR | fr |
| `vol-express` | vol-express.com | FR | fr |
| `vol-multi-destinations` | vol-multi-destinations.fr | FR | fr |
| `volmoinscher` | volmoinscher.be | FR | fr |
| `vols-dates-flexibles` | vols-dates-flexibles.fr | FR | fr |
| `vols-pas-chers` | vols-pas-chers.be | FR | fr |
| `flightcheaper` | flightcheaper.co.uk | GB | en |
| `happy-journey` | happy-journey.co.uk | GB | en |
| `pricenfly` | pricenfly.com | GB | en |
| `holidayiq` | holidayiq.com | IN | en |
| `voli-da` | voli-da.it | IT | it |
| `voli-diretti` | voli-diretti.it | IT | it |
| `voloeconomico` | voloeconomico.info | IT | it |
| `baratos-voos` | baratos-voos.com | PT | pt |
| `bilhetedeaviao` | bilhetedeaviao.com | PT | pt |
| `voos-baratos` | voos-baratos.com.pt | PT | pt |
| `voos-low-cost` | voos-low-cost.com.pt | PT | pt |
| `9-flights` | 9-flights.com | US | en |
| `airlines-flight` | airlines-flight.com | US | en |
| `airways-flights` | airways-flights.com | US | en |

Plus `fly-scanner` and the three car-rental domains, both covered below
because they don't fit the shape of the table.

**The country codes above are the ones the site registry uses, and the
UK one is not what the data says.** The registry records the UK market
as `GB`; `country` in the datamarts records it as `UK`. Read
[data/query-caveats.md](/data/query-caveats.md) before writing any
white-label query that touches the UK.

**A domain's TLD does not name its market.** Three of the French white
labels are `.be`, several markets are served from a `.com`, and one
Italian one is a `.info`. The market is the column, never the suffix —
the same trap the core site sets by serving France from
`www.jetcost.com`.

## One white label is one market

Every domain in the table serves **exactly one country and one
language**. That is the opposite of the core site, where the single
`website` value `jetcost` covers every market at once (see
[data/dimensions.md](/data/dimensions.md)), and it has a direct
consequence when querying: on white-label rows `website` and `country`
are very nearly the same field. A breakdown by both produces one
populated cell per domain and a grid of zeroes around it, and a filter
on one of the two is usually enough.

It also means a white label cannot be compared across markets, only
against other white labels or against the core site in its own market.
There is no domain with a French and a German version — except one.

### `fly-scanner` is the exception

`fly-scanner` is a **single `website` value serving sixteen markets**:
one domain, `fly-scanner.com`, declined into eighteen locale paths
(`/fr`, `/de`, `/us`, `/us-es`, …) across AR, AT, AU, BR, CA, CO, DE,
ES, FR, GB, IE, IT, MX, NL, PT and US, in seven languages. Canada and
the United States carry two locales each, one per language.

So it is the one white label where a country or language breakdown
*inside* the domain is meaningful, and the one where a per-domain
aggregate mixes markets that have nothing to do with each other. Treat
it the way the core site is treated — always sliced by country — rather
than as a peer of `vol-direct`.

## Three of them sell cars, not flights

The inventory is not uniformly a flight product. Three domains are car
rental:

| `website` | Host | Country | Language |
|---|---|---|---|
| `voiture-location` | voiture-location.be | FR | fr |
| `aluguer-carros` | aluguer-carros.com.pt | PT | pt |
| `volagratis` | noleggio-auto.volagratis.com | IT | it |

The first two record car searches and no flight searches at all, which
is the shape to expect: they are a car front-end, so every flight metric
on them is empty by construction rather than by underperformance. The
third runs under a different group brand entirely.

They are a small enough set to name, but they break any statement of the
form "white labels are clones of the Jetcost flight site" — that holds
for the table above, not for these three.

## Not one perimeter: they are concentrated

White labels are a meaningful but minority share of the profile's
traffic — roughly an order of magnitude below the core site — and that
share is **heavily concentrated in a couple of domains**, currently the
French and Italian ones — `vol-direct` and `voli-diretti`. Many more
domains carry sessions, but only a dozen or so carry enough to read.

The practical consequence: "the white labels" is rarely a meaningful unit
of analysis. A white-label aggregate is a couple of large sites plus
noise, and a white-label average moves when one of those two moves.
Name the domain, or check the concentration before treating the group as
a segment.

## They are not interchangeable — SEM is the clearest case

Some white labels are actively bought for; others get no paid traffic at
all. The observed range runs from domains that are almost entirely paid,
with Google Ads spend comparable to a small market, through domains that
are mostly organic, down to domains with **zero paid sessions and zero
spend**. Some carry paid traffic that isn't Google Ads at all.

So a white label can be a paid-acquisition property, a nearly organic
one, or effectively dormant. Whether a given domain has SEM behind it is
a per-domain fact to check, never an assumption — and a funnel or ARPU
comparison across white labels is largely a comparison of traffic mix
rather than of the sites themselves.

## The trailing tab sends white-label traffic to Jetcost

The white labels are also where Jetcost buys its own traffic back: on a
white-label trailing tab, Jetcost itself bids against the external networks,
and when it wins, a search opens on the Jetcost site. The revenue is the
white label's and the cost is Jetcost's — an internal transfer. See
[core/commercials/mal/self-trailingtab.md](/core/commercials/mal/self-trailingtab.md) for the
mechanism, how Jetcost bids, and how the two sides balance.

The direction matters when reading the data: the resulting sessions land
on `websiteType = 'jetcost'`, **not** on the white label.
`sessionCampaignSource = 'mal'` is exactly zero on every white-label
domain — that traffic is an outflow from the white label and an inflow to
the core site, so it never appears in a white-label session count.

## Caveat: the long tail is not traffic

Filtering on qualified sessions leaves the handful of domains with real
traffic. Without that filter, roughly twenty further domains appear, each
with a **near-identical session count** — a spread far too uniform across
unrelated domains to be organic demand.

Whatever produces it (monitoring, synthetic checks) has not been
diagnosed. Until it has, treat an unqualified white-label domain list as
including an artefact, and don't build a "we have N active white labels"
statement on it.

The inventory above settles half of that question and leaves the other
half open. Those long-tail domains are **real and registered** — every
one of them is in the table, none is a junk value — so the artefact is
not in *which* domains appear. It is in the uniform count attached to
them, which still has no explanation. And it is the reason the question
"how many white labels do we have?" has two different right answers:
the table is how many exist, a traffic threshold is how many are alive,
and they are not close to each other.
