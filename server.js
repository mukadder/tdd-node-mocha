/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Processing Requests
 */
var http = require('http'),
    url = require('url');

var server = http.createServer(function(req, res) {
    //Handle headers
    if (req.headers.dnt == 1) {
        console.log('Do Not Track');
    }
    console.log(req.headers);

    //Parse the URL
    var url_parsed = url.parse(req.url, true);

    //What type of request is this
    switch (req.method) {
        // HTTP GET
        case 'GET':
            //Take a look at the querystring and path
            // 4-7-1 > res.statusCode = 304;
            // 4-7-1 >
            res.setHeader('x-ample', 'trigger');
            //if (req.headers['Expect'] === '100-continue') {
            //    res.writeContinue();
            //}
            console.log('search: ' + url_parsed.search);
            console.log('query: ' + JSON.stringify(url_parsed.query));
            console.log('pathname: ' + url_parsed.pathname);
            console.log('path: ' + url_parsed.path);
            console.log('href: ' + url_parsed.href);
            res.end('get\n');
            break;
        //HTTP POST
        case 'POST':
            if (url_parsed.path !== '/api') {
                res.statusCode = 404;
                res.end('404\n');
            }
            res.end('post\n');
            break;
        // HTTP PUT
        case 'PUT':
            if (url_parsed.path !== '/api') {
                res.statusCode = 404;
                res.end('404\n');
            }
            res.end('put\n');
            break;
        case 'DELETE':
            if (url_parsed.path !== '/api') {
                res.statusCode = 404;
                res.end('404\n');
            }
            res.end('delete\n');
            break;
        default:
            res.end('Method not supported');
            break;
    }
    res.end();
});

server.listen(8080);
