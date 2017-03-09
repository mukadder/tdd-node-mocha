/**
 * Created by mukadder on 3/8/17.
 */
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart({ uploadDir: __dirname + '/uploads', limit: '50mb' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/upload', function(req, res) {
    console.log(req.files.file.name + ' has been uploaded');
    res.send(200);
});


app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
