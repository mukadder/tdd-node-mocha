/**
 * Created by mukadder on 3/8/17.
 */
let choicesKey = ['a', 'b', 'c', 'd'];
let max = 9;

function* random (max) {
    yield Math.floor(Math.random() * max) + 1;
}

function singleRandom (max) {
    return Math.floor(Math.random() * max) + 1;
}

function* randomMath () {
    while (true) {
        yield* random(max);
    }
}

function* randomOperator () {
    while (true) {
        yield operators[Math.floor(Math.random() * operators.length)];
    }
}
let answer = Math.floor(eval(variableB + operatorA + variableA)); // 5 + 5 = _ ?
let ques = `${variableA} ${operatorA} ${variableB} = _ ?` // 10