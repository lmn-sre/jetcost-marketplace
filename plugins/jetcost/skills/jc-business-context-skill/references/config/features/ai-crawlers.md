---
type: Feature Flag
description: "Names the AI bots the site recognises, by purpose, and lets AI assistants launch flight and car searches and click-outs within a per-minute limit."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# AI-CRAWLERS

How the web site treats AI bots, on the Jetcost and white-label sites.
Bots get a not-found page when they try to launch a flight or car search
or to click out to a partner (CUG and MAL promobox click-outs included),
whatever this flag says. The flag names the AI bots the site recognises,
in three lists by purpose, and can let one kind through: AI assistants,
which browse in real time on a user's request, can be allowed to search
(`ENABLED-SEARCH`) and to click out (`ENABLED-CLICKOUT`), each within a
per-minute limit per bot. Search and training bots are only recognised
and classified, never let through.

An assistant listed in `ASSISTANT` is also handled like a visitor rather
than a bot: it gets a session, marked with the crawler type
`ai_assistant`, A/B test assignment and Argo tracking, and its flight
searches reach the search engine flagged as crawler searches. See
[core/business/funnel.md](/core/business/funnel.md) for how bot traffic
is kept out of the funnel.

## Configs

### ASSISTANT
Multiple choice, empty by default, among `Claude-User` (Anthropic),
`ChatGPT-User` (OpenAI), `Google-CloudVertexBot` (Google),
`MistralAI-User` (Mistral) and `Perplexity-User` (Perplexity), matched
in the user agent: bots that access the site in real time, at a user's
request. They are the only bots `ENABLED-SEARCH` and `ENABLED-CLICKOUT`
can let through and the only ones that get a session. While at least
one of those two is on, robots.txt gives them a section of their own,
allowing the flows that are on and disallowing the others. As with the
other two lists, a bot listed here is treated as a crawler even when the
site's generic bot detection would not recognise it.

### ENABLED
Boolean, default `0`. With `1`, the three lists and the two flows apply.
With `0`, every config falls back to its default: no AI bot is listed or
let through, robots.txt has no AI section, and an AI bot is handled like
any other bot if the generic detection recognises it, like a visitor
otherwise.

### ENABLED-CLICKOUT
Boolean, default `0`. With `1`, the assistants of `ASSISTANT` can click
out to partners, on flights, cars, CUG and MAL promoboxes, up to
`MAX-CLICKOUT-REQUESTS-PER-MINUTE`. With `0`, they get a not-found page
like any other bot. Their click-outs are recorded like users' ones; only
their session tells them apart.

### ENABLED-SEARCH
Boolean, default `0`. With `1`, the assistants of `ASSISTANT` can launch
flight and car searches, relaunched searches and searches to everywhere
or to a country included, up to `MAX-SEARCH-REQUESTS-PER-MINUTE`. With
`0`, they get a not-found page like any other bot.

### SEARCH
Multiple choice, empty by default, among `Claude-SearchBot`,
`OAI-SearchBot`, `Meta-WebIndexer`, `Amazonbot`, `Applebot`, `PetalBot`,
`DuckAssistBot` and `PerplexityBot`: bots that index content for AI
search engines. Listing one only classifies it: the site treats it as a
crawler and labels its traffic `ai_search`. It is never let through
searches or click-outs, and robots.txt does not name it.

### TRAINING
Multiple choice, empty by default, among `GPTBot`, `Meta-ExternalAgent`,
`Google-Extended`, `Applebot-Extended`, `Bytespider`, `CCBot`,
`Timpibot` and `ClaudeBot`: bots that collect web content to train LLM
models or datasets. Listing one only classifies it: the site treats it
as a crawler and labels its traffic `ai_training`. It is never let
through searches or click-outs, and robots.txt does not name it.

### MAX-CLICKOUT-REQUESTS-PER-MINUTE
Number, default `30`. The most click-outs an assistant can make in a
minute, counted per bot across all sites and markets together; beyond
it, the bot gets a "too many requests" error until that minute is over.
Read only when `ENABLED-CLICKOUT` is on.

### MAX-SEARCH-REQUESTS-PER-MINUTE
Number, default `30`. The most searches an assistant can launch in a
minute, counted per bot across all sites and markets together; beyond
it, the bot gets a "too many requests" error until that minute is over.
Read only when `ENABLED-SEARCH` is on.
