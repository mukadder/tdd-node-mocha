/**
 * Created Aggregating the Results of a Fixed Number of Async Operations

 JavaScript promises make it very easy to run multiple async operations concurrently and aggregate their results after completion. They provide the Promise.all(iterable) method, which returns a promise that resolves when all of the promises in the iterable parameter have resolved.

 This feature is useful in many situations. In the following example, we invoke three Spotify services and retrieve different pieces of information about the AC/DC band. One service returns the artist details, another service returns the top tracks, and a third service returns the related artists. We wait until all invocations are returned, extract the information we need from the results and print it on the console. mukadder on 2/24/17.
 */
var fetch = require('node-fetch');

var artistId = '711MCceyCBcFnzjGY4Q7Un';

Promise.all([
    fetchArtist(artistId),
    fetchTopTracks(artistId),
    fetchRelatedArtists(artistId)
])
    .then(printResults)
    .catch(handleError);

function fetchArtist(artistId) {
    return fetch(`https://api.spotify.com/v1/artists/${artistId}`)
        .then(res => res.json());
}

function fetchTopTracks(artistId) {
    return fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=AU`)
        .then(res => res.json());
}

function fetchRelatedArtists(artistId) {
    return fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`)
        .then(res => res.json());
}

function printResults(responses) {
    var artist = responses[0];
    var topTracks = responses[1].tracks;
    var relatedArtists = responses[2].artists;

    var output = `Name: ${artist.name}\n`;
    output += 'Top tracks:\n';
    topTracks.forEach(track => output += ` - ${track.name} (${track.album.name})\n`);
    output += 'Related artists:\n';
    relatedArtists.forEach(relatedArtist => output += ` - ${relatedArtist.name}\n`);

    console.log(output);
}

function handleError(err) {
    console.log(err);
}