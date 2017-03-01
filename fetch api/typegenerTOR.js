

function *createStep() {
    console.log('log begin')
    yield 'first'
    console.log('log middle')
    yield 'second'
    console.log('log end')
    yield 'third'
}
var step = createStep()
step.next() // returns { value: 'first', done: false }
// log begin
step.next() // returns { value: 'second', done: false }
// log middle
step.next() // returns { value: 'third', done: true }
for (var step of createStep()) {
    console.log(step.value) // first, second, third
}
function run(generator) {
    var data = null, yielded = false
    var iterator = generator(function() {
        data = arguments
        check()
    })
    yielded = !!(iterator.next())
    check()
    function check() {
        while (data && yielded) {
            var err = data[0], item = data[1]
            data = null
            yielded = false
            if (err) return iterator.throw(err)
            yielded = !!(iterator.next(item))
        }
    }
}
run(function*(resume) {
    try {
        var lstat = yield fs.lstat('big.file', resume)
    } catch (err) {
        console.error('File does not exist: ', err)
    }
    var contents = yield fs.readFile('big.file', resume)
    var uppercased = contents.toString().toUpperCase()
    yield fs.writeFile('uppercased.file', uppercased, resume)
    console.log('All done!')
})

var fs = require('fs-promise')

new Array([
    fs.writeFile('first.file', '1'),
    fs.writeFile('second.file', '2'),
    fs.writeFile('third.file', '3'),
]).reduce(function(current, next) {
    return current.then(next)
}, Promise.resolve()).then(function() {
    console.log('All done!')
})

var fs = require('fs-promise')
var request = require('request')

Promise.all([
    fs.readFile('one.file'),
    new Promise(function(resolve, reject) {
            request('http://example.com/two.file', function(err, response, body) {
                if (err) reject(err)
                resolve(body)
            })
        },
        fs.readFile('three.file'),
]).then(function(files) {
    console.log('Got ' + files.length + ' files')
})
var fs = require('fs-promise')

fs.lstat('big.file').then(function(stat) {
    return fs.readFile('big.file') // file exists, read a file and return the promise
}).then(function(contents) {
    // The contents argument here is from the promise
    // returned in the previous callback
    var uppercased = contents.toString().toUpperCase()
    return fs.writeFile('uppercased.file', uppercased)
}).then(function() {
    console.log('All done!')
}).catch(function(err) {
    console.error(err)
})
var fs = require('fs')
var request = require('request')

function readFiles(done) {
    var files = []
    var count = 3
    function next(err, contents) {
        files.push(contents.toString())
        if (count < 1) done(files)
    }
    // Read 2 files and request 1 from a remote server
    fs.readFile('one.file', next)
    request('http://example.com/two.file', function(err, response, body) {
        next(err, body)
    })
    fs.readFile('three.file', next)
}

readFiles(function(files) {
    console.log('Got ' + files.length + ' files')
})