function generateRandomNumber () {
    return new Promise(function (resolve, reject) {
        var randomNumber = Math.floor((Math.random() * 10) + 1)
        if (randomNumber <= 5) {
            resolve(randomNumber)
        } else {
            reject(randomNumber)
        }
    })
}
const fetch = require('node-fetch')

generateRandomNumber().then(function(result) {
    console.log('Success: ' + result)
}).catch(function(error) {
    console.log('Error: ' + error)
})

// At this moment, promise is in progress
const fetchPromise = fetch('http://putaindecode.io')

// When promise is resolved, you go a value you can work with
const parsePromise = fetchPromise.then(fetchResult => {
    // I can return a new result that can be used as a new promise
    // Here we call .text() which parse the content of the request and return
    // promise
    return fetchResult.text()
})

// When parsing is done, we can work with the content
parsePromise.then(textResult => {
    console.log(`Here is the text result : ${textResult}`)
})

// If the request encounter an issue, promise might be rejected with an error
fetchPromise.catch(fetchError => {
    console.log(`We got an issue during the request`, fetchError)
})

// If there is an issue during the parsing, we can handle it too
parsePromise.catch(parseError => {
    console.log("We got an issue during the parsing", parseError)
})

// The same can be written like this
fetch('http://putaindecode.io')
    .then((fetchResult) => fetchResult.text())
    .then((textResult) => {
        console.log(`Here is the text result : ${textResult}`)
    })
    .catch((error) => {
        console.log(`We got an issue during the request or the parsing`, fetchError)
    })

// Or like this
fetch('http://putaindecode.io')
    .then(
        (fetchResult) => {
            return fetchResult.text()
        },
        (fetchError) => {
            console.log(`We got an issue during the request`, fetchError)
        })
    .then(
        (textResult) => {
            console.log(`Here is the text result : ${textResult}`)
        },
        (parseError) => {
            console.log("We got an issue during the parsing", parseError)
        }
    )