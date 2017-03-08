/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Sending a response from your server
 */

var http = require('http');

var server = http.createServer(function(req, res) {

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, 'woot');
    res.write('<!doctype html>');
    res.write('<html>');
    res.write('<head><meta charset="utf-8"></head>');
    res.write('<body>');
    res.write('<h2>Hello World</h2>');
    res.write('</body></html>');
    res.end();
});

server.listen(8080);

/**
 * Headers and status codes
 */
var http = require('http');
url = require('url');

var server = http.createServer(function(req, res) {

    if (req.headers) {
        console.log('request headers', req.headers);
    }

    if (req.statusCode) {
        console.log('request status code', req.statusCode, http.STATUS_CODES[req.statusCode]);
    }

    var parsedUrl = url.parse(req.url);
    if (parsedUrl.path === '/manifest.webapp') {
        // serving an application manifest file type
        res.writeHead(200, { 'Content-Type' : 'application/x-web-app-manifest+json' });
        res.write('{ "name" : "App" }');
        res.write( '"description": "My elevator pitch goes here",');
        res.write('"launch_path": "/",');
        res.write('"icons": {');
        res.write('"128": "/img/icon-128.png" },');
        res.write('"developer": {');
        res.write(' "name": "Your name or organization",');
        res.write(' "url": "http://your-homepage-here.org" },');
        res.write('"default_locale": "en" }');
        res.end();
    } else if (parsedUrl.path !== '/') {
        res.statusCode = 404;
        res.end(http.STATUS_CODES[res.statusCode]);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.end('<h2>normalContent</h2>');
    }

});

server.listen(8080);



