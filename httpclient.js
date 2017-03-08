/**
 * Created by mukadder on 3/8/17.
 */
/*
 * Creating an HTTP client
 */

var http = require('http'),
    args = process.argv.slice(2);

//Set defaults
var clientOptions = {
    host: 'localhost',
    // hostname:'nodejs.org',
    port: '8080',
    path: '/',
    method: 'GET'
};

args.forEach(function(arg) {
    switch(arg) {
        case 'GET':
            clientOptions.method = 'GET';
            break;
        case 'SUBMIT':
        case 'POST':
            clientOptions.method = 'POST';
            clientOptions.path = '/api';
            break;
        case 'UPDATE':
        case 'PUT':
            clientOptions.path = '/api';
            clientOptions.method = 'PUT';
            break;
        case 'REMOVE':
        case 'DELETE':
            clientOptions.method = 'DELETE';
            clientOptions.path = '/api';
            break;
        default:
            clientOptions.method = 'GET';
            clientOptions.path = '/';
    }

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

    clientReq.on('error', function(error) {
        throw error;
    });

    clientReq.end();
});
/**
 * Processing Client responses
 */

var http = require('http');

var clientOptions = {
    host: 'localhost',
    port: '8080',
    path: '/',
    method: 'GET'
};

var clientReq = http.request(clientOptions, function(res) {
    //Handle custom header for something special
    if (res.headers['x-ample'] === 'trigger') {
        console.log('x-ample header trigger');

        //work with status codes
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
            default:
                console.log(res.statusCode + ': ' + http.STATUS_CODES[res.statusCode]);
                break;
        }
    } else {
        console.log('required header not present');
    }
});

clientReq.on('error', function(error) {
    throw error;
});

clientReq.setHeader('Cache-Control', 'no-cache');
clientReq.end();
/*
 * Creating an HTTP client
 */

var http = require('http');

var clientOptions = {
    host: 'localhost',
    port: '8080',
    path: '/',
    method: 'GET',
    headers: { 'Connection': 'keep-alive',
        'Content-Length': 0 }
};

var clientReq = http.request(clientOptions, function(res) {
    console.log('status code', res.statusCode, ': ', http.STATUS_CODES[res.statusCode]);
    res.on('data', function(data) {
        console.log(data);
    })
});

clientReq.on('continue', function(res) {
    console.log('continue event due to 100-continue');
});

clientReq.on('error', function(error) {
    throw error;
});

clientReq.end();
var http = require('http');

var getReq = http.get('http://localhost:8080', function(res) {
    console.log('status code', res.statusCode, ': ', http.STATUS_CODES[res.statusCode]);
});

getReq.on('error', function(err) {
    console.log(err);
});

var http = require('http');

var opt = {
    host : 'localhost',
    port : 8080,
    path : '/upload',
    method : 'POST'
};

var upload = http.request(opt, function(res) {
    console.log('status code', res.statusCode, ': ', http.STATUS_CODES[res.statusCode]);
});

upload.on('error', function(err) {
    console.log(err);
});

upload.write('my upload stuff');
upload.end();