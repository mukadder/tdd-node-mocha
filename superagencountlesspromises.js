/**
 * Created by mukadder on 3/9/17.
 */
//import superagent from 'superagent';
var superagent = require('superagent');
let apiUrl,
    inspireHTML,
    addPromiscuousInspiration,
    add10Inspirations;

apiUrl = `http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]`;

inspireHTML = (parentId, inspiration) => {
    let parentNode,
        inspirationalNode;

    parentNode = document.getElementById(parentId);
    inspirationalNode = document.createElement('p');
    inspirationalNode.innerHTML = inspiration;

    parentNode.insertBefore(inspirationalNode, parentNode.firstChild);
};

addPromiscuousInspiration = () => {
    let promiscuousInspiration;

    promiscuousInspiration = new Promise((resolve, reject) => {
        superagent
            .get(apiUrl)
            .end((err, res) => {
                if (err) {
                    return reject(err);
                }

                let data,
                    inspiration;

                data = JSON.parse(res.text);
                inspiration = data.value.joke;

                console.log('Inspiration has arrived!');
                return resolve(inspiration);
            });
    });

    promiscuousInspiration.then((inspiration) => {
        let parentId;

        parentId = `inspiration`;
        inspireHTML(parentId, inspiration);
    }, (err) => {
        console.error('Error while getting inspired: ', err);
    });
};

add10Inspirations = () => {
    let maxTries,
        tries,
        interval;

    maxTries = 10;
    tries = 1;

    interval = setInterval(() => {
        addPromiscuousInspiration();

        if (tries < maxTries) {
            tries++;
        } else {
            clearInterval(interval);
        }
    }, 2000);
};

add10Inspirations();