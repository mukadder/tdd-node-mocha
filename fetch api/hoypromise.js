
const fetchSomething = () => new Promise((resolve) => {
    setTimeout(() => resolve('future value'), 500);
});

const promiseFunc = () => new Promise((resolve) => {
    fetchSomething().then(result => {
        resolve(result + ' 2');
    });
});

promiseFunc().then(res => console.log(res));
/**
 * Created by mukadder on 2/24/17.


const fetchSomething2 = () => new Promise((resolve) => {
    setTimeout(() => resolve('future value'), 500);
});

async function asyncFunction() {
    const result = await fetchSomething2(); // returns promise

    // waits for promise and uses promise result
    return result + ' 2';
}

asyncFunction().then(result => console.log(result));
 */
function* foo() {
    yield 'a';
    yield 'b';
    yield 'c';
}
for (const val of foo()) {
    console.log(val);
}
// a
// b
// c

const [...values] = foo();
console.log(values); // ['a','b','c']
function* crossBridge() {
    const reply = yield 'What is your favorite color?';
    console.log(reply);
    if (reply !== 'yellow') return 'Wrong!'
    return 'You may pass.';
}

{
    const iter = crossBridge();
    const q = iter.next().value; // Iterator yields question
    console.log(q);
    const a = iter.next('blue').value; // Pass reply back into generator
    console.log(a);
}

// What is your favorite color?
// blue
// Wrong!


{
    const iter = crossBridge();
    const q = iter.next().value;
    console.log(q);
    const a = iter.next('yellow').value;
    console.log(a);
}
const gensync = (fn) =>
    (...args) => new Promise(resolve => {
        next(fn(...args), val => resolve(val));
    });


const fetchSomething2 = () => new Promise((resolve) => {
    setTimeout(() => resolve('future value'), 500);
});

const asyncFunc = gensync(function* () {
    const result = yield fetchSomething2(); // returns promise

    // waits for promise and uses promise result
    yield result + ' 2';
});

// Call the async function and pass params.
asyncFunc('param1', 'param2', 'param3')
    .then(val => console.log(val));
// What is your favorite color?
// yellow
// You may pass.