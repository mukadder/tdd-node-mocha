require('z')

const reverseList = (list) => list.matches(
    // match list ending to stop recursion
    () => [],
    // recursively put current element on array ending
    (elem, remaining) => reverseList(remaining).concat(elem)
)

console.log(reverseList([1, 2, 3, 4, 5]))// output: [5, 4, 3, 2, 1]
