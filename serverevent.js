/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Responding to events
 */

var http = require('http'),
    server = http.createServer(),
    connections = 0;

// request event
server.on('request', function(req, res) {
    console.log('request');//, req);
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('heyo');
});

server.on('connection', function(socket) {
    connections++;
    console.log('connection count: ', connections);
});

server.on('checkContinue', function(req, res) {
    console.log('checkContinue');
    res.writeContinue();
});

server.on('upgrade', function(req, socket, head) {
    console.log('upgrade');
    socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
        'Upgrade: WebSocket\r\n' +
        'Connection: Upgrade\r\n' +
        'Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=\r\n' +
        'Sec-WebSocket-Protocol: chat\r\n' +
        '\r\n');
    socket.pipe(socket);
});

server.on('clientError', function(exception, socket) {
    console.log(exception);
});

server.listen(8080);

/*
 * client events
 */

var http = require('http');

var clientOptions = {
    host: 'localhost',
    // hostname:'nodejs.org',
    port: '8080',
    path: '/',
    method: 'GET',
    headers: { 'Expect': '100-continue' }
};

var clientReq = http.request(clientOptions, function(res) {
    console.log('status code', res.statusCode);
    switch(res.statusCode) {
        case 200:
            res.setEncoding('utf8'); // unless you can read buffer chunks
            res.on('data', function(data) {
                console.log('data', data);
            });
            break;
        case 404:
            console.log('404 error');
            break;
    }
});

clientReq.on('continue', function() {
    console.log('client continue');
});

clientReq.on('error', function(error) {
    throw error;
});

clientReq.end();

/*
 * client events
 */

var http = require('http');

var clientOptions = {
    host: 'localhost',
    // hostname:'nodejs.org',
    port: '8080',
    path: '/',
    method: 'GET',
    headers: { 'Connection': 'Upgrade',
        'Upgrade': 'websocket',
        'Sec-WebSocket-Key': 'dGhlIHNhbXBsZSBub25jZQ==',
        'Origin' :'localhost',
        'Sec-WebSocket-Protocol': 'chat',
        'Sec-WebSocket-Version': 13 }
};

var clientReq = http.request(clientOptions, function(res) {
    console.log('status code', res.statusCode);
    switch(res.statusCode) {
        case 200:
            res.setEncoding('utf8'); // unless you can read buffer chunks
            res.on('data', function(data) {
                console.log('data', data);
            });
            break;
        case 404:
            console.log('404 error');
            break;
    }
});

clientReq.on('upgrade', function(res, socket, head) {
    console.log('client upgrade');
});

clientReq.on('error', function(error) {
    throw error;
});

clientReq.end();