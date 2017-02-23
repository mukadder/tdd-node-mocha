var chakram = require('chakram'),
    expect = chakram.expect;

describe("Chakram", function() {
    it("should provide HTTP specific assertions", function () {
        var response = chakram.get("http://httpbin.org/get");
        return expect(response).to.have.status(200);
    });
});
describe("Chakram", function() {
    it("should offer simple HTTP request capabilities", function () {
        return chakram.get("http://httpbin.org/get");
    });
});
expect = chakram.expect;

describe("Chakram", function() {
    it("should provide HTTP specific assertions", function () {
        var response = chakram.get("http://httpbin.org/get");
        return expect(response).to.have.status(200);
    });
});
describe("Chakram", function() {
    it("should provide a simple async testing framework", function () {
        var response = chakram.get("http://httpbin.org/get");
        expect(response).to.have.status(200);
        expect(response).not.to.have.header('non-existing-header');
        return chakram.wait();
    });
});

describe("Chakram", function () {
    it("should support sequential API interaction", function () {
        var artist = "Notorious B.I.G.";
        return chakram.get("https://api.spotify.com/v1/search?q="+artist+"&type=artist")
            .then(function (searchResponse) {
                var bigID = searchResponse.body.artists.items[0].id;
                return chakram.get("https://api.spotify.com/v1/artists/"+bigID+"/top-tracks?country=GB");
            })
            .then(function (topTrackResponse) {
                var topTrack = topTrackResponse.body.tracks[0];
                expect(topTrack.name).to.contain("Old Thing Back");
            });
    });
});