var request = require('request');
/*
 When a function is declared as async it is then able to yield execution to the calling code while it awaits
  for a promise to be resolved. If you’re not familiar with promises check out one of these great resources.
 */
function getQuote() {
    var quote;

    request('http://ron-swanson-quotes.herokuapp.com/v2/quotes', function(error, response, body) {
        quote = body;
    });

    return quote;
}

function main() {
    var quote = getQuote();
    console.log(quote);
}

main();/**
 * Created by mukadder on 2/23/17.
 */
