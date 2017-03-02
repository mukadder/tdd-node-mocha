/**
 * Created by mukadder on 3/2/17.
 */
function* interrogate() {
    const name = yield "What is your name?";
    const color = yield "What is your favorite color?";
    return `${name}'s favorite color is ${color}.`;
}
const it = interrogate();
it.next();         // { value: "What is your name?", done: false }
it.next('Ethan');  // { value: "What is your favorite color?", done: false }
it.next('orange'); // { value: "Ethan's favorite color is orange.", done: true }
/*
 The yield statement by itself doesn’t end a generator, even if it’s the last statement in the generator. Calling return from anywhere in the generator will result in done being true, with the value property being whatever you returned. For example:
 */

function* abc() {
    yield 'a';
    yield 'b';
    return 'c';
}

const it = count();
it.next();  // { value: 'a', done: false }
it.next();  // { value: 'b', done: false }
it.next();  // { value: 'c', done: true }
