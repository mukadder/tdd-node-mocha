console.log('CLOSURES DONE RIGHT');

var arr = [];

function createClosure(n) {
    return function () {
        return 'n = ' + n;
    }
}

for (var index = 0; index < 10; index++) {
    arr[index] = createClosure(index);
}

for (var index in arr) {
    console.log(arr[index]());
}/**
 * Created by mukadder on 2/28/17.
 */
