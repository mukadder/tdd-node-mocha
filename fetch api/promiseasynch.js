/**
 * Cre
 * 1. Running Async Operations in Sequence

 Using promises to chain async operations greatly improves code readability compared to the traditional callback style. The chaining is created by specifying multiple then methods and returning a new promise from the onFulfilled callback. This way, the async operations are executed in sequence and the result of each operation is passed along to the next one. There is no limit on how many operations can be chained together.

 Let’s have a look at a real example to better understand how it works. Let’s suppose we have a music app and we want to suggest a song based on the song the user is currently listening to. Using the Spotify API, we can implement the following sequence of operations:

 Get the current track’s artist
 Get the related artists
 Get the top tracks of one of the related artist
 Suggest one of the tracks to the user
 ated by mukadder on 2/24/17.The operations are implemented in separate functions and composed in a sequence using the Promise.then(onFulfilled, onRejected) method. Code readability looks pretty good and each operation can be easily tested in isolation.
 */

var fetch = require('node-fetch');

var trackId = '08mG3Y1vljYA6bvDt4Wqkj';

fetchTrack(trackId)
    .then(fetchRelatedArtists)
    .then(fetchTopTracks)
    .then(printResults)
    .catch(handleError);

function fetchTrack(trackId) {
    var trackUrl = `https://api.spotify.com/v1/tracks/${trackId}`;
    return fetch(trackUrl).then(response => response.json());
}

function fetchRelatedArtists(track) {
    console.log(`You are listening to '${track.name}' by ${track.artists[0].name}`);
    var artistId = track.artists[0].id;
    var relatedArtistsUrl = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;
    return fetch(relatedArtistsUrl).then(response => response.json());
}

function fetchTopTracks(relatedArtists) {
    var relatedArtistId = pickRandomItem(relatedArtists.artists).id;
    var relatedArtistsUrl = `https://api.spotify.com/v1/artists/${relatedArtistId}/top-tracks?country=AU`;
    return fetch(relatedArtistsUrl).then(response => response.json());
}

function printResults(topTracks) {
    var suggestedTrack = pickRandomItem(topTracks.tracks);
    console.log(`You might also like '${suggestedTrack.name}' by ${suggestedTrack.artists[0].name}`);
}

function pickRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function handleError(err) {
    console.log(err);
}
