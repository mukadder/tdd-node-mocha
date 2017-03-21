/**
 * Created by mukadder on 3/21/17.
 */
var express = require('express')
var app = express()
var bodyParser= require('body-parser')
var organ = require('morgan')
var mongoose = require('mongoose')
var passport = require('passport')
// get the request paramete
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('dev)'))
app.use(passport.initialize())
app.get('/' ,function(req,res){
    res.send(""
    )
})