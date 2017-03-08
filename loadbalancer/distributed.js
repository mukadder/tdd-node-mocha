/**
 * Created by mukadder on 3/7/17.
 */
var arguments = process.argv.splice(2);
var httpProxy = require('http-proxy');

//
// Addresses to use in the round robin proxy
//
var addresses = [
    {
        host: 'localhost',
        port: 8001
    },
    {
        host: 'localhost',
        port: 8002
    },
    {
        host: 'localhost',
        port: 8003
    }
];

var i = 0;
httpProxy.createServer(function (req, res, proxy) {
    proxy.proxyRequest(req, res, addresses[i]);

    i = (i + 1) % addresses.length;
}).listen(arguments[0] || 8000);
/*
 node pi-server.js 8001 &
 $ node pi-server.js 8002 &
 $ node pi-server.js 8003 &
 $ node load-balancer.js 8000
 */