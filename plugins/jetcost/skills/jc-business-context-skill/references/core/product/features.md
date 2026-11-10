---
type: Product Concept
description: "Explains what a 'feature' (operational config lever) is and how its configuration structure works."
tags: [product]
timestamp: 2026-07-22T00:00:00Z
---

# Feature Flags

## What Features Are

Features are operational levers that product, marketing, and other teams can modify to control the behaviour of the Jetcost products. They are not just engineering toggles: a feature can represent a UI component, a business rule, a monetisation mechanism, an A/B test, or a traffic strategy.

Features can be activated or deactivated, and their configuration can vary by scope: country, device, language, website, booking window. A change to a feature in one scope does not imply a change in another.

## Structure of a Feature

Each feature is a named entity (e.g. `mal`, `cug`, `web-to-app`) that groups a set of configurations sharing a common purpose or UI surface. A feature is not a single on/off switch — it is a collection of keys, each controlling a specific aspect of behaviour.

A configuration entry has:
- A **feature code** — the name of the feature (e.g. `mal`)
- A **config code** — the specific parameter within that feature (e.g. `enabled`, `threshold`, `variant`)
- A **scope** — the combination of dimensions it applies to (country, device, language, website, booking window). Wildcards mean "applies to all values of that dimension".
- A **value** — what the parameter is set to

## Reading a Changelog

When a feature changes, the changelog shows what config keys moved from one value to another, within which scope, and on which date. A single feature can have many simultaneous changes across different scopes.

If a feature shows many changes at once, it typically means a broad rollout, a scope expansion, or a reconfiguration across multiple markets or devices — not necessarily a large product change.

## Feature Documentation

Each feature has a dedicated file in [config/features/](/config/features/index.md) named after its feature code (e.g. [config/features/mal.md](/config/features/mal.md)). That file explains what the feature does, what levers are available, and what impact changes may have. When interpreting a changelog, always cross-reference the relevant feature file.
