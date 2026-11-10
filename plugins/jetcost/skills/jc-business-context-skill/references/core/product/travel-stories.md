---
type: Product Feature
description: "The app's story-format discovery surface: what a Travel Story is, the profile/story/translation structure, the editorial vs Deal Scout split, and how its impression and CTA-click numbers should be read."
tags: [product, marketing]
timestamp: 2026-09-15T00:00:00Z
---

# Travel Stories

## Overview

Travel Stories are the app's inspirational discovery surface: themed
collections of full-screen vertical screens, tapped through like the
story format users already know from social apps, entered from a
carousel of circular icons on the app home screen.

They exist to turn a user with no route in mind into a user who has
just run a search. That is the whole point of the surface, and it is
why a story's call to action does not link to the search form: it
carries a complete search — origin, destination, dates, passengers and
a reference price — which the app can execute on the tap. The story is
the cheapest way Jetcost has of supplying the intent the funnel needs
before it can start, and everything downstream of that tap is an
ordinary app search with ordinary app economics.

This is an app-only surface. The web has no equivalent.

## What a Travel Story is made of

Three levels, and confusing them is the most common way to misread the
numbers:

- **Profile** — the themed collection, and the only level the user
  picks: "Zodiac sign destinations", "Halloween destinations", "Summer
  deals automatic". It is what the icon in the home carousel stands
  for. A profile carries its own position in the carousel and its own
  validity window, so it appears and disappears on a calendar without
  anyone deploying anything.
- **Story** — one screen inside a profile, carrying the template, the
  background image and its position in the sequence.
- **Translation** — the content of one screen for one country and
  language, with its own publication state and validity. Markets are
  therefore independent: the same story can be live in France, not yet
  published in Spain, and expired in Italy.

## Editorial and Deal Scout are two products under one name

The template of a screen decides whether it can be clicked at all, and
that split runs deeper than presentation:

- **Text** — editorial content only, no call to action. It is the
  brand-and-curiosity half of the surface: reasons to reopen the app,
  not offers.
- **CTA** — up to three hand-picked deals, each one a fully specified
  search with its price, curated by CRM in the internal deal tool.
- **Deal Scout Auto** — the same shape, but the deals are selected at
  render time from a preset rather than chosen by hand. An automatic
  profile can be set to hide itself entirely when the selection comes
  back empty, so a market without deals sees no icon rather than an
  empty story.

Consequence for analysis: **an editorial profile records exactly zero
CTA clicks by construction, not by failure.** Ranking profiles on
click-through rate across templates compares a surface that can be
clicked with one that cannot. Compare deal profiles with deal
profiles.

## Reading the numbers

The surface is measured with two events — a story screen seen and a
call to action clicked — carrying the profile, the screen and its
position in the sequence.

An impression is one screen, not one profile opened: a user tapping
through a profile produces as many impressions as it has screens. So
impression volume reflects profile length as much as profile
popularity, and a long editorial profile outweighs a short deal
profile on raw impressions without being more popular. Aggregate click
rate over the whole surface follows the editorial/deal mix of the
period, not performance.

There is no travel-story revenue, and there should not be one: the
search a call to action starts is indistinguishable downstream from
any other app search. The surface is read on its own two events, and
its contribution to revenue is indirect, through the searches it
creates — which is also why the surface cannot be defended on revenue
attribution alone.

## Who produces them

The surface is product's; the content is CRM's. Travel Stories are
created weekly against a content calendar defined every six months,
with a fixed weekly routine and a Slack alert channel for markets left
without available deals — see
[core/marketing/crm.md](/core/marketing/crm.md), which also covers the
app push campaigns that exist to drive users into the stories, from
the welcome push for new app users to the weekly ones.

## Configuration

Two flags, on purpose. The surface itself is switched by
[config/features/travel-stories.md](/config/features/travel-stories.md);
whether the carousel appears on the app home screen at all, and in
which order relative to the other home elements, is decided by
[config/features/home-screen-elements.md](/config/features/home-screen-elements.md).
A market can have the feature enabled and still show no stories,
because the home screen does not place them.
