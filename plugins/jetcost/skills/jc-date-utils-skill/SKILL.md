---
name: jc-date-utils-skill
description: Utility functions for date calculations and manipulations. ALWAYS use these functions when calculating time periods for reports, ClickHouse queries, or WoW/MoM comparisons.
---

## Overview

This skill provides JavaScript functions to correctly calculate dates and time periods.

**IMPORTANT:** NEVER calculate dates manually. Always run this script to get the correct periods.

## Conventions

- All dates are in `YYYY-MM-DD` format
- Week starts on **Sunday**
- Week number (`YYYY-WW`) uses **Wednesday** as the middle day to determine the year
- Dates are calendar days: results are the same whatever the timezone of the machine running the script. Only `getToday()` (and so `getYesterday()`) depends on it, returning the local calendar date

## How to use

Before generating any report or query with time filters:

1. Locate `date-utils.js` inside `/jc-date-utils-skill` and copy it to a temporary file
2. Append the necessary calls with `console.log()`
3. Run with `node`
4. Use the results in your queries

### Example

```bash
cp date-utils.js /home/claude/calc-dates.js   # from /jc-date-utils-skill
echo "console.log('WTD:', getWTDRange(getYesterday()));" >> /home/claude/calc-dates.js
echo "console.log('Previous WTD:', getPreviousWTDRange(getYesterday()));" >> /home/claude/calc-dates.js
node /home/claude/calc-dates.js
```

## Available functions

| Function | Description | Output |
|----------|-------------|--------|
| `getToday()` | Today's date | `"YYYY-MM-DD"` |
| `getYesterday()` | Yesterday's date | `"YYYY-MM-DD"` |
| `getWeekDay(date)` | Day of the week | `0-6` (0 = Sunday) |
| `getStartOfTheWeek(date)` | Sunday of the week | `"YYYY-MM-DD"` |
| `getWeekNumber(date)` | Week number | `"YYYY-WW"` |
| `getStartOfMonth(date)` | First day of the month | `"YYYY-MM-DD"` |
| `addDays(date, days)` | Add days | `"YYYY-MM-DD"` |
| `subtractDays(date, days)` | Subtract days | `"YYYY-MM-DD"` |
| `getWTDRange(date)` | Week-to-date range | `{ start, end }` |
| `getPreviousWTDRange(date)` | Previous week WTD (same number of days) | `{ start, end }` |
| `getMTDRange(date)` | Month-to-date range | `{ start, end }` |
| `getPreviousMTDRange(date)` | Previous month MTD (same number of days) | `{ start, end }` |

## Typical use cases

### Daily Report (yesterday's data)

```javascript
const yesterday = getYesterday();
const wtd = getWTDRange(yesterday);
const previousWtd = getPreviousWTDRange(yesterday);
```

### Weekly Report (full week)

```javascript
const lastSunday = subtractDays(getStartOfTheWeek(getToday()), 7);
const lastSaturday = addDays(lastSunday, 6);
// lastSunday -> lastSaturday = previous full week
```

### MoM comparison

```javascript
const mtd = getMTDRange(getYesterday());
const previousMtd = getPreviousMTDRange(getYesterday());
```