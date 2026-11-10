// Utility functions for date calculations and manipulations
// All dates in YYYY-MM-DD format
// Week starts on Sunday
//
// Dates are calendar days, not instants: every calculation is done in UTC
// (parse with a trailing 'Z', getUTC*/setUTC*, format with toISOString), so
// the result does not depend on the timezone of the machine running it.
// Mixing local parsing with UTC formatting shifts every result back one day
// on any machine east of UTC (e.g. Europe/Rome).
// getToday() is the only function that reads the local timezone.

const DAY_MS = 24 * 60 * 60 * 1000;

function parseDate(date) {
  // date = "YYYY-MM-DD" -> Date at 00:00 UTC of that day
  return new Date(date + 'T00:00:00Z');
}

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

function getToday() {
  // Today's calendar date where the script runs
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getYesterday() {
  return subtractDays(getToday(), 1);
}

function getWeekDay(date) {
  // date = "YYYY-MM-DD"
  // Returns 0-6 where 0 = Sunday
  return parseDate(date).getUTCDay();
}

function getStartOfTheWeek(date) {
  // Week starts on Sunday
  return subtractDays(date, getWeekDay(date));
}

function getWeekNumber(date) {
  // Returns "YYYY-WW"
  // Year is determined by Wednesday (middle day of the week starting on Sunday)

  const sunday = parseDate(getStartOfTheWeek(date));

  // Find Wednesday of this week (Sunday + 3)
  const wednesday = new Date(sunday);
  wednesday.setUTCDate(sunday.getUTCDate() + 3);

  const year = wednesday.getUTCFullYear();

  // Find first Wednesday of the year
  const jan1Day = new Date(Date.UTC(year, 0, 1)).getUTCDay();
  const daysToWed = (3 - jan1Day + 7) % 7;

  // Sunday of week 1 is 3 days before first Wednesday
  const week1Sunday = new Date(Date.UTC(year, 0, 1 + daysToWed - 3));

  // Calculate week number (UTC has no DST, so the difference is an exact multiple of 7 days)
  const weekNum = 1 + Math.round((sunday - week1Sunday) / (7 * DAY_MS));

  return `${year}-${String(weekNum).padStart(2, '0')}`;
}

function subtractDays(date, days) {
  return addDays(date, -days);
}

function addDays(date, days) {
  const d = parseDate(date);
  d.setUTCDate(d.getUTCDate() + days);
  return formatDate(d);
}

function getStartOfMonth(date) {
  return date.slice(0, 7) + '-01';
}

function getWTDRange(date) {
  // Returns { start, end } from first day of the week (Sunday) to date
  const start = getStartOfTheWeek(date);
  return { start, end: date };
}

function getPreviousWTDRange(date) {
  // Returns the WTD of the previous week with the same number of days
  const currentWTD = getWTDRange(date);
  const daysInCurrentWTD = Math.round(
    (parseDate(currentWTD.end) - parseDate(currentWTD.start)) / DAY_MS
  ) + 1;

  const previousStart = subtractDays(currentWTD.start, 7);
  const previousEnd = subtractDays(currentWTD.start, 7 - daysInCurrentWTD + 1);

  return { start: previousStart, end: previousEnd };
}

function getMTDRange(date) {
  // Returns { start, end } from first day of the month to date
  const start = getStartOfMonth(date);
  return { start, end: date };
}

function getPreviousMTDRange(date) {
  // Returns the MTD of the previous month with the same number of days
  const d = parseDate(date);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const dayOfMonth = d.getUTCDate();

  // First day of previous month
  const prevMonthStart = formatDate(new Date(Date.UTC(year, month - 1, 1)));

  // Same day of previous month (or last day if month is shorter)
  const lastDayOfPrevMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const prevMonthDay = Math.min(dayOfMonth, lastDayOfPrevMonth);
  const prevMonthEnd = formatDate(new Date(Date.UTC(year, month - 1, prevMonthDay)));

  return { start: prevMonthStart, end: prevMonthEnd };
}

// Export for use with require() if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getToday,
    getYesterday,
    getWeekDay,
    getStartOfTheWeek,
    getWeekNumber,
    subtractDays,
    addDays,
    getStartOfMonth,
    getWTDRange,
    getPreviousWTDRange,
    getMTDRange,
    getPreviousMTDRange
  };
}
