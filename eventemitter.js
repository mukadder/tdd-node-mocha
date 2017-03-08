/**
 * Created by mukadder on 3/8/17.
 */
/**
 * Reducing callbacks
 */

var events = require('events');

var MyCart = function() {
    this.data = { item: 'thing' };
};
MyCart.prototype = new events.EventEmitter();

MyCart.prototype.retrieveCart = function() {
    this.emit('data', this.data);
};

MyCart.prototype.updateCart = function() {
    this.emit('result', this.data);
};

MyCart.prototype.sendResults = function() {
    console.log(this.data);
    this.emit('complete');
};

var cart = new MyCart();

cart.on('data', function(data) {
    cart.data['new'] = 'other thing';
    cart.updateCart();
});

cart.on('result', function(data) {
    cart.sendResults(data);
});

cart.on('complete', function() {
    console.log('Cart Updated');
    console.timeEnd('metrics');
});

console.time('metrics');
cart.retrieveCart();
