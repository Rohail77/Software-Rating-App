export const formatDate = date => new Intl.DateTimeFormat('en-US').format(date);

export const getAverage = stars_count => {
  let numerator = 0;
  let denominator = 0;
  Object.keys(stars_count).forEach(star => {
    numerator += Number.parseInt(star) * stars_count[star];
    denominator += stars_count[star];
  });
  return denominator === 0 ? 0 : numerator / denominator;
};

export const removeExtraSpaces = str =>
  str
    .split(' ')
    .filter(s => s)
    .join(' ');

export const isEmpty = str => removeExtraSpaces(str) === '';

// See if one string (parent) includes another string (child)
export const stringIncludes = (parentString, childString) =>
  removeExtraSpaces(parentString)
    .toLowerCase()
    .includes(removeExtraSpaces(childString).toLowerCase());

const ALERT_MESSAGE = 'An error ocurred while interacting with the database.';
export const alertError = (msg = null) =>
  msg ? alert(msg) : alert(ALERT_MESSAGE);
