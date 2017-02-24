

/**
 * Created by mukadder on 2/23/17.
 */
var restaurant = function() {
    takeOrder(['fish', 'sandwich', 'pizza']);
}
/*
 The takeOrder function happens to be asynchronous, however, we can't cook the food until the order is finished. We need to notify the kitchen when they can start cooking, which will require a callback:

 */

var restaurant = function() {
    takeOrder(['fish', 'sandwich', 'pizza'], function(err, order) {
        cookFood(order);
    });
}
/*
 The cookFood function is also asynchronous, but customers can't start eating their food until it's finished cooking. We'll need another callback for the kitchen to notify when cookFood is done. Since the order contained an array of food items, we'll return the meals as an array too:
 */
var restaurant = function() {
    takeOrder(['fish', 'sandwich', 'pizza'], function(err, order) {
        cookFood(order, function(err, meals) {
            eat(meals[0]);
            eat(meals[1]);
            eat(meals[2]);
        });
    });
};
/*
 Here's where things become more complicated. The eat function is also asynchronous. Customers all start eating at the same time, there is no way to know when they will finish. We want to bring the check, but we have to wait until all three customers are done. We need some to keep track of this.
 To solve this simply we'll use a variable to count down as customer's finish eating (note that we have to handle the results individually each time the callback is invoked).
 */

var restaurant = function(complete) {
    takeOrder(['fish', 'sandwich', 'pizza'], function(err, order) {
        cookFood(order, function(err, meals) {
            var counter = 3;
            var payment = 0;
            var waitForCustomer = function(err, money) {
                counter--;
                payment += money;
                if(counter < 1) {
                    complete(null, payment);
                }
            };

            eat(meals[0], waitForCustomer);
            eat(meals[1], waitForCustomer);
            eat(meals[2], waitForCustomer);
        });
    });
};
/*
 To further complicate things, our restaurant's kitchen isn't very reliable. While any part of our code could result in an error, we want to specifically report problems in getting food to the customers. We'll check in cookFood's callback if err contains a value, and if it does, we'll stop there:

 */

var restaurant = function(complete) {
    takeOrder(['fish', 'sandwich', 'pizza'], function(err, order) {
        cookFood(order, function(err, meals) {
            if(err) {
                console.log(err.message);
                complete(err);
            } else {
                var counter = 3;
                var payment = 0;
                var waitForCustomer = function(err, money) {
                    counter--;
                    payment += money;
                    if(counter < 1) {
                        complete(null, payment);
                    }
                };

                eat(meals[0], waitForCustomer);
                eat(meals[1], waitForCustomer);
                eat(meals[2], waitForCustomer);
            }
        });
    });
};