/**
 * Created by mukadder on 3/9/17.
 */
import superagent from 'superagent';
import {Observable} from 'rx';

let apiUrl,
    inspireHTML,
    getInspiration;

apiUrl = `http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]`;

inspireHTML = (parentId, inspiration) => {
    let parentNode,
        inspirationalNode;

    parentNode = document.getElementById(parentId);
    inspirationalNode = document.createElement('p');
    inspirationalNode.innerHTML = inspiration;

    parentNode.insertBefore(inspirationalNode, parentNode.firstChild);
};


getInspiration = () => new Promise((resolve, reject) => {
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

            resolve(inspiration);
        });
});

Observable
    .interval(2000)
    .take(10)
    .flatMap(getInspiration)
    .subscribe({
        onNext: (inspiration) => {
            let parentId;

            parentId = `inspiration`;
            inspireHTML(parentId, inspiration);
        },
        onError: (error) => {
            console.error('Error while getting inspired', error);
        },
        onCompleted: () => {
            console.log('Done getting inspired!');
        },
    });