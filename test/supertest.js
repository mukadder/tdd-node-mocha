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
