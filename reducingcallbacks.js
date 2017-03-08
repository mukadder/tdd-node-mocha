/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Reducing callbacks
 */

var initialize = function() {
    retrieveCart(function(err, data) {
        if (err) console.log(err);
        // manipulate data
        data['new'] = 'other thing';
        // upload modified data
        updateCart(data, function(err, result) {
            if (err) console.log(err);
            // send results to client
            sendResults(result, function(err, status) {
                if (err) console.log(err);
                console.log(status);
                console.timeEnd('metrics');
            });
        });
    });
};

// simulated call to a database
var retrieveCart = function(callback) {
    var data = { item: 'thing' };
    return callback(null, data );
};
// simulated call to a database
var updateCart = function(data, callback) {
    return callback(null, data);
};

var sendResults = function(data, callback) {
    console.log(data);
    return callback(null, 'Cart Updated');
};

console.time('metrics');
initialize();