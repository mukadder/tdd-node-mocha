/**
 * Created by mukadder on 3/8/17.
 */
/**
 * encrypting data
 */

var crypto = require('crypto'),
    algo = 'aes256',
    key = 'cheese',
    text = 'the itsy bitsy spider went up the water spout';

var cipher = crypto.createCipher(algo, key);
var encrypted = cipher.update(text, 'utf8', 'hex') +
    cipher.final('hex');

console.log(encrypted);

var decipher = crypto.createDecipher(algo, key);
var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

if (decrypted === text) {
    console.log('success!');
}