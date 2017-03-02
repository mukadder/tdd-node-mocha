/**
 * Created by mukadder on 3/2/17.
 */
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }
    go() {
        const countdown = this;
        const timeoutIds = [];
        return new Promise(function(resolve, reject) {
            for(let i=countdown.seconds; i>=0; i--) {
                timeoutIds.push(setTimeout(function() {
                    if(countdown.superstitious && i===13) {
                        // clear all pending timeouts
                        timeoutIds.forEach(clearTimeout);
                        return reject(new Error("DEFINITELY NOT COUNTING THAT"));
                    }
                    countdown.emit('tick', i);
                    if(i===0) resolve();
                }, (countdown.seconds-i)*1000));
            }
        });
    }
}
const c2 = new Countdown(15, false)
    .on('tick', function(i) {              // note we can chain the call to 'on'
        if(i>0) console.log(i + '...');
    });

c2.go()
    .then(function() {
        console.log('GO!');
    })
    .catch(function(err) {
        console.error(err.message);
    })
function launch() {
    return new Promise(function(resolve, reject) {
        console.log("Lift off!");
        setTimeout(function() {
            resolve("In orbit!");
        }, 2*1000);    // a very fast rocket indeed
    });
}
const c = new Countdown(15)
    .on('tick', i => console.log(i + '...'));

c.go()
    .then(launch)
    .then(function(msg) {
        console.log(msg);
    })
    .catch(function(err) {
        console.error("Houston, we have a problem....");
    })

function addTimeout(fn, timeout) {
    if(timeout === undefined) timeout = 1000; // default timeout
    return function(...args) {
        return new Promise(function(resolve, reject) {
            const tid = setTimeout(reject, timeout,
                new Error("promise timed out"));
            fn(...args)
                .then(function(...args) {
                    clearTimeout(tid);
                    resolve(...args);
                })
                .catch(function(...args) {
                    clearTimeout(tid);
                    reject(...args);
                });
        });
    }
}
c2.go()
    .then(addTimeout(launch, 4*1000))
    .then(function(msg) {
        console.log(msg);
    })
    .catch(function(err) {
        console.error("Houston, we have a problem: " + err.message);
    });