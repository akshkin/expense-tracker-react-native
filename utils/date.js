export function getFormattedDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function getTimestamp(date) {
  return new Date(date).getTime();
}
