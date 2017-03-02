/**
 * Created by mukadder on 2/25/17.
 */
function* fibonacci () {
    var a=0 ,b=1,c=0;

    while(true) {
        yield a;

        c=1,a=b,b=c+b
    }

}
var seq= fibonacci()
console.log(seq.next().value)
console.log(seq.next().value)
console.log(seq.next().value)
console.log(seq.next().value)
console.log(seq.next().value)
console.log(seq.next().value)
console.log(seq.next().value)