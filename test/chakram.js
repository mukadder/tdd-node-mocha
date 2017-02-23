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
describe("Random User API", function() {
    var apiResponse;

    before(function () {
        apiResponse = chakram.get("http://api.randomuser.me/0.6?gender=female");
        return apiResponse;
    });

    it("should return 200 on success", function () {
        return expect(apiResponse).to.have.status(200);
    });

    it("should return content type and server headers", function () {
        expect(apiResponse).to.have.header("server");
        expect(apiResponse).to.have.header("content-type", /text/);
        return chakram.wait();
    });

    it("should include email, username, password and phone number", function () {
        return expect(apiResponse).to.have.schema('results[0].user', {
            "required": [
                "email",
                "username",
                "password",
                "phone"
            ]
        });
    });

    it("should return a female user", function () {
        return expect(apiResponse).to.have.json('results[0].user.gender', 'female');
    });

    it("should return a valid email address", function () {
        return expect(apiResponse).to.have.json(function(json) {
            var email = json.results[0].user.email;
            expect(/\S+@\S+\.\S+/.test(email)).to.be.true;
        });
    });

    it("should return a single random user", function () {
        return expect(apiResponse).to.have.schema('results', {minItems: 1, maxItems: 1});
    });

    it("should not be gzip compressed", function () {
        return expect(apiResponse).not.to.be.encoded.with.gzip;
    });

    it("should return a different username on each request", function () {
        this.timeout(10000);
        var multipleResponses = [];
        for(var ct = 0; ct < 5; ct++) {
            multipleResponses.push(chakram.get("http://api.randomuser.me/0.6?gender=female"));
        }
        return chakram.all(multipleResponses).then(function(responses) {
            var returnedUsernames = responses.map(function(response) {
                return response.body.results[0].user.username;
            });
            while (returnedUsernames.length > 0) {
                var username = returnedUsernames.pop();
                expect(returnedUsernames.indexOf(username)).to.equal(-1);
            }
        });
    });
});