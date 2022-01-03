export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(date);
}

export function getAverage(stars_count) {
  let numerator = 0;
  let denominator = 0;
  Object.keys(stars_count).forEach(star => {
    numerator += Number.parseInt(star) * stars_count[star];
    denominator += stars_count[star];
  });
  return denominator === 0 ? 0 : numerator / denominator;
}

export const removeExtraSpaces = str =>
  str
    .split(' ')
    .filter(s => s)
    .join(' ');

export const isEmpty = str => removeExtraSpaces(str) === '';
