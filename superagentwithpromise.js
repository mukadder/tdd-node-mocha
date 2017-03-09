/**
 * Created by mukadder on 3/9/17.
 */
var request = require('superagent');
let apiUrl,
    promiscuousInspiration;

apiUrl = `http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]`;

promiscuousInspiration = new Promise((resolve, reject) => {
    request
        .get(apiUrl)
        .end((err, res) => {
            if (err) {
                return reject(err);
            }
            let data,
                inspiration;
            data = JSON.parse(res.text);
            inspiration = data.value.joke;
            return resolve(inspiration);
        });
});
promiscuousInspiration
    .then((inspiration) => {
        console.log('Inspiration: ', inspiration);
    }, (err) => {
        console.error('Error while getting inspired: ', err);
    });