/**
 * Created by mukadder on 3/2/17.
 */
const book = [
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
    "Up above the world you fly,",
    "Like a tea tray in the sky.",
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
];
const it = book.values();
let current = it.next();
while(!current.done) {
    console.log(current.value);
    current = it.next();
}
const it1 = book.values();
const it2 = book.values();
// neither iterator have started

// read two pages with it1:
it1.next();  // { value: "Twinkle, twinkle, little bat!", done: false }
it1.next();  // { value: "How I wonder what you're at!", done: false }

// read one page with it2:
it2.next();  // { value: "Twinkle, twinkle, little bat!", done: false }

// read another page with it1:
it1.next();  // { value: "Up above the world you fly,", done: false }

class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({ message, timestamp: Date.now() });
    }
}
/*
 So far, so good…but what if we want to then iterate over the entries in the log? We could, of course, access log.messages, but wouldn’t it be nicer if we could treat log as if it were directly iterable, just like an array? The iteration protocol allows us to make this work. The iteration protocol says that if your class provides a symbol method Symbol.iterator that returns an object with iterator behavior (i.e., it has a next method that returns an object with value and done properties), it is then iterable! Let’s modify our Log class to have a Symbol.iterator method:


 */
class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({ message, timestamp: Date.now() });
    }
    [Symbol.iterator]() {
        return this.messages.values();
    }
}
const log = new Log();
log.add("first day at sea");
log.add("spotted whale");
log.add("spotted another vessel");
//...

// iterate over log as if it were an array!
for(let entry of log) {
    console.log(`${entry.message} @ ${entry.timestamp}`);
}