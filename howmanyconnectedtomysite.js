/**
 * Created by mukadder on 3/8/17.
 */
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index');
});

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});


var userCount = 0;

io.sockets.on('connection', function (socket) {
    userCount++;
    io.sockets.emit('userCount', { userCount: userCount });
    socket.on('disconnect', function() {
        userCount--;
        io.sockets.emit('userCount', { userCount: userCount });
    });
});
