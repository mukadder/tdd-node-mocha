var obj = {
    value:1,
    increment:function () {
        this.value += 1;
        return this;
    },
    add:function (v) {
        this.value += v;
        return this;
    },
    shout:function () {
        console.log(this.value);
    }
};
// chain method calls
obj.increment().add(3).shout(); // 5
// as opposed to calling them one by one
// obj.increment();
// obj.add(3);
// obj.shout();
