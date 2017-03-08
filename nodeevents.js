/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Custom Events
 */

var events = require('events'),
    emitter = new events.EventEmitter();

function doATask(status) {
    if (status === 'success') {
        emitter.emit('taskSuccess'); // Specific event
    } else if (status === 'fail') {
        emitter.emit('taskFail');
    }
    // This event passes arguments to detail status
    emitter.emit('taskComplete', 'complete', status);
}
emitter.on('newListener', function(){
    console.log('a new listener was added');
});
emitter.on('taskSuccess', function() {
    console.log('task success!');
});

emitter.on('taskFail', function() {
    console.log('task fail');
});

// register listener for task complete
emitter.on('taskComplete', function(type, status) {
    console.log('the task is ', type, ' with status ', status);
});

// call task with success status
setTimeout(doATask, 2e3, 'success');

// set task to fail
setTimeout(doATask, 4e3, 'fail');
