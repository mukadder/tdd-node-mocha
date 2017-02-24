/**
 * Created by mukadder on 2/24/17.
 */
var generator = publishLevel(12, {data: true});

generator.next().value.then(function(user) {
    return generator.next(user).value.then(function(can_create) {
        return generator.next(can_create).value.then(function(level_result) {
            console.log(level_result);
        });
    });
});

function * publishLevel(user_id, level_data) {
    var user = yield getUser(user_id);
    var can_create = yield canCreate(user);

    if (!can_create) {
        return null;
    }

    var level = yield saveLevel(user, level_data);

    return level;
}

function getUser(user_id) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve({
                id: user_id,
                nickname: 'tlhunter'
            });
        }, 100);
    });
}

function canCreate(user) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(user.id === 12);
        }, 100);
    });
}

function saveLevel(user, data) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve({
                id: 100,
                owner: user.nickname,
                data: data
            });
        }, 100);
    });
}
/*
 ES6 gives us Generator functions which we can yield. When a function yields it is temporarily paused while the caller gets to do something with the yielded value. These were designed with doing iteration-based tasks in mind, yielding simple values, but here we’re going to yield Promises!

 This is the first time we see code able to get executed in a different stack yet exist within the same function scope. Of course this new paradigm requires a new syntax. Generator functions have a * in their declaration, and we make use of the new yield keyword.

 These can be used for doing control flow, but it’s really intended for iteration work, as you’ll see in this next example where I run a whole bunch of ugly code to manually keep the generator alive:
 Notice this intimate knowledge we need to know about the function we’re calling! We take the result, pass it into another generator.next() call as an argument (this becomes the result of the yielded assignment).

 Objects returned by generators have a .next() method, with a .done and .value attribute. If done is true, then the generators work is finished (the final return), however if done is false then there’s more work to happen (the preceding yield’s). The calling function is given the intermediate yield values, and has to know to continue the execution of the generator. While this is great for doing iteration work, it’s tedious from the perspective of doing asynchronous control flow.


 */