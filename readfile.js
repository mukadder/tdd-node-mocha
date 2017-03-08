/**
 * Created by mukadder on 3/8/17.
 */
var fs = require('fs');
var out;

console.log(__dirname);
//read current directory asynchronous
fs.realpath(__dirname, function(err, /* [cache], */ path) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('realpath async: ' + path);
});
out = fs.realpathSync(__dirname);
console.log('real path sync: ' + out);

fs.stat(__dirname, function(err, stat) {
    if (err) return;
    var isDir = false;

    fs.readdir(__dirname, function(err, contents) {
        if (err) return;
        contents.forEach(function(f) {
            console.log('contents: ' + f);
        });

    });
});

//get list of whats in the directory
out = fs.readdirSync(__dirname);
console.log('readdir sync: ' + out);

