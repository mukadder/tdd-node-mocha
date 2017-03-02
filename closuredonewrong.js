console.log('CLOSURES DONE WRONG');

function createClosureArray() {
    var badArr = [];

    for (var index = 0; index < 10; index++) {
        badArr[index] = function () {
            return 'n = ' + index;
        };
    }
    return badArr;
}

var badArr = createClosureArray();

for (var index in badArr) {
    console.log(badArr[index]());
}/**
 * Created by mukadder on 2/28/17.
 */
