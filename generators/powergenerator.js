/**
 * Created by mukadder on 2/25/17.
 */

function* powergenerator() {
    var result = Math.pow(yield "a" ,yield "b")

    return result
}
var g = powergenerator()
console.log(g.next().value)
console.log(g.next(10).value)
console.log(g.next(2).value)