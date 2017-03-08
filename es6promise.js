/**
 * Created by mukadder on 3/8/17.
 */
function a () {
    return new Promise((resolve, reject) => {
        let value = true
        if(value) {
            resolve('success')
        }
        else {
            reject('err')
        }
    })
}

function b () {
    return new Promise((resolve, reject) => {
        let value = true
        if(value) {
            resolve('success')
        }
        else {
            reject('err')
        }
    })
}

function c () {
    return new Promise((resolve, reject) => {
        let value = true
        if(value) {
            resolve('success')
        }
        else {
            reject('err')
        }
    })
}

function testPromise () {
    a()
        .then((data) => {
            console.log(`a ${data}`)
            return b()
        })
        .then((data)=>{
            console.log(`b ${data}`)
            return c()
        })
        .then((data) => {
            console.log(`c ${data}`)
        })
        .catch((err) => {
            console.log(err)
        })

}

testPromise()
// a success
// b success
// c success