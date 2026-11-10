---
type: Feature Flag
description: "Displays partner feedback surveys after minimum clickouts are reached."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# PARTNER-FEEDBACK

Asks users, on the flight results page, to rate the partner they have
just clicked out to. Clickouts are counted per browser session; when the
count reaches `CLICKOUTS-MIN-NUMBER`, the result the user clicked shows a
rating prompt for that partner (inside the detail view when
[config/features/detail-card.md](/config/features/detail-card.md) is on,
on the result row otherwise), and the count starts again. Picking a
rating opens the rest of the survey in a modal. Clickouts on app-only
offers ([config/features/cug.md](/config/features/cug.md)) are not
counted. Flights only, on the Jetcost site and on white-label sites.

## Configs

### CLICKOUTS-MIN-NUMBER
Number, default `1`. Number of clickouts, counted per browser session,
after which the rating prompt shows; with `1` it follows every clickout.

### ENABLED
Boolean, default `0`. With `1`, clickouts are counted and the rating
prompt shows as described above. With `0`, nothing is counted or asked.

### SURVEY
Choice of a survey from the CMS, by its internal title; none by
default. The survey whose rating question and follow-up questions are
asked. With no survey selected, the prompt never shows.

### MANDATORY-REPLIES
Boolean, default `0`. With `1`, the survey cannot be sent until every
question it shows is answered, and the unanswered ones are flagged. With
`0`, the user can send it with questions left blank.
