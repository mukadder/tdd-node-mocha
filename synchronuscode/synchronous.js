var level_result = publishLevel(12, {data: true});
console.log(level_result);

function publishLevel(user_id, level_data) {
    var user = getUser(user_id);
    var can_create = canCreate(user);

    if (!can_create) {
        return null;
    }

    var level = saveLevel(user, level_data);

    return level;
}

function getUser(user_id) {
    return {
        id: user_id,
        nickname: 'tlhunter'
    };
}

function canCreate(user) {
    return user.id === 12;
}

function saveLevel(user, data) {
    return {
        id: 100,
        owner: user.nickname,
        data: data
    };
}