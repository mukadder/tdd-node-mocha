/**
 * Created by mukadder on 3/8/17.
 */
// shuffle
function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

let numbers = [1, 2, 3, 4]; // [1, 2, 3, 4]
let transform = shuffle(numbers); // [2, 4, 1, 3]

// randomAndPickOne
function randomAndPickOne(arrays) {
    return arrays[Math.floor(Math.random() * arrays.length)];
}

let numbers = [1, 2, 3, 4]; // [1, 2, 3, 4]
let transform = randomAndPickOne(numbers); // 2

// removeValueOfArrays
function removeValueOfArrays(arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

let strings = ['cat', 'dog']; // ['cat', 'dog']
let transform = removeValueOfArrays(strings, 'cat'); // ['dog']

// range
function rangeString(first, last) {
    var a = first.charCodeAt(0)
    var b = last.charCodeAt(0) + 1
    return Array.apply(null, {
        length: Math.abs(b - a)
    })
        .map(function(x, i) {
            return String.fromCharCode(Math.min(a, b) + i)
        });
}

function rangeNumber(start, last) {
    let numbers = [];
    for (let i = start; i <= last; i++) {
        numbers.push(i);
    }
    return numbers;
}

let AZ = rangeString('a', 'z') // ['a', ..... 'z']
let AZ = rangeNumber(1, 10) // [1, ..... 10]