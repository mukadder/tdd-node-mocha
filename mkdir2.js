/**
 * Created by mukadder on 3/8/17.
 */
var fs = require('fs'),
    dirExists = false;

//Normalize the arguments
args = process.argv.splice(2);
//loop through named args
args.forEach(function(arg) {
    //rmdir sync
    var dir = arg
    try {
        fs.rmdirSync(dir);
    } catch(err) {
        handleError(err);
    }
    //rmdir async
    fs.rmdir(arg, function(err) {
        if (err) handleError(err);
    });

});

function handleError(err) {
    console.log(err);
    if (err.code === 'ENOENT') {
        console.log('That directory does not exist');
    } else if (err.code === 'ENOTEMPTY') {
        console.log('Cannot remove directory because it is not empty');
    } else {
        console.log('An error occurred removing the directory');
    }
}