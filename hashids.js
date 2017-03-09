/**
 * Created by mukadder on 3/8/17.
 */
var Hashids = require('hashids');

var hashids = new Hashids();

// Encrypt integer
var hash = hashids.encrypt(3912); // 'xGqP'

// Encrypt hex string
var hash = hashids.encryptHex('526b32409e12c3cc1c000002'); // '4rJwNNY42AIOjvqlk5mn'
var Hashids = require('hashids');

var hashids = new Hashids();

var hash = 'xGqP';
var id = hashids.decrypt(hash); // [ 3912 ]

var hash = '4rJwNNY42AIOjvqlk5mn';
var objectId = hashids.decryptHex(hash); // '526b32409e12c3cc1c000002'

var Hashids = require('hashids');

var Hashids = new Hashids('unique string that no one could guess');
/*
 Note: Salt is a random string that is appended to the hashes to make it even harder to crack it. Here is a really nice article that explains what is a cryptographic salt in greater detail.

 There are a few other things that Hashids can you which you can learn more on the GitHub Project page or go to the official page and scroll down until you see full documentation button, which unfortunately is not linkable.
 */