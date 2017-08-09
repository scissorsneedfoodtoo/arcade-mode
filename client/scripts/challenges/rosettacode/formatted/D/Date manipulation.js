
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint prefer-template: 0 */

const assert = require('assert');

/// title: Date manipulation
/// type: rosetta-code

/// categories:
/// Date and time

/// difficulty: 3

/// benchmark:

/// description:
/// <div class="rosetta">
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Given a date string in EST, output the given date as a string with 12 hours added to the time. <br></p>
/// <p class="rosetta__paragraph">Time zone should be preserved.<br><br></p>
/// <p class="rosetta__paragraph">Example input: <br></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"><code>"March 7 2009 7:30pm EST"</code></span></p>
/// <p class="rosetta__paragraph">Example output: <br></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"><code>"March 8 2009 7:30am EST"</code></span></p>
/// <br><br><br/></div>

/// challengeSeed:
function add12Hours (dateString) {
  // Good luck!
  return true;
}

/// solutions:
function add12Hours (dateString) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  // Get the parts of the string
  const parts = dateString.split(' ');
  const month = months.indexOf(parts[0]);
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const time = parts[3].split(':');
  let hours = parseInt(time[0], 10);
  if (time[1].slice(-2) === 'pm') {
    hours += 12;
  }
  const minutes = parseInt(time[1].slice(0, -2), 10);

  // Create a date with given parts, and updated hours
  const date = new Date();
  date.setFullYear(year, month, day);
  date.setHours(hours + 12);  // Add 12 hours
  date.setMinutes(minutes);

  let hoursOutput = date.getHours();
  let abbreviation = 'am';
  if (hoursOutput > 12) {
    hoursOutput -= 12;
    abbreviation = 'pm';
  }

  return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ${hoursOutput}:${date.getMinutes()}${abbreviation} EST`;
}

/// tail:
const tests = [
  'January 17 2017 11:43am EST',
  'March 7 2009 7:30pm EST',
  'February 29 2004 9:15pm EST',
  'February 28 1999 3:15pm EST',
  'December 31 2020 1:45pm EST'
];
const answers = [
  'January 17 2017 11:43pm EST',
  'March 8 2009 7:30am EST',
  'March 1 2004 9:15am EST',
  'March 1 1999 3:15am EST',
  'January 1 2021 1:45am EST'
];

/// tests:
assert(typeof add12Hours === 'function', 'message: <code>add12Hours</code> is a function.');
assert(typeof add12Hours(tests[0]) === 'string', 'message: <code>add12Hours(dateString)</code> should return a string.');
assert(add12Hours(tests[0]) === answers[0], 'message: <code>add12Hours("' + tests[0] + '")</code> should return <code>"' + answers[0] + '"</code>');
assert(add12Hours(tests[1]) === answers[1], 'message: Should handel day change. <code>add12Hours("' + tests[1] + '")</code> should return <code>"' + answers[1] + '"</code>');
assert(add12Hours(tests[2]) === answers[2], 'message: Should handel month change in a leap years. <code>add12Hours("' + tests[2] + '")</code> should return <code>"' + answers[2] + '"</code>');
assert(add12Hours(tests[3]) === answers[3], 'message: Should handel month change in a common years. <code>add12Hours("' + tests[3] + '")</code> should return <code>"' + answers[3] + '"</code>');
assert(add12Hours(tests[4]) === answers[4], 'message: Should handel year change. <code>add12Hours("' + tests[4] + '")</code> should return <code>"' + answers[4] + '"</code>');
/// id: 5966c21cf732a95f1b67dd28
