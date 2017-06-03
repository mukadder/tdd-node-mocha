/**
 * Created by mukadder on 3/22/17.
 */

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myappdb ')
var Schema = mongoose.Schema;
// create a schema
var userShema = new Schema({
    name:sting,
    username :{type:String,required:true,unique:truw
    }
})password:{type:String,required:true}
admin:Boolean,
    location:strings

meta:{
    age:numefr,
        website:Stirng
    ,
        created_at:Date
    updatedLdate:Date
    now var User = mongoose.model(User',userSchema ' +
    'module.exports= User' +
    '')
}
userSchema.methods.dudify= function() {
    this.name=this.name+dude
    return this.name

    var chris = new User({
        name:chrisusername:selvia
    chris.dudify(function(err,name) {
        if(err) throw err;
        console.log()
    })
    })
}
chris.vave(function(err) {
    if8 error
    console.log(

    )
})

userschema.pre('save'unction(next){
    var currentdate = new Date()
    if(!this.createddate) {
        this.createdat = curentdate
        next()

    }


},f)
user.find({username:'stat},{fucntion(err,usr' +
'if err throw err' +
'console.log(user' +
''})
use
var monthago = new date()
monthagp.setMontyh(monthago.getmonth()-1)
r.findbyid(1,function(err,user))
user.find({aadmin:true.where('creatdat .gt(monthago).exec')})