---
name: jc-context-feedback-skill
description: Detects and reports gaps, ambiguities, or errors found in Jetcost's three context pillars (business context MD files, operational state, factual data) while working in function-scoped projects. Posts structured feedback to Slack for triage. Use whenever a project instruction references this skill for context-quality feedback.
---

# Context Feedback Loop

## When to trigger

Use this skill ONLY when you encounter a genuine gap in the context itself —
not user error, not a one-off ambiguous phrasing you can resolve by asking,
and not a stylistic preference.

This skill reports imprecisions in the *context* — what the docs, the
semantic layer, and the operation-log documentation say. It is not a
data-quality monitor: it does not report anomalies in the data.

**Start from the context, not from the data.** Every report must point at a
specific piece of context — a domain/skill file, a semantic-layer field or
computed expression, an operation-log source description — and say what it
states and why that statement is imprecise. If you cannot name the piece of
context that should change, there is nothing to report.

Trigger criteria (at least one must apply):

- A business context MD file is missing information needed to answer a
  reasonable question (e.g., no definition for a metric/term referenced elsewhere)
- Operational state (operation logs, state-of-the-art snapshots) contains
  entries that are inconsistent, contradictory, or lack fields needed to
  interpret them
- Factual data (the ClickHouse semantic layer) is missing a
  metric/segment/computed field that a user's query legitimately requires
- Business context, operational state, or factual data contradict each other
  — meaning one of them explicitly *states* something the others disprove,
  not that the data looks surprising
- You have relevant, settled knowledge (from prior context or experience with
  this domain) that would answer a reasonable question, but the business
  context MD files don't document it — e.g. a metric definition, a decision
  rationale, or a known edge case that exists "in the air" but not in writing

Do NOT trigger for:

- Typos or minor phrasing issues you can work around
- User's own request being unclear (ask the user instead)
- One-off edge cases unlikely to recur
- Speculative, exploratory, or unconfirmed information — only settled/
  consolidated knowledge counts as a documentation gap
- Patterns in the data on their own — zeros, drops, outliers, a segment that
  looks like it has a missing feed. A surprising number is not a context
  error: it often has a business reason you don't know. It only becomes
  reportable when it disproves something the context explicitly claims, and
  then the report is about that claim, not about the number
- A business explanation you inferred from the data. Don't guess why a
  pattern exists and propose it as the fix; if the reason matters to the
  task, ask the user
- Content that would expose personal or non-business-relevant details in a
  shared channel — strip anything not strictly about the domain gap

## Output format

Build the report from these fields:

```json
{
  "pillar": "business_context | operational_state | factual_data",
  "gap_type": "missing | incorrect | ambiguous | undocumented_knowledge",
  "context_ref": "The file, field or expression the gap is in, e.g. a domain file path or a semantic-layer field name",
  "description": "What the context states and why it is missing/wrong, in 1-2 sentences",
  "suggested_fix": "Concrete suggestion, or null if none",
  "project": "<project name if available>"
}
```

`suggested_fix` changes the context, and the context documents invariants —
definitions, rules, rationales — not measurements. Never propose writing
numbers observed in the data (counts, rates, "X has 0 conversions in Y")
into it; those live in ClickHouse.

## Posting the report

Post it with the `feedback_report` tool of the **Jetcost Services** desktop
extension, passing the fields above as its arguments. The tool adds the
timestamp, formats the message and posts it to the team's triage channel;
it answers whether the report was posted.
Do not post it any other way: not through the Slack MCP connector, not with a
request to a webhook.

When the report cannot be posted — the tool is not available (the extension
is not installed, or you are not in Claude Desktop), or it answers that the
webhook is not configured — do not drop the report. Show it to the user,
field by field, say it was not posted, and ask them to forward it to the DAE
team.
