'use strict';

const express = require('express');
const jwt = require('jwt-simple');
const Promise = require('bluebird');
const User = require('../models/user');
const securityConfig = require('../config/security-config');

const router = express.Router();

router.post('/login', function(req, res) {
    const {username, password} = req.body;
    Promise.coroutine(function* () {
        const user = yield User.where('username', username).fetch();
        const isValidPassword = yield user.validPassword(password);
        if (isValidPassword) {
            const token = jwt.encode(user.omit('password'), securityConfig.jwtSecret);
            res.json({success: true, token: `JWT ${token}`});
        } else {
            res.json({success: false, msg: 'Authentication failed'});
        }
    })().catch(err => console.log(err));
});

router.post('/register', function(req, res) {
    const {username, password} = req.body;
    User.forge({username, password}).save()
        .then(user => res.json(user.omit('password')));
});

module.exports = router;