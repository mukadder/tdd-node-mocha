/**
 * Created by mukadder on 3/8/17.
 */
/**
 * mysql
 */

var mysql = require('mysql');

var connectionConfig = {
    host: 'jdbc:mysql://138.197.9.155:3306',
    user: 'kcusername2',
    password: 'kcpassword2',
    database: 'kualicoeusdb2'
};

var connection = mysql.createConnection(connectionConfig);


connection.connect(function(err) {
    console.log('connection::connected');
});

connection.query('SELECT * FROM award', function(err, rows, fields) {
    if (err) throw err;

    rows.forEach(function(row) {
        console.log(row.award_number, row.document_number);
    });
});



connection.end(function(err) {
    console.log('connection::end');
});