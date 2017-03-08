/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Parsing URLS
 */

var http = require('http'),
    fs = require('fs'),
    url = require('url');

var server = http.createServer(function(req, res) {
    var urlParsed = url.parse(req.url,true, true);

    fs.readFile(urlParsed.path.split('/')[1], function(err, data) {
        if (err) {
            res.statusCode = 404;
            res.end(http.STATUS_CODES[404]);
        }

        var ursplit = urlParsed.path.split('.');
        var ext = ursplit[ursplit.length - 1];
        switch(ext) {
            case 'htm':
            case 'html':
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
                break;
            case 'js':
                res.writeHead(200, {'Content-Type': 'text/javascript'});
                res.end(data);
                break;
            case 'css':
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(data);
                break;
            case 'json':
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(data);
                break;
            default:
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data);
        }
    });
}).listen(80);