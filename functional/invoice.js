function createinvoice(invoicenumber){
    return {
        invoicenumber,
        items:[]
    }

}
function clone(o){

    return JSON.parse(JSON.stringify(o));

}
function addItem(invoice,quantity,itemprice,description){
    const newInvoice = clone(invoice)
    newInvoice.items.push({
        quantity,itemprice,description
    })
    return newInvoice


}
function calculateSum(invoice){

    const reducer=(acc,item)=>acc+item.quantity*item.itemprice
    return invoice.items.reduce(reducer,0)
}
const invoice1a= createinvoice(100)
const invoice2a=createinvoice(200)
const invoice1b=addItem(invoice1a,2,10,'tshirt')
const invoice1=addItem(invoice1b,3,25,'bag')


console.log('invoice2',calculateSum(invoice1))
/**
 * Created by mukadder on 6/3/17.
 */
// write a factorial non functional

function factorial(n){
    let result =1;
    while (number>1){
        result*=num;
        num-=1
    }
 return result
}
// now functional way
const fact= (num) => num<=1?1:num*fact(num-1)

const basket =[]
// non functional  mutate the state
function addElement(itemname,itemprice){
    basket.push({itemname,itemprice})
}
// we pass the originl state and concat it
function addElementfunctinal(basket,itemname,itemprice) {
// safe copy
    return deepclone(basket).concat([{itemname,itemprice}])
}

function deepclone(obj){

    return JSON.parse(JSON.stringify(obj))
}
// grade test to average  return a map of test with grade if  grade is below avg fail
function gradeTests(tests) {
    const avg= getAvarage(tests)
    return mapScoretoGragdes(tests,avg)


}
// recursion
function mapScoretoGragdes(tests,avg){
    // always have first conditin to terminate the loop
    if(tests.length===0) return [];
const head= tests[0]
    const tail = heads.slice(1)
    return [head >=average?'A':'F'].concat(mapScoretoGragdes(tail,avg))
}
// use higher order
function mapScoretoGrades(test,avg){
    let gradeTest= function(testscore){
        return testscore>=avg?'A':'F'
    }
    return test.map(gradeTest);

}
function getAverage(tests) {
return tests.reduce(function(acc,elem){
    return acc+elem
})
}
