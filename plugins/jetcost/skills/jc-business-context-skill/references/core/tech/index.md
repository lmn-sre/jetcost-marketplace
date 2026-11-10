# Tech Overview

## Role in the Business

Tech owns the systems everything else runs on — code, infrastructure, and
security configuration. Unlike the other core functions, tech's decisions
aren't usually a lever pulled to move a KPI on purpose; they matter here
because they're a common explanation for an *unintended* change elsewhere
(a deploy that breaks tracking, a firewall rule that blocks legitimate
traffic). Operation logs from this function are most useful for root-cause
investigations — see [levers.md](/core/tech/levers.md).

## Team & Ownership

- **Releases** — code shipped to production, tracked via GitLab tags. See
  [levers.md](/core/tech/levers.md).
- **Infrastructure/security configuration** — Cloudflare WAF rules are
  tracked (`waf-rule-change`); other infrastructure changes are not yet. See
  [levers.md](/core/tech/levers.md).
