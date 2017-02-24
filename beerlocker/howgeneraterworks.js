/**
 * Created by mukadder on 2/24/17.
 */
const fetch = require('node-fetch')
// now bring in co
const co = require('co')
fetch('http://jsonplaceholder.typicode.com/posts/1')
.then(response => response.json())
.then(post => post.title)
.then(x => console.log('Tile:',x))
// this library is great
// all we need is co accepting generator as argument  than any time yield is incurred it gives control to co who resolves the promise and store into
// variable returned

co(function*() {
    // you can replace co with run and get same results
    const uri = 'http://jsonplaceholder.typicode.com/posts/1'
    const response = yield fetch(uri)
    const post = yield response.json()
    const title = post.title
    console.log('Tile:',title)
    console.log(response)
})

// now lets implement co  co is a beautiful library that abstracts away from you

function run (generator) {
    // this line gives u an iterator
    const iterator = generator()
    // this line starts the generator
    const iteration = iterator.next()
    // here we get promise object
    const promise = iteration.value
    // now execute then on promise and recurively drain all till done is false
    promise.then(x => {
        const anotherIteragtor = iterator.next(x)
        const anotherPromise= anotherIteragtor.value
        anotherPromise.then(y => iterator.next(y))
    })
}

