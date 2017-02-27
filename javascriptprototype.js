function MyObj() {
    this.data = 123;
}
MyObj.prototype = {
    reset: function() {
        MyObj.call(this);
    }
}
var obj = new MyObj();
console.log(obj.data); //123
obj.data = 456;
console.log(obj.data); //456
obj.reset();
console.log(obj.data); //123/**
 /*
  Know that, call() and apply() methods of a function simply changes the value of this within the function, and the new keyword creates a new object. Calling a constructor function without using that keyword simply executes that function without creating a new object.
  When a constructor's task initializes the object by e.g. add a new property into it, it uses this to refer to object created by the new keyword. By using call(), you can use the constructor function to reinitialize an existing object. e.g.
  */