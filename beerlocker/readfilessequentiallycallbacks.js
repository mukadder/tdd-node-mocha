/**
 * Created by mukadder on 2/23/17.
 */
// Read all the files in the folder in sequence, using callbacks
var fs = require("fs");

fs.readdir( ".", function( error, files ) {
    if ( error ) {
        console.log("Error listing file contents.");
    } else {
        var totalBytes = 0;

        // This function repeatedly calls itself until the files are all read.
        var readFiles = function(index) {
            if ( index == files.length ) {
                // we are done.
                console.log( "Done reading files. totalBytes = " +
                    totalBytes );
            } else {

                fs.readFile( files[index], function( error, data ) {
                    if ( error ) {
                        console.log( "Error reading file. ", error );
                    } else {
                        totalBytes += data.length;
                        readFiles(index + 1);
                    }
                });
            }

        };

        readFiles(0);
    }
});