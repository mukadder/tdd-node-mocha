Asynchronous Iteration Patterns In Node.js

Some patterns are hard to grasp, specially when programming asynchronously like you have to when you’re doing IO on node.js.

For example, let’s suppose you had to program the following routine:

Insert a collection of objects on the database and then, when finished, call a callback. So, if you had to write this in a synchronous fashion you would do something like this:

function insertCollection(collection) {
for(var i = 0; i < collection.length; i++) {
db.insert(collection[i]);
}
}
So, since we are using node.js, db.insert is most probably asynchronous. We have to turn this into an asynchronous function.

I have seen some obviously wrong implentations like this one:

function insertCollection(collection, callback) {
for(var i = 0; i < collection.length; i++) {
db.insert(collection[i], function(err) {
if (err) {
throw err;
}
});
}
callback();
}
The problem with this one is obvious: callback is called right after launching all the db.inserts on the background, not leaving them a chance to finish. By the time callback gets called, none of the inserts has terminated.

Another approach would be this one:

function insertCollection(collection, callback) {
for(var i = 0; i < collection.length; i++) {
(function(i) {
db.insert(collection[i], function(err) {
if (err) {
callback(err);
return;
}
if (i == (collection.length - 1)) {
callback();
}
});
})(i);
}
}
So, there is some temptation to think “we have to call when the last insert calls back”, but this is plain wrong. The first insert can still be executing when the last one callsback. You never know.

I think that the safest approach is to do something like this:

function insertCollection(collection, callback) {
var inserted = 0;
for(var i = 0; i < collection.length; i++) {
db.insert(collection[i], function(err) {
if (err) {
callback(err);
return;
}
if (++inserted == collection.length) {
callback();
}
});
}
}
You should only callback when all of the inserts have called back.

Serialization

Sometimes you want to control the flow and / or the order of the execution.

You may want the inserts to be perfectly ordered in this case, or you may want to stop inserting if an error occurs so you can recover more easily.

If that’s the case, you can do something like this:

function insertCollection(collection, callback) {
var coll = collection.slice(0); // clone collection
(function insertOne() {
var record = coll.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
db.insert(record, function(err) {
if (err) { callback(err); return }
if (coll.length == 0) {
callback();
} else {
insertOne();
}
}
})();
}
Here we are using tail recursion to keep inserting the records.

This example has one problem: it uses the stack, so if collection os too big, you might end blowing up the stack.

One solution to this problem is to abandon the stack when recursing. And you can do it using a setTimeout with the timeout value of 0. The makes the inner function being called after the stack unwinds:

function insertCollection(collection, callback) {
var coll = collection.slice(0); // clone collection
(function insertOne() {
var record = coll.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
db.insert(record, function(err) {
if (err) { callback(err); return }
if (coll.length == 0) {
callback();
} else {
setTimeout(insertOne, 0);
}
}
})();
}
Follow-up

See the follow-up article Asynchronous iteration patterns in Node.js - part 2

Update:

Also (as pointed out by Tim Caswell), it’s important that no exceptions go back up into the event loop instead of ending up on the callback. So, you should wrap your db.insert or any other external function call. Our last example should then be:

function insertCollection(collection, callback) {
var coll = collection.slice(0); // clone collection
(function insertOne() {
var record = coll.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
try {
db.insert(record, function(err) {
if (err) { callback(err); return }
if (coll.length == 0) {
callback();
} else {
insertOne();
}
}
} catch (exception) {
callback(exception);
}
})();
}