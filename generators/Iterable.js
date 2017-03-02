/**
 * Created by mukadder on 2/26/17.
 */
/*
 Iterables
 An iterable is an object that defines
 its iteration behavior.
 The for..of loop can loop over any iterable. Built-in Javascript objects such as Array and Map are iterables and can thus be looped over by the for..of construct. But we can also create our own iterables. To do that we must define a method on the object called @@iterator or, more conveniently, use the Symbol.iterator as the method name:
 */
// now iterable s an object which can be lloped ofer by for of loop
// it has a method whose name is Symbol.iterator

let iterableUser = {
    name: 'kenneth',
    lastName: 'truyers',
    [Symbol.iterator]: function*(){
        yield this.name;
        yield this.lastName;
    }
}

// logs 'kenneth' and 'truyers'
for(let item of iterableUser){
    console.log(item);
}