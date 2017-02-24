// Read all files in the folder in parallel.
    var fs = require("fs");

fs.readdir( ".", function( err, files) {
    if ( err ) {
        console.log("Error reading files: ", err);
    } else {
        // keep track of how many we have to go.
        var remaining = files.length;
        var totalBytes = 0;

        if ( remaining == 0 ) {
            console.log("Done reading files. totalBytes: " +
                totalBytes);
        }

        // for each file,
        for ( var i = 0; i < files.length; i++ ) {
            // read its contents.
            fs.readFile( files[i], function( error, data ) {
                if ( error ) {
                    console.log("Error: ", error);
                } else {
                    totalBytes += data.length
                    console.log("Successfully read a file.");
                }
                remaining -= 1;
                if ( remaining == 0 ) {
                    console.log("Done reading files. totalBytes: " +
                        totalBytes);
                }
            });
        }
    }
});/**
 * Created by mukadder on 2/23/17.
 */
