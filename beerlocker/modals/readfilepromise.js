var promise = doSomeAsynchronousOperation();
promise.then( function(result) {
    // yay! I got the result.
}, function(error) {
    // The promise was rejected with this error.
}

function doSomeAsynchronousOperation()
{
    var promise = new Promise.Promise();
    fs.readFile( "somefile.txt", function( error, data ) {
        if ( error ) {
            promise.reject( error );
        } else {
            promise.resolve( data );
        }
    });

    return promise;
}/**
 * Created by mukadder on 2/23/17.
 */


var Promise = require("promise");

// Wrap the io functions with ones that return promises.
var readdir_promise = Promise.convertNodeAsyncFunction(fs.readdir);
var readFile_promise = Promise.convertNodeAsyncFunction( fs.readFile );

p = readdir_promise( "." );
p.then( function( files ) {

    // Create an array of promises
    var promises = [];

    for ( var i = 0; i < files.length; i++ ) {
        promises.push( readFile_promise( files[i] ) );
    }

    Promise.all( promises ).then( function(results) {
        var totalBytes = 0;
        for ( i = 0; i < results.length; i++ ) {
            totalBytes += results[i].length;
        }
        console.log("Done reading files. totalBytes = " + totalBytes);
    }, function( error ) {
        console.log("Error reading files");
    });

}, function( error ) {
    console.log( "readdir failed.");

});

// Read all the files in the folder in a sequence, using Promises
var fs = require("fs");
var Promise = require("promise");
var PromiseSequence = require("./PromiseSequence").PromiseSequence;

// Wrap the io functions with ones that return promises.
var readdir_promise = Promise.convertNodeAsyncFunction(fs.readdir);
var readFile_promise = Promise.convertNodeAsyncFunction( fs.readFile );

var seq = new PromiseSequence();
var index = 0;
var totalBytes = 0;
var files = null;

seq.add( function() {
    return readdir_promise( "." );
});

seq.loop(
    // The "next" function of the loop takes the result of the readdir and
    // reads the file. It is executed when the loop is entered, and again after
    // each time the body is executed.
    function( files_arg ) {
        files = files_arg;
        if ( index == files.length ) {
            seq.exitLoop(totalBytes);
            return;
        } else {
            console.log("Reading file " + files[index]);
            return readFile_promise( files[index++] );
        }
    },

    // The "body" function of the loop is called with the result of the "next" function.
    // It simply sums the length of the file.
    function( contents ) {
        totalBytes += contents.length;
    }
);

seq.run().then( function(total) {
    console.log("Done reading file. Total bytes: " + total);
}, function(error) {
    console.log("Error reading files: ", error);
});