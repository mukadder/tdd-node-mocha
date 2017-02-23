'use strict';
var supertest = require('supertest-as-promised');
var request = supertest('https://ngcourse.herokuapp.com');
var assert = require('chai').assert;

describe('Backend API', function() {
    it ('should return the list of users', function() {
        return request.get('/api/v1/users')
            .expect(200);
    });
});/**
 * Created by mukadder on 2/23/17.
 */
var nock = require("nock");
var http = require("http");

var api = nock("http://javascriptplayground.com")
    .get("/test/")
    .reply(200, "Hello World");

http.get("http://javascriptplayground.com/test/", function(resp) {
    var str = "";
    resp.on("data", function(data) { str += data; });
    resp.on("end", function() {
        console.log("Got Result: ", str);
    });
});