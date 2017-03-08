/**
 * Created by mukadder on 3/8/17.
 */
/**
 * serving Static Html with the File System
 */

var http = require('http'),
    fs = require('fs'),
    url = require('url');

var server = http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url);
    //Specific route for the root file
    if (parsedUrl.path === '/') {
        fs.readFile('4-10-1.html', function(err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(http.STATUS_CODES[500]);
            }

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
        //Specific route for api json
    } else if (parsedUrl.path === '/json') {
        fs.readFile('4-10-1.json', function(err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(http.STATUS_CODES[500]);
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(data);
            res.end();
        });
        //handle arbitrary routes
    } else {
        fs.readFile(parsedUrl.path.split('/')[1], function(err, data) {
            if (err) {
                res.statusCode = 404;
                res.end(http.STATUS_CODES[404]);
            }

            var ursplit = parsedUrl.path.split('.');
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
    }
});

server.listen(8080);
/**
 * serving Static Html with the File System
 */

var http = require('http'),
    fs = require('fs'),
    path = require('path');

//Content types map
var contentTypes = {
    '.htm'  : 'text/html',
    '.html' : 'text/html',
    '.js'   : 'text/javascript',
    '.json' : 'application/json',
    '.css'  : 'text/css'
};

var server = http.createServer(function(req, res) {

    var fileStream = fs.createReadStream(req.url.split('/')[1]);

    fileStream.on('error', function(error) {
        if (error.code === 'ENOENT') {
            res.statusCode = 404;
            res.end(http.STATUS_CODES[404]);
        } else {
            res.statusCode = 500;
            res.end(http.STATUS_CODES[500]);
        }
    });
    //Get the extension
    var extension = path.extname(req.url);

    //read the extension against the content type map - default to plain text
    var contentType = contentTypes[extension] || 'text/plain';

    // add the content type header
    res.writeHead(200, { 'Content-Type' : contentType });

    // pipe the stream to the response stream
    fileStream.pipe(res);



});

server.listen(8080);
