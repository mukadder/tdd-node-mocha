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
    const uri = 'http://jsonplaceholder.typicode.com/posts/1'
    const response = yield fetch(uri)
    const post = yield response.json()
    const title = post.title
    console.log('Tile:',title)
    console.log(response)
})