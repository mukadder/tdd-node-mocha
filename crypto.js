/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Analyzing types of data
 */

var crypto = require('crypto'),
    hashes = crypto.getHashes();

hashes.forEach(function(hash) {

    ['', 'The quick brown fox jumped over the lazy dog.'].forEach(function(txt) {
        var hashed;
        try {
            hashed =crypto.createHash(hash).update(txt).digest('hex');
        } catch (ex) {
            if (ex.message === 'Digest method not supported') {
                // not supported for this algo
            } else {
                console.log(ex, hash);
            }
        }

        console.log(hash, hashed);
    });
});
var crypto = require('crypto'),
    message = 'this is a message';

console.log('sha1');
console.log(crypto.createHash('sha1').update(message).digest('hex'));
console.log(crypto.createHash('sha1').update(message).digest('base64'));
console.log(crypto.createHash('sha1').update(message).digest('binary'));

console.log('md5');
console.log(crypto.createHash('md5').update(message).digest('hex'));
console.log(crypto.createHash('md5').update(message).digest('base64'));
console.log(crypto.createHash('md5').update(message).digest('binary'));
