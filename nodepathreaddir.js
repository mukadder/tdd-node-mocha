/**
 * Created by mukadder on 3/8/17.
 */
var fs = require('fs');
var out;
var args;
//Normalize the arguments
args = process.argv.splice(2);

args.forEach(function(arg) {
    console.log(arg);
    //read current directory asynchronous
    fs.realpath(arg, function(err, /* [cache], */ path) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('realpath async: ' + path);
    });
    out = fs.realpathSync(arg);
    console.log('real path sync: ' + out);

    fs.stat(arg, function(err, stat) {
        if (err) return;
        var isDir = false;

        fs.readdir(arg, function(err, contents) {
            if (err) return;
            contents.forEach(function(f) {
                console.log('contents: ' + f);
            });

        });
    });

    //get list of whats in the directory
    out = fs.readdirSync(arg);
    console.log('readdir sync: ' + out);

});