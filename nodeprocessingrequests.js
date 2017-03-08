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
  if (req.method === 'GET') {
handleGetRequest(res, url_parsed);
} else if (['POST', 'PUT', 'DELETE'].indexOf(req.method) > -1) {
handleApiRequest(res, url_parsed, req.method);
} else {
      res.end('Method not supported');
  }

});

handleGetRequest = function(res, url_parsed) {
    console.log('search: ' + url_parsed.search);
    console.log('query: ' + JSON.stringify(url_parsed.query));
    console.log('pathname: ' + url_parsed.pathname);
    console.log('path: ' + url_parsed.path);
    console.log('href: ' + url_parsed.href);
    res.end('get\n');
};

handleApiRequest = function(res, url_parsed, method) {
if (url_parsed.path !== '/api') {
    res.statusCode = 404;
    res.end('404\n');
}
res.end(method);
};

server.listen(8080);
