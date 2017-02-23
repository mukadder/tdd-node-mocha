import RemoteData from 'remote-data';

const githubPerson = new RemoteData({
        url: username => `https://api.github.com/users/${username}`,
    onChange: remoteData => console.log('State changed!', remoteData)
});

// then later on

githubPerson.fetch('jackfranklin').then((remoteData) => {
    // it worked fine
    console.log(remoteData.isSuccess()) // true
console.log(remoteData.data) // github api data
console.log(remoteData.response.status) // 200
}).catch((remoteData) => {
    // something went wrong
    console.log(remoteData.isSuccess()) // false
console.log(remoteData.isFailure()) // true
console.log(remoteData.data) // error info
console.log(remoteData.response.status) // response status code
});
/**
 * Created by mukadder on 2/23/17.
 */
