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
