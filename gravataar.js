/**
 An MD5 hash is created by taking a string of an any length and encoding it into a 128-bit fingerprint. Encoding the same string using the MD5 algorithm will always result in the same 128-bit hash output. This tool provides a quick and easy way to encode an MD5 hash from a simple string of up to 256 characters in length. * Created by mukadder on 3/8/17.
 */
var crypto = require('crypto');

var email = 'sahat@msn.com';
var md5 = crypto.createHash('md5').update(email).digest('hex');
var url = 'http://www.gravatar.com/avatar/' + md5;