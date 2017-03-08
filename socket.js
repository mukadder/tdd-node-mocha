/**
 * Created by mukadder on 3/8/17.
 */
var net = require('net');

var PORT = 8181;

var server = net.Server(connectionListener);

function connectionListener(conn) {
    conn.on('readable', function() {
        //buffer
        var buf = conn.read();
        if (Buffer.isBuffer(buf)) {
            console.log('readable buffer: ' , buf);
            conn.write('from server');
        }
    });

    conn.on('end', function() {
    });
}

server.listen(PORT);

//Connect a socket
var socket = net.createConnection(PORT);

socket.on('data', function(data) {
    console.log('data recieved: ',  data.toString());
});

socket.on('connect', function() {
    socket.end('My Precious');
});

for (var i = 0; i < 20; i++) {
    socket.write('buffer');
}

socket.on('end', function() {
});

socket.on('close', function() {
    server.close();
});
