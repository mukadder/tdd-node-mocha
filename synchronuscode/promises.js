publishLevel(12, {data: true}).then(function(level_result) {
    console.log(level_result);
});

function publishLevel(user_id, level_data, cb) {
    var user = null;
    return getUser(user_id).then(function(_user) {
        user = _user;
        return canCreate(_user);
    }).then(function(can_create) {
        if (!can_create) {
            return null;
        }

        return saveLevel(user, level_data);
    });
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