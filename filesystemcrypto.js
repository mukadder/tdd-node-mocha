/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Verifying file integrity
 */

var http = require('http'),
    fs = require('fs'),
    crypto = require('crypto');

//var node_exe = fs.createWriteStream('node.exe');

var req = http.get('http://nodejs.org/dist/v0.10.10/node.exe', function(res) {
    var hash = crypto.createHash('sha1');

    res.on('data', function(data) {
        hash.update(data);
    });
    //res.pipe(node_exe);
    res.on('end', function() {
        console.log(hash.digest('hex'));

        //  var hash = crypto.createHash('sha1');

        //  readr = fs.ReadStream('node.exe');

        //  readr.on('data', function(data) {
        //      hash.update(data);
        //  });

        //  readr.on('end', function() {
        // Should match 419fc85e5e16139260f7b2080ffbb66550fbe93f  node.exe
        // from http://nodejs.org/dist/v0.10.10/SHASUMS.txt
        //      var dig = hash.digest('hex');
        //      if (dig === '419fc85e5e16139260f7b2080ffbb66550fbe93f') {
        //          console.log('match');
        //      } else {
        //          console.log('no match');
        //      }
        //      console.log(dig);
        //  });
    });
});

/**
 * Reviewing ciphers
 */

var crypto = require('crypto');

var ciphers = crypto.getCiphers();
console.log(ciphers.join(', '));



