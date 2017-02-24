/**
 * Created by mukadder on 2/24/17.
 */
/*
 Async / Await is amazing, the mecca of working with asynchronous code in JavaScript. Personally I think it’s a shame we got Generators in ES6 instead of this. The solution is so eloquent that it will forever change the way we write JavaScript.

 Internally it works with Promises. When the promise returned by an await resolves the code in the function will continue executing, and the resolved value will be provided.
 */

publishLevel(12, {data: true}).then(function(level_data) {
    console.log(level_data);
});

async function publishLevel(user_id, level_data) {
    var user = await getUser(user_id);
    var can_create = await canCreate(user);

    if (!can_create) {
        return null;
    }

    var level = await saveLevel(user, level_data);

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