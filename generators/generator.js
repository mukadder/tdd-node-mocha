/**
 * Created by mukadder on 2/26/17.
 */
/*
 Generators
 Custom iterators and iterables are useful, but are complicated to build, since you need to take care of the internal state. A generator is a special function that allows you to write an algorithm that maintains its own state. They are factories for iterators. A generator function is a function marked with the * and has at least one yield-statement in it.
 */

function* generateNumbers(){
    let index = 0;
    while(true)
        yield index++;
}

let sequence = generateNumbers(); //no execution here, just getting a generator

for(let i=0;i<5;i++){
    console.log(sequence.next());
}