/**
 * Created by mukadder on 2/26/17.
 */
// lets write an iterator object which gets one item at a time from collection and
    //keeps track of its position
let makeIterator = function(arr){
    let currentIndex = 0;
    return {
        next(){
            return currentIndex < arr.length ?
                {
                    value: arr[currentIndex++],
                    done : false
                } :
                { done: true};
        }
    };
}
let iterator = makeIterator([1,2,3,4,5]);
while(1){
    let {value, done} = iterator.next();
    if(done) break;
    console.log(value);
}