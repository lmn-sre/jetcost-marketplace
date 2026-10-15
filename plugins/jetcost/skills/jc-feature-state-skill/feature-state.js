// Reads Jetcost's live feature-flag state and prints it in a form small
// enough to reason over. The full payload is ~300 KB and over a thousand
// rules: never load it whole into context, ask this script for the slice
// you need.
//
// The same rule-resolution logic also runs in the Jetcost Services desktop
// extension (jetcost-services-connector, server/services/feature-state.js),
// for Claude Desktop, whose skill sandbox can't reach this internal host.
// Both are packed self-contained: change how rules resolve in both.
//
// Scope, on purpose: values and rules as they are set right now, nothing
// else. Which features exist and what they mean comes from the business
// context (jc-business-context-skill), so there is no list or search here.
//
// Usage:
//   node feature-state.js feature <FEATURE-CODE> [--full]
//   node feature-state.js resolve <FEATURE-CODE|all> [--<dimension> <value> ...] [--full]
//   node feature-state.js abtests

const STATE_URL = 'https://catalog-features.int.upim.dev/v1/features/state';

// A scope list or a value longer than this is abbreviated unless --full.
const MAX_LIST_ITEMS = 8;
const MAX_VALUE_CHARS = 200;

async function fetchState() {
  const res = await fetch(STATE_URL);
  if (!res.ok) throw new Error(`GET ${STATE_URL} -> HTTP ${res.status}`);
  const body = await res.json();
  return body.payload.features;
}

// Evaluation order: highest priority first, ties broken by ascending order.
// The endpoint already returns rules in this order; sorting again keeps the
// resolver correct if that ever stops being true.
function sortedRules(rules) {
  return [...rules].sort((a, b) => b.priority - a.priority || a.order - b.order);
}

function parseVersion(v) {
  return String(v).split('.').map(n => parseInt(n, 10) || 0);
}

function compareVersions(a, b) {
  const pa = parseVersion(a), pb = parseVersion(b);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d;
  }
  return 0;
}

// Version scopes are comparator strings (`>=4.35.0`, `<4.17.0`).
function versionMatches(constraint, version) {
  const m = String(constraint).match(/^(>=|<=|>|<|=)?\s*(.+)$/);
  const op = m[1] || '=';
  const cmp = compareVersions(version, m[2]);
  return { '>=': cmp >= 0, '<=': cmp <= 0, '>': cmp > 0, '<': cmp < 0, '=': cmp === 0 }[op];
}

function dimensionMatches(dimension, allowed, value) {
  if (dimension === 'version') return allowed.some(c => versionMatches(c, value));
  return allowed.map(String).map(s => s.toLowerCase()).includes(String(value).toLowerCase());
}

// Returns 'match' (every scoped dimension is satisfied by the context),
// 'miss' (at least one given dimension excludes the context), or
// 'conditional' (nothing excludes it, but it scopes a dimension the context
// did not specify — it may or may not apply).
function evaluateScope(scope, context) {
  let conditional = [];
  for (const [dimension, allowed] of Object.entries(scope)) {
    if (!(dimension in context)) { conditional.push(dimension); continue; }
    if (!dimensionMatches(dimension, allowed, context[dimension])) return { result: 'miss' };
  }
  return conditional.length ? { result: 'conditional', unspecified: conditional } : { result: 'match' };
}

function resolveConfig(config, context) {
  const conditionals = [];
  for (const rule of sortedRules(config.rules)) {
    const { result, unspecified } = evaluateScope(rule.scope, context);
    if (result === 'match') return { value: rule.value, from: rule, conditionals };
    if (result === 'conditional') conditionals.push({ rule, unspecified });
  }
  return { value: config.default_value, from: null, conditionals };
}

function fmtList(items, full) {
  if (full || items.length <= MAX_LIST_ITEMS) return items.join(',');
  return `${items.slice(0, MAX_LIST_ITEMS).join(',')},…(+${items.length - MAX_LIST_ITEMS}, ${items.length} total)`;
}

function fmtScope(scope, full) {
  const parts = Object.entries(scope).map(([d, v]) => `${d}=${fmtList(v.map(String), full)}`);
  return parts.length ? parts.join(' ') : '(everyone)';
}

function fmtValue(value, full) {
  const s = JSON.stringify(value);
  if (full || s.length <= MAX_VALUE_CHARS) return s;
  return `${s.slice(0, MAX_VALUE_CHARS)}…(${s.length} chars, use --full)`;
}

function fmtRule(rule, full) {
  return `p${rule.priority}/o${rule.order} ${fmtScope(rule.scope, full)} → ${fmtValue(rule.value, full)}`;
}

// An A/B entry carries two ids: `variation_id`, the variation of the test
// *model* (stable across runs, = `model_id` in abtest-logs' `variations[]`),
// and `test_variation_ids`, the variation of the run(s) live right now (=
// `abTestVariationId` on the datamarts, = `id` in abtest-logs). Every
// re-activation of a test mints new run ids, so only the second one joins to
// exposure data. Empty means no run is live: the override reaches no one.
function fmtVariation(a) {
  const runs = a.test_variation_ids ?? [];
  return runs.length ? `${a.variation_id} (live run: ${runs.join('/')})` : `${a.variation_id} (no live run)`;
}

function featureFlags(f) {
  const flags = [];
  if (f.always_enabled) flags.push('always_enabled');
  if (f.wlbl) flags.push('wlbl');
  if (f.abtests?.length) flags.push(`abtests:${f.abtests.map(a => a.variation_id).join('/')}`);
  return flags;
}

function warnings(f) {
  const out = [];
  if (f.wlbl) out.push('⚠️ wlbl: additional route whitelist/blacklist rules, NOT in this payload, can change this feature\'s values per searched route');
  if (f.always_enabled) out.push('ℹ️ always_enabled: active by default, no ENABLED config needed');
  return out;
}

function findFeature(features, code) {
  const f = features.find(x => x.code.toLowerCase() === String(code).toLowerCase());
  if (!f) throw new Error(`feature ${code} not in the live state — find the feature code in the business context (config/features/index.md)`);
  return f;
}



function cmdFeature(features, code, full) {
  const f = findFeature(features, code);
  console.log(`# ${f.code}  [${featureFlags(f).join(' ') || 'no flags'}]`);
  console.log(`dimensions: ${f.dimensions.join(', ')}`);
  for (const w of warnings(f)) console.log(w);
  for (const c of f.configs) {
    console.log(`\n## ${c.code} (${c.type}) default=${fmtValue(c.default_value, full)}`);
    if (!c.rules.length) console.log('  no rules: default applies everywhere');
    for (const r of sortedRules(c.rules)) console.log(`  ${fmtRule(r, full)}`);
  }
  for (const a of f.abtests || []) {
    console.log(`\n## A/B test variation ${fmtVariation(a)} (overrides for users in this variation)`);
    for (const c of a.configs) {
      for (const r of sortedRules(c.rules)) console.log(`  ${c.code}: ${fmtRule(r, full)}`);
    }
  }
}

function cmdAbtests(features) {
  console.log('variation_id | test_variation_ids | feature | overridden configs  (test_variation_ids = abTestVariationId on the datamarts; variation_id = model_id in abtest-logs)');
  for (const f of features) {
    for (const a of f.abtests || []) {
      console.log(`${a.variation_id} | ${(a.test_variation_ids ?? []).join('/') || '-'} | ${f.code} | ${a.configs.map(c => c.code).join(', ')}`);
    }
  }
}

function cmdResolve(features, code, context, full) {
  const targets = code === 'all' ? features : [findFeature(features, code)];
  console.log(`context: ${JSON.stringify(context)}`);
  for (const f of targets) {
    // A dimension the feature doesn't declare can't be scoped on: drop it so
    // it doesn't turn into a spurious miss.
    const ctx = Object.fromEntries(Object.entries(context).filter(([d]) => f.dimensions.includes(d)));
    console.log(`\n# ${f.code}`);
    for (const w of warnings(f)) console.log(w);
    for (const c of f.configs) {
      const { value, from, conditionals } = resolveConfig(c, ctx);
      console.log(`  ${c.code} = ${fmtValue(value, full)}  (${from ? `rule p${from.priority}/o${from.order}` : 'default'})`);
      for (const { rule, unspecified } of conditionals) {
        console.log(`    ↳ unless ${unspecified.join('+')} matches: ${fmtRule(rule, full)}`);
      }
      for (const a of f.abtests || []) {
        const ac = a.configs.find(x => x.code === c.code);
        if (!ac) continue;
        const r = resolveConfig(ac, ctx);
        if (r.from || r.conditionals.length) {
          const rule = r.from || r.conditionals[0].rule;
          console.log(`    ↳ A/B variation ${fmtVariation(a)}: ${fmtRule(rule, full)}`);
        }
      }
    }
  }
}

function parseContext(argv) {
  const context = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--') && argv[i] !== '--full' && argv[i + 1] !== undefined) {
      context[argv[i].slice(2)] = argv[++i];
    }
  }
  return context;
}

async function main() {
  const [cmd, arg, ...rest] = process.argv.slice(2);
  const full = process.argv.includes('--full');
  const features = await fetchState();

  if (cmd === 'feature' && arg) return cmdFeature(features, arg, full);
  if (cmd === 'resolve' && arg) return cmdResolve(features, arg, parseContext(rest), full);
  if (cmd === 'abtests') return cmdAbtests(features);

  console.log('usage: node feature-state.js feature <CODE> [--full] | resolve <CODE|all> [--<dimension> <value> ...] [--full] | abtests');
  process.exit(1);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
