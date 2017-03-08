/**
 * Created by mukadder on 3/8/17.
 */
/**
 * querystrings
 */

var qs = require('querystring');

var incomingQS = [ 'foo=bar&foo=baz',
    'trademark=%E2%84%A2',
    '%7BLOTR%7D=frodo%20baggins'];

incomingQS.forEach(function(q) {
    console.log(qs.parse(q));
});

var outgoingQS = { good: 'night', v: '0.10.12', trademark: '™'};
console.log(qs.stringify(outgoingQS));

var newQS = qs.stringify(outgoingQS, '|', '~');
console.log(newQS);

console.log(qs.parse(newQS));