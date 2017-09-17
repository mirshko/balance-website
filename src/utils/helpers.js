/**
 * @desc return ellipsed text
 * @param  {String} [text='']
 * @param  {Number} [maxLength=false]
 * @return {String}
 */
export const ellipseText = (text = '', maxLength = false) =>
  maxLength && text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

/**
 * @desc   Returns String for date in
 * @param  {string} date
 * @param  {boolean} short
 * @param  {number} current
 * @return {string}
 */

export const getTimeagoString = (date, short, current) => {
  const monthsLong = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const limits = [60000, 3600000, 86400000, 604800000, 1209600000];
  if (!date) return null;
  let _current = current || Date.now();
  if (isNaN(_current)) {
    const _currentObj = new Date(_current);
    _current = _currentObj.getTime();
  }
  const _date = Number(date) ? Number(date) : date;
  const dateObj = new Date(_date);
  const timestamp = dateObj.getTime();
  const month = dateObj.getUTCMonth();
  const day = dateObj.getUTCDate();
  const diff = _current - timestamp;
  let string = short ? `${monthsShort[month]} ${day}` : `${monthsLong[month]} ${day}`;
  if (diff < limits[0]) {
    string = 'just now';
    return string;
  } else if (diff < limits[1]) {
    const timeDiff = Math.ceil(diff / limits[0]);
    string = short ? `${timeDiff} mins ago` : `${timeDiff} minutes ago`;
    return string;
  } else if (diff < limits[2]) {
    const timeDiff = Math.ceil(diff / limits[1]);
    string = timeDiff === 1 ? `${timeDiff} hour ago` : `${timeDiff} hours ago`;
    return string;
  } else if (diff < limits[3]) {
    const timeDiff = Math.ceil(diff / limits[2]);
    string = timeDiff === 1 ? `${timeDiff} day ago` : `${timeDiff} days ago`;
    return string;
  }
  return string;
};

/**
 * @desc Returns reading time from body content
 * @param  {string} content
 * @return {number}
 */

export const getReadingTime = content => {
  if (!content) return null;
  const articleWordLength = content.replace(/\s?[^a-zA-Z\d\s]\s/g, ' ').split(' ').length;
  const wordsPerMinute = 250;
  return Math.ceil(articleWordLength / wordsPerMinute);
};
