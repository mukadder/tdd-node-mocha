//http://www.mattgreer.org/articles/promises-in-wicked-detail/
doSomething(function(value) {
    console.log('Got a value:' + value);
});/**
 * Created by mukadder on 2/24/17.
 */
doSomething().then(function(value) {
    console.log('Got a value:' + value);
});
//To do this, we just need to change doSomething() from this

function doSomething(callback) {
    var value = 42;
    callback(value);
}
//o this “promise” based solution


function doSomething() {
    return {
        then: function(callback) {
            var value = 42;
            callback(value);
        }
    };
}
//This is just a little sugar for the callback pattern. It’s pretty pointless sugar so far. But it’s a start and yet we’ve already hit upon a core idea behind promises

function Promise(fn) {
    var callback = null;
    this.then = function(cb) {
        callback = cb;
    };

    function resolve(value) {
        callback(value);
    }

    fn(resolve);
}
function doSomething() {
    return new Promise(function(resolve) {
        var value = 42;
        resolve(value);
    });
}
//There is a problem here. If you trace through the execution, you’ll see that resolve() gets called before then(), which means callback will be null. Let’s hide this problem in a little hack involving setTimeout
function Promise(fn) {
    var callback = null;
    this.then = function(cb) {
        callback = cb;
    };

    function resolve(value) {
        // force callback to be called in the next
        // iteration of the event loop, giving
        // callback a chance to be set by then()
        setTimeout(function() {
            callback(value);
        }, 1);
    }

    fn(resolve);
}
/*
 This Code is Brittle and Bad
 Our naive, poor promise implementation must use asynchronicity to work. It’s easy to make it fail again, just call then() asynchronously and we are right back to the callback being null again. Why am I setting you up for failure so soon? Because the above implementation has the advantage of being pretty easy to wrap your head around. then() and resolve() won’t go away. They are key concepts in promises.

 Promises have State
 Our brittle code above revealed something unexpectedly. Promises have state. We need to know what state they are in before proceeding, and make sure we move through the states correctly. Doing so gets rid of the brittleness.

 A promise can be pending waiting for a value, or resolved with a value.
 Once a promise resolves to a value, it will always remain at that value and never resolve again.
 (A promise can also be rejected, but we’ll get to error handling later)

 Let’s explicitly track the state inside of our implementation, which will allow us to do away with our hack


 */
function Promise(fn) {
    var state = 'pending';
    var value;
    var deferred;

    function resolve(newValue) {
        value = newValue;
        state = 'resolved';

        if(deferred) {
            handle(deferred);
        }
    }

    function handle(onResolved) {
        if(state === 'pending') {
            deferred = onResolved;
            return;
        }

        onResolved(value);
    }

    this.then = function(onResolved) {
        handle(onResolved);
    };

    fn(resolve);
}