/**
 * Created by mukadder on 2/25/17.
 */



function* tick1() {
    var num = 0
    while (!(yield num++)){

    }

}
var itr1 = tick1()
itr1.next()
console.log(itr1.next().value)
console.log(itr1.next().value)
console.log(itr1.next().value)
console.log(itr1.next().value)
console.log(itr1.next().value)
console.log(itr1.next(true))

