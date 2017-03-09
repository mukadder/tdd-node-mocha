/**
 * Created by mukadder on 3/9/17.
 */
var express = require('express');
var app = express();

var quotes = [
    { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
    { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
    { author : 'Unknown', text : "Even the greatest was once a beginner. Don’t be afraid to take that first step."},
    { author : 'Neale Donald Walsch', text : "You are afraid to die, and you’re afraid to live. What a way to exist."}
];
//The route is passed the url that will be accessed, such as '/' or the site root. The second parameter to a route is a callback to call when the url is retrieved.
app.use(express.bodyParser());
/*
 The route callback takes in a req (request) and res (response) which are modified versions of the objects passed to the core request event. Express adds functionality to both objects but for this exercise we'll concentrate on the response object.
 */
app.get('/', function(req, res) {
    //advantage of a helper function on the response object, to send a json object.
    res.json(quotes);
});
/*
 Let's add the ability to retrieve a random quote. This, again, shouldn't be hard addition. We'll add a new route '/quote/random'; then we'll calculate a random index, grab the quote, and return it.
 */
app.get('/quote/random', function(req, res) {
    var id = Math.floor(Math.random() * quotes.length);
    var q = quotes[id];
    res.json(q);
});
/*
 The next thing we'll add in there is the ability to grab a single quote. The way you do this is by adding a ":param" to the route, so the route will look like "/quote/:id" and the id will be available using req.params.
 */
app.get('/quote/:id', function(req, res) {
    if(quotes.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No quote found');
    }

    var q = quotes[req.params.id];
    res.json(q);
});
/*
 In order to get the body from a POST in express we have to add a piece of middleware to our application. This is done using bodyParser middleware. Body parser will pretty much do what it sounds like - parse the body of the request and then it sets the body property on the request object.
 */
app.post('/quote', function(req, res) {
    if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('text')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    var newQuote = {
        author : req.body.author,
        text : req.body.text
    };

    quotes.push(newQuote);
    res.json(true);
});
/*
 At the beginning of our route function we check to make sure the body has both the "author" and "text" properties. If they don't exist then we return an error. If the request is fine then we add it to our quotes and push back a true response.
 */
app.delete('/quote/:id', function(req, res) {
    if(quotes.length <= req.params.id) {
        res.statusCode = 404;
        return res.send('Error 404: No quote found');
    }

    quotes.splice(req.params.id, 1);
    res.json(true);
});
/*
 The above function starts by checking the length of our quotes to make sure we don't try to delete something that isn't there. If no error we splice the array to remove the quote and return true to the client.
 */
var express = require('express');
var app = express();
/*
 With the response object the following code will do two things. It will set the content type header (Content-Type) using the res.type function. A text response will be sent back using res.send which will automatically set the content length header (Content-Length).
 */
app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('i am a beautiful butterfly');
});

app.listen(process.env.PORT || 4730);