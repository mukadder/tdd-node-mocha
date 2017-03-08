/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Checking File Integrity
 */

var fs = require('fs'),
    args = process.argv.splice('2'),
    crypto = require('crypto');

var algorithm = ['md5', 'sha1', 'sha256', 'sha512'];

algorithm.forEach(function(algo) {
    var hash = crypto.createHash(algo);

    var fileStream = fs.ReadStream(args[0]);

    fileStream.on('data', function(data) {
        hash.update(data);
    });

    fileStream.on('end', function() {
        console.log(algo);
        console.log(hash.digest('hex'));
    });
});
