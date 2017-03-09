/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Module dependencies.http://sahatyalkabov.com/jsrecipes/#!/backend/sign-in-with-facebook
 */

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var userSchema = new mongoose.Schema({
    facebook: String,
    accessToken: String,
    email: String,
    firstName: String,
    lastName: String,
    profileUrl: String,
    gender: String,
    picture: String,
});

var User = mongoose.model('User', userSchema);

passport.use(new FacebookStrategy({
        clientID: '694945890549183',
        clientSecret: '6fbf2eade4e7d72f72ff12a30e2c72cd',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ facebook: profile.id }, function(err, existingUser) {
            if (existingUser) {
                return done(null, existingUser);
            }
            var user = new User({
                facebook: profile.id,
                accessToken: accessToken,
                email: profile._json.email,
                profileUrl: profile.profileUrl,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                gender: profile._json.gender,
                picture: 'https://graph.facebook.com/' + profile.id + '/picture?width=9999&height=9999'
            });
            user.save(function(err) {
                done(err, user);
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

mongoose.connect('localhost');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function(req, res) {
    res.render('index', {
        user: req.user
    });
});

app.get('/login', function(req, res) {
    res.render('login', {
        user: req.user
    });
});

app.get('/me', ensureAuthenticated, function(req, res) {
    res.render('me', {
        user: req.user
    });
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/' }));

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}