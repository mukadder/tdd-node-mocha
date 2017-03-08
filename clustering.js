/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Clustering
 */

var cluster = require('cluster'),
    http = require('http'),
    cpuCount = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
    cluster.on('fork', function(worker) {
        console.log(worker + ' worker is forked');
    });
    cluster.on('listening', function(worker, address) {
        console.log(worker + ' is listening on ' + address);
    });
    cluster.on('online', function(worker) {
        console.log(worker + ' is online');
    });
    cluster.on('disconnect', function(worker) {
        console.log(worker + ' disconnected');
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}