//https://thomashunter.name/blog/the-long-road-to-asyncawait-in-javascript/

publishLevel(12, {data: true}, function(level_result) {
    console.log(level_result);
});

function publishLevel(user_id, level_data, cb) {
    getUser(user_id, function(user) {
        canCreate(user, function(can_create) {
            if (!can_create) {
                return cb(null);
            }
            saveLevel(user, level_data, function(level) {
                cb(level);
            });
        });
    });
}

function getUser(user_id, cb) {
    setTimeout(function() {
        cb({
            id: user_id,
            nickname: 'tlhunter'
        });
    }, 100);
}

function canCreate(user, cb) {
    setTimeout(function() {
        cb(user.id === 12);
    }, 100);
}

function saveLevel(user, data, cb) {
    setTimeout(function() {
        cb({
            id: 100,
            owner: user.nickname,
            data: data
        });
    }, 100);
}