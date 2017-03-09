/**
 * Created by mukadder on 3/9/17.
 * SuperAgent is a small progressive client-side HTTP request library, and Node.js module with the same API, sporting many high-level HTTP client features.
 */
//import superagent from 'superagent';
//var nocache = require('superagent-no-cache');
var request = require('superagent');
//var prefix = require('superagent-prefix')('/static');

let apiUrl;

apiUrl = `http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]`;

request
    .get(apiUrl)
    .end((err, res) => {
        let data,
            inspiration;

        data = JSON.parse(res.text);
        inspiration = data.value.joke;

        console.log(inspiration);
    });
