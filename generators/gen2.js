/**
 * Created by mukadder on 2/25/17.
 */
function delay(time ,callback){
  setTimeout(function(){
      callback('slept fot'+ time)
  },time)
}

function delaythings(){
    delay(1000,function(result1){
        console.log(result1)
        delay(1200,function(result2){
            console.log(result2)
        })
    })
}
delaythings()

// lets write this code using generator

function* delaythings2(resume) {
    // we pass resume to the generator
    var result1=yield delay(1000,resume)
    console.log(result1)
    var result2= yield delay(1200,resume)
    console.log(1200)
}
// we need run function which can call next
function run(generator) {
    var obj = iter.next()

    // resume is a callback function which accepts a value and put it into next
    function resume(value){
        itr.next(value)
    }
    var itr = generator(resume)
    itr.next()
}

// what is thunkify an any function which takes a call back  and return a function

function thunkify(fn){
    return function(){
        var args = Array.prototype.slice.call(arguments)
        return function(done){
            args.push(function(){
                done.apply(null,arguments)
            })
            fn.apply(null,args)
        }
    }
}
delay = thunkify(delay)
var thunk = delay(1000)
thunk(function(result){
    console.log(result)
})