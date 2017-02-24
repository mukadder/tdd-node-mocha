/**
 * Created by mukadder on 2/24/17
 * Aggregating the Results of a Variable Number of Async Operations

 Sometimes we need to run an async operation multiple times, once for each item of a dynamic list, and either get a confirmation that everything went OK or gather the results. The async operation could be persisting an object in the database, fetching data from an API service, converting data to another format, etc.

 The correct approach to this issue is mapping the list of items to a list of promises and using the Promise.all(iterable) method to define what happens when all operations are successfully completed or when some of them fail. The example below starts by retrieving AC/DC’s related artists from the Spotify API. The array of related artists is mapped to an array of promises returned by the calls to fetch the top tracks of each related artist. We finish by printing a top track of each related artist on the console.

 .
 */
var fetch = require('node-fetch');

var artistId = '711MCceyCBcFnzjGY4Q7Un';

fetchRelatedArtists(artistId)
    .then(fetchTopTracks)
    .then(printResults)
    .catch(handleError);

function fetchRelatedArtists(artistId) {
    var relatedArtistsUrl = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;
    return fetch(relatedArtistsUrl).then(response => response.json());
}

function fetchTopTracks(relatedArtists) {
    var promises = relatedArtists.artists.map(function (artist) {
        return fetch(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=AU`)
            .then(response => response.json());
    });
    return Promise.all(promises);
}

function printResults(topTracksArray) {
    topTracksArray.forEach(topTracks => console.log(`'${topTracks.tracks[0].name}' by ${topTracks.tracks[0].artists[0].name}`))
}

function handleError(err) {
    console.log(err);
}