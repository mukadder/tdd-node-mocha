/**
 * Created by mukadder on 3/8/17.
 */
/**
 * using ciphers on files
 */

var crypto = require('crypto'),
    fs = require('fs'),
    algo = 'aes256',
    key = 'cheese';

var text = fs.readFileSync('6-6-1.txt', { encoding: 'utf8' });

var cipher = crypto.createCipher(algo, key);
var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

console.log(encrypted);

var decipher = crypto.createDecipher(algo, key);
var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

if (decrypted === text) {
    console.log('success!');
    console.log(text);
}

/**
 * user credentials
 */

var crypto = require('crypto'),
    password = 'MySuperSecretPassword';

function getHmac(password, salt) {
    var out = crypto.createHmac('sha256', salt).update(password).digest('hex');
    return out;
}
function getHash(password, salt) {
    var out = crypto.createHash('sha256').update(salt + password).digest('hex');
    return out;
}

function getSalt() {
    return crypto.randomBytes(32).toString('hex');
}
var salt = getSalt();
var hmac = getHmac(password, salt);
var hash = getHash(password, salt);
console.log('my pwd: ', password, ' salted: ', salt, ' and hashed: ', hash);
console.log('hmac: ' , hmac);


