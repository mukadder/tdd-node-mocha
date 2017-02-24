/*function* count(n) {
    let current = 0;

    while (current >= 0) {
        current += 1;
        yield current;
    }
}

const myCount = count();
console.log(myCount.next().value);
console.log(myCount.next().value);
console.log(myCount.next().value);
console.log(myCount.next().done);*/ // false  /**
/*
 Generator functions are iterable iterators, which is a fancy way of saying that generator functions return a Generator object with a next() method and developers can use for of loops on Generators.
  Generator functions are not inherently asynchronous. Generator functions do however provide a mechanism for "pausing" a function.
 generator functions are created with a function* syntax
 generator functions return an object with a next() method
 the result of .next() has a value property and a boolean done property
 there is a special keyword yield
 yield produces or "yields" the next().value
 What's not necessarily obvious is how yield pauses the function, or "yields" control. Consider the following extra simple example:

 */
/*

function* count(n) {
    yield 1;
    console.log('test');
    yield 2;
}

const myCount1 = count();
console.log(myCount1.next().value);
console.log(myCount1.next().value);
const lastNext = myCount1.next();
console.log(lastNext.value);
console.log(lastNext.done); // false
//Using yield to Fake Synchronous Flow

Artist.findByID(id).then((artist) => {
    artist.getSongs().then((songs) => {
    console.log(songs);
});
});
transforms into

let artist = yield Artist.findByID(id);
let songs = yield artist.getSongs();
console.log(songs);*/
function *myGenerator() {
    console.log(1);
    let a = yield 'first yield';
    console.log(a); // 2
    let b = yield 'second yield';
    console.log(b); // 3
    return 'hi';
}

let iterator = myGenerator();
let firstYield = iterator.next(); // { value: 'first yield', done: false }
let secondYield = iterator.next(2); // { value: 'second yield', done: false }
let generatorReturnValue = iterator.next(3); // { value: 'hi', done: true }let generatorReturnValue = iterator.next(3); // { value: 'hi', done: true }/ { value: 'first yield', done: false }
console.log(secondYield)