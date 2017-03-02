function sum(arr, f) {
    // if no function is supplied, use a "null function" that
    // simply returns its argument unmodified
    if(typeof f != 'function') f = x => x;

    return arr.reduce((a, x) => a += f(x), 0);
}
sum([1, 2, 3]);                        // returns 6
sum([1, 2, 3], x => x*x);              // returns 14
sum([1, 2, 3], x => Math.pow(x, 3));   // returns 36/**
function sumOfSquares(arr) {
    return sum(arr, x => x*x);
}
function newSummer(f) {
    return arr => sum(arr, f);
}

const sumOfSquares = newSummer(x => x*x);
const sumOfCubes = newSummer(x => Math.pow(x, 3));
sumOfSquares([1, 2, 3]);   // returns 14
sumOfCubes([1, 2, 3]);     // returns 36