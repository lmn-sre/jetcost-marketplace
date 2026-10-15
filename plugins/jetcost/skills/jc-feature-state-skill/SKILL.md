---
name: jc-feature-state-skill
description: "Describes the current, live state of Jetcost's feature flags — which features and configs are set to which value, for which website/country/language/device/app version, and which A/B test variations override them — by downloading the feature-state snapshot served to the site (catalog-features /v1/features/state) and resolving its prioritised rules. Crosses each feature with its meaning (jc-business-context-skill, config/features/ docs) and with its change history (jc-operation-logs-skill, feature-logs / abtest-logs). MUST be used whenever a user asks what a feature flag or config is set to right now, where a feature is on or off, what a given market/device/site currently sees, or wants the state of the art of one or all features."
---

## Overview

The feature state is the **snapshot of how every feature flag is configured
right now on the live site**: one JSON document, served at
`https://catalog-features.int.upim.dev/v1/features/state`, listing every
feature, its configs, each config's default and the prioritised rules that
override the default for a given scope, plus the A/B test variations that
override those rules for the users bucketed into them.

It is the *snapshot* component of Jetcost's operational-state pillar: the
operation logs tell you what changed and when; this tells you where things
stand today. It answers "what is it set to", never "why" (that's the
business context) nor "since when" (that's the operation logs).

**Dependencies:**
- Network access to `catalog-features.int.upim.dev` (internal, no auth,
  reachable only from the company network/VPN — **not** from Claude's cloud
  sandbox, whatever the domain whitelist says). So, in order of preference:
  - the **Jetcost Services** desktop extension's `features_*` tools, when
    they are available (Claude Desktop on the network/VPN): same commands
    as the script, run on the user's machine;
  - otherwise `feature-state.js`, which only works where the shell itself is
    on the network (Claude Code on the user's machine);
  - if neither can reach the endpoint, say so plainly — never answer from
    the `config/features/` docs or from memory instead.
- `node` (18+, for the built-in `fetch`) to run `feature-state.js`
- `jc-business-context-skill` — what each feature and config *means*
- `jc-operation-logs-skill` — how the state got here
- `jc-context-feedback-skill` — to report a gap found while crossing them

**Companion files:**

| File | Purpose |
|---|---|
| `feature-state.js` | Downloads the live state and prints the slice you ask for: one feature's rules, the resolved value for a scope, or the A/B overrides |

---

## 1. Critical Rules

⚠️ **Context for what exists and what it means; this skill only for what
   it is set to.** Find the feature from the business context
   (`jc-business-context-skill`: the feature index in
   `config/features/index.md` and each feature's doc), which says what a
   feature and its configs do. Come here with a feature code, only to read
   its current values and rules. There is deliberately no list or search
   over the live state: don't use it to discover features. A feature that
   is live but missing from the context can still be read here by its code
   — and is a context gap to report (§4).
⚠️ **Never load the whole payload into context.** It is ~300 KB and over a
   thousand rules. Always go through `feature-state.js` and ask for one
   feature, or for a resolved scope.
⚠️ **Always download fresh.** The endpoint *is* the live state; the script
   fetches it on every call. Never answer "what is it set to" from memory,
   from an earlier conversation, or from the `config/features/` docs — those
   describe what a flag *can* do, never what it is set to.
⚠️ **A rule list is ordered, and the first matching rule wins.** Rules are
   evaluated by `priority` descending, ties broken by `order` ascending; the
   first rule whose scope matches the visitor sets the value, and if none
   matches, `default_value` applies. Never read a lower rule as applying
   when a higher one already matches the same scope. Let the script resolve
   it (§3.2) rather than doing it by eye.
⚠️ **`wlbl: true` means the payload is incomplete for that feature.**
   Additional route whitelist/blacklist rules, not served in this JSON, can
   change its values depending on the searched route. Whenever you report
   the state of such a feature, say so explicitly — e.g. "watch out: values
   can vary by route through WL/BL rules not visible here".
⚠️ **A/B variations override the base rules for their users only.** An
   `abtests[]` entry's configs apply to visitors bucketed into that
   `variation_id`; everyone else gets the base rules. Report both, never
   one in place of the other.
⚠️ **Never report a market as "on" without a scope.** Most values depend
   on several dimensions at once (website × country × device…). State the
   scope the answer is for, and say which dimensions you left unspecified.

---

## 2. Payload shape

`payload.features[]`, one object per feature:

| Field | Meaning |
|---|---|
| `code` | Feature code, e.g. `WEB-TO-APP`. Lowercased, it is the filename of the feature's doc under `config/features/` and the `entity` of its `feature-logs` operation-log rows |
| `always_enabled` | The feature is active by default and is not expected to need an `ENABLED` config to switch it on. Some such features still carry one: report it as it is |
| `wlbl` | Route whitelist/blacklist rules exist outside this payload — see §1 |
| `served` | Always `true`; ignore it |
| `dimensions` | The dimensions this feature's rules may scope on. Common ones: `website`, `country`, `language`, `device`, `version`, `booking`; some features add `ctre`, `persona`, `platform`, `route_category`, `campaign_type`, `country_user`, `search_profile` |
| `configs[]` | `{code, type, default_value, rules[]}` — `type` is the config's data type (`boolean`, `number`, `string`, `string-list`, `select`, structured types such as `payment-rules` or `promobox-placement-rules`, …) |
| `abtests[]` | `{variation_id, test_variation_ids[], configs[]}` — per-variation overrides, same `rules[]` shape. Two ids, see below |

**Two A/B ids, not interchangeable.** `variation_id` is the variation of the
test *model*: stable for as long as the test exists, across every run of it.
`test_variation_ids` lists the variation of the *run(s)* live right now:
every (re)activation of a test mints a new run, with a new `abTestId` and new
variation ids on the datamarts (verified 2026-10-14: the W2A test's
INTENTIONAL variation is model 2238 throughout, run 3270 from 2026-10-08 and
run 3276 from 2026-10-13). An empty `test_variation_ids` means no run is
live — the override exists in the state but reaches no one.

A rule is `{priority, order, scope, value}`:

- `scope` maps dimension → list of allowed values. A visitor matches when,
  for **every** dimension in the scope, their value is in the list. A
  dimension absent from the scope matches everyone; an empty scope (`{}`)
  matches everyone.
- `website` values are site slugs (`jetcost`, `jetcost-mobile-app`, white
  labels such as `volagratis` — see the white-label inventory in
  `jc-business-context-skill`); `country` and `country_user` are ISO 3166-1
  alpha-2 (`GB`, not `UK`); `device` is `phone` / `tablet` / `desktop`.
- `version` values are comparators on the app version (`>=4.35.0`,
  `<4.17.0`).

---

## 3. Using `feature-state.js` (or the `features_*` tools)

The desktop extension's tools map one-to-one onto the script's commands and
print the same output:

| Tool | Script | Answers |
|---|---|---|
| `features_get {code, full?}` | `feature <CODE> [--full]` | one feature's configs, defaults, rules in evaluation order, A/B overrides |
| `features_resolve {code, context, full?}` | `resolve <CODE\|all> [--<dim> <value> ...] [--full]` | the effective value of each config for a scope (`context` is a dimension → value object) |
| `features_abtests` | `abtests` | every A/B variation override, with its `variation_id` (model) and `test_variation_ids` (live run, the one that joins with `abTestVariationId` on the datamarts) |

Locate `feature-state.js` inside this skill's folder and run it with `node`
from there (copy it to a working directory first if the skill folder is
read-only). Every call downloads the state again.

### 3.1 One feature's rules

```bash
node feature-state.js feature WEB-TO-APP   # every config, default, rules in evaluation order, A/B overrides
node feature-state.js abtests              # every A/B variation override across features
```

`feature` abbreviates long scope lists and long values; add `--full` to see
them whole. Rules print as `p<priority>/o<order> <scope> → <value>`, in
evaluation order.

### 3.2 Resolving a scope

```bash
node feature-state.js resolve AFS --website jetcost --country IT --device phone
node feature-state.js resolve all --website jetcost --country GB --device desktop
node feature-state.js resolve MOBILE-APP-ADS --website jetcost-mobile-app --platform ios --version 4.40.0
```

Any `--<dimension> <value>` is accepted; dimensions a feature doesn't
declare are ignored for that feature. For each config the output gives the
value that applies and where it comes from (`rule pX/oY` or `default`),
followed by:

- `↳ unless <dims> matches: …` — a higher rule that scopes on a dimension
  you did **not** specify, so it may or may not apply. Either add that
  dimension and resolve again, or report the answer as conditional on it.
- `↳ A/B variation N (live run: M): …` — what users in that variation get
  instead; `N` is `variation_id`, `M` the live run's id (`no live run` when
  `test_variation_ids` is empty).

`wlbl` / `always_enabled` notes are printed at the top of each feature.

---

## 4. Crossing the state with the other pillars

A state question is rarely answered by the values alone. Combine:

1. **Meaning** — read the feature's doc from `jc-business-context-skill`
   (`config/features/<code lowercased>.md`, plus the `core/` concept it
   links up to): what each config controls and what moving it changes.
   Present values in those terms ("the intercard shows at position 10 on
   mobile"), not as raw codes alone.
2. **History** — query `jc-operation-logs-skill` for how the state got
   here:
   - `source = 'feature-logs'`, `entity = '<FEATURE-CODE>'`: every recorded
     change to the feature. These rows carry only the author's free-text
     note, no field-level diff and no market scope (`country` is always
     `ALL`; see that skill) — use them for *when* and *roughly what*, and
     use this skill's current state for the *exact* result. Coverage starts
     on that source's documented start date; an older change simply isn't
     there.
   - `source = 'abtest-logs'`: A/B test status and rule changes, keyed on
     the test model code (`entity`). **A feature with `abtests[]` very
     likely has related abtest-logs rows** — the test that introduced the
     variation, its activation, its perimeter changes — and so may a feature
     whose base rules were reshaped when a test ended. Always look for them
     when describing an A/B override, and when explaining why a feature is
     set the way it is.
     **The join is exact on the variation ids** carried in `metadata`'s
     `variations[]` (`{id, model_id, name}`): `model_id` is the state's
     `variation_id`, `id` is the run's variation id, i.e. one of
     `test_variation_ids` while that run is live. Join on `model_id` for
     the test's whole history, on `id` for one run. Records before
     2026-07-02 carry no `variations` (the admin3 API doesn't serve them
     any more); for those, fall back to matching by name — the test model
     code usually echoes the feature or config it overrides — and say the
     link is inferred. The `id` at the top level of `metadata` is the log
     record's own id, not a test or variation id.
3. **Exposure** — `test_variation_ids` **is** `abTestVariationId` on the
   datamarts (see `jc-clickhouse-semantic-layer-skill`); `variation_id` is
   **not**, it never appears there. Filter on the live run's id to see its
   test run (`abTestId`, `abTestName`, `abTestVariationName`) and how many
   sessions it is exposing. For earlier runs of the same test, take their
   ids from abtest-logs' `variations[].id` (rows whose `model_id` is the
   state's `variation_id`). A variation with an empty `test_variation_ids`,
   or with no recent sessions, is an override that exists in the state but
   is not reaching anyone right now — say so rather than describing it as
   a running test. Read
   `core/product/abtests.md` (business context) for how exposed sessions
   are segmented.
4. **Gaps** — when crossing turns up a mismatch, report it through
   `jc-context-feedback-skill` instead of papering over it. Typical cases:
   a feature in the state with no doc file, a config with no `###` section
   in its doc, a doc still made of `TODO` stubs, a doc describing a feature
   or config the state no longer serves. A missing or stale doc is pillar
   `business_context`; something wrong or surprising in the state payload
   itself is pillar `operational_state`.

### Answer shape for "state of the art of feature X"

1. One line on what the feature does (business context).
2. The flags that change how to read it (`wlbl`, `always_enabled`, A/B).
3. Per config: default, then the rules that override it, in evaluation
   order, described as scopes ("on for phone and tablet everywhere, except
   rumbo/volagratis/… where it's forced off").
4. Active A/B variations and what they change.
5. Recent changes from the operation logs, if any, with dates.
6. Any context gap found, flagged.
