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
describe("Dweet API", function() {

    var namedDweetPost, initialDweetData, specifiedThingName;

    before("Initialize a new dweet thing for the tests", function () {
        specifiedThingName = 'chakram-test-thing';
        initialDweetData = {
            description: "test sending a string",
            sensorValue: 0.2222,
            alert: true
        };
        namedDweetPost = chakram.post("https://dweet.io/dweet/for/"+specifiedThingName, initialDweetData);
    });

    it("should return 200 on success", function () {
        return expect(namedDweetPost).to.have.status(200);
    });

    it("should specify success in the response 'this' field", function () {
        return expect(namedDweetPost).to.have.json('this', 'succeeded');
    });

    it("should respond with the created dweet's data", function () {
        return expect(namedDweetPost).to.have.json('with.content', initialDweetData);
    });

    it("should use a dweet thing name if provided", function () {
        return expect(namedDweetPost).to.have.json('with.thing', specifiedThingName);
    });

    it("should allow retrieval of the last data point", function () {
        var dataRetrieval = chakram.get("https://dweet.io/get/latest/dweet/for/"+specifiedThingName);
        return expect(dataRetrieval).to.have.json('with[0].content', initialDweetData);
    });

    it("should respond with data matching the dweet schema", function () {
        var expectedSchema = {
            type: "object",
            properties: {
                this: {type: "string"},
                by: {type: "string"},
                the: {type: "string"},
                with: {
                    type: "object",
                    properties: {
                        thing: {type: "string"},
                        created: {type: "string"},
                        content: {type: "object"}
                    },
                    required: ["thing", "created", "content"]
                }
            },
            required: ["this", "by", "the", "with"]
        };
        return expect(namedDweetPost).to.have.schema(expectedSchema);
    });

    describe("anonymous thing name", function () {

        var generatedThingName, anonymousDweetPost;

        before(function () {
            anonymousDweetPost = chakram.post("https://dweet.io/dweet", initialDweetData);
            return anonymousDweetPost.then(function(respObj) {
                generatedThingName = respObj.body.with.thing;
            });
        });

        it("should succeed without a specified thing name, generating a random dweet thing name", function () {
            expect(anonymousDweetPost).to.have.status(200);
            expect(anonymousDweetPost).to.have.json('this', 'succeeded');
            return chakram.wait();
        });

        it("should allow data retrieval using the generated thing name", function () {
            var data = chakram.get("https://dweet.io/get/latest/dweet/for/"+generatedThingName);
            return expect(data).to.have.json('with', function (dweetArray) {
                expect(dweetArray).to.have.length(1);
                var dweet = dweetArray[0];
                expect(dweet.content).to.deep.equal(initialDweetData);
                expect(dweet.thing).to.equal(generatedThingName);
            });
        });
    });


});

describe("Spotify API", function() {

    before(function () {
        var spotifyErrorSchema = {
            properties: {
                error: {
                    properties: {
                        status: {type: "integer"},
                        message: {type: "string"}
                    },
                    required: ["status", "message"]
                }
            },
            required: ["error"]
        };

        chakram.addProperty("spotify", function(){});
        chakram.addMethod("error", function (respObj, status, message) {
            expect(respObj).to.have.schema(spotifyErrorSchema);
            expect(respObj).to.have.status(status);
            expect(respObj).to.have.json('error.message', message);
            expect(respObj).to.have.json('error.status', status);
        });
        chakram.addMethod("limit", function (respObj, topLevelObjectName, limit) {
            expect(respObj).to.have.schema(topLevelObjectName, {
                required: ["limit", "items"],
                properties: {
                    limit: {minimum:limit, maximum:limit},
                    items: {minItems: limit, maxItems: limit}
                }
            });
        });
    });


    describe("Search Endpoint", function () {
        var randomArtistSearch;

        before(function () {
            randomArtistSearch = chakram.get("https://api.spotify.com/v1/search?q=random&type=artist");
        });


        it("should require a search query", function () {
            var missingQuery = chakram.get("https://api.spotify.com/v1/search?type=artist");
            return expect(missingQuery).to.be.spotify.error(400, "No search query");
        });

        it("should require an item type", function () {
            var missingType = chakram.get("https://api.spotify.com/v1/search?q=random");
            return expect(missingType).to.be.spotify.error(400, "Missing parameter type");
        });

        var shouldSupportItemType = function (type) {
            it("should support item type "+type, function () {
                var typeCheck = chakram.get("https://api.spotify.com/v1/search?q=random&type="+type);
                return expect(typeCheck).to.have.status(200);
            });
        };

        shouldSupportItemType('artist');
        shouldSupportItemType('track');
        shouldSupportItemType('album');
        shouldSupportItemType('playlist');

        it("should throw an error if an unknown item type is used", function () {
            var missingType = chakram.get("https://api.spotify.com/v1/search?q=random&type=invalid");
            return expect(missingType).to.be.spotify.error(400, "Bad search type field");
        });

        it("should by default return 20 search results", function () {
            return expect(randomArtistSearch).to.have.limit("artists", 20);
        });

        it("should support a limit parameter", function () {
            var one = chakram.get("https://api.spotify.com/v1/search?q=random&type=artist&limit=1");
            expect(one).to.have.limit("artists", 1);
            var fifty = chakram.get("https://api.spotify.com/v1/search?q=random&type=artist&limit=50");
            expect(fifty).to.have.limit("artists", 50);
            return chakram.wait();
        });

        it("should support an offset parameter", function () {
            var first = chakram.get("https://api.spotify.com/v1/search?q=random&type=artist&limit=1");
            var second = chakram.get("https://api.spotify.com/v1/search?q=random&type=artist&limit=1&offset=1");
            expect(first).to.have.json("artists.offset", 0);
            expect(second).to.have.json("artists.offset", 1);
            return chakram.all([first,second]).then(function(responses) {
                expect(responses[0].body.artists.items[0].id).not.to.equal(responses[1].body.artists.items[0].id);
                return chakram.wait();
            });
        });

        it("should only support GET calls", function () {
            this.timeout(4000);
            expect(chakram.post("https://api.spotify.com/v1/search")).to.have.status(405);
            expect(chakram.put("https://api.spotify.com/v1/search")).to.have.status(405);
            expect(chakram.delete("https://api.spotify.com/v1/search")).to.have.status(405);
            expect(chakram.patch("https://api.spotify.com/v1/search")).to.have.status(405);
            return chakram.wait();
        });

        it("should return href, id, name and popularity for all found artists", function () {
            return expect(randomArtistSearch).to.have.schema('artists.items', {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        href: {type: "string"},
                        id: {type: "string"},
                        name: {type: "string"},
                        popularity: {type: "integer"}
                    },
                    required: ["href", "id", "name", "popularity"]
                }
            });
        });
    });
});


