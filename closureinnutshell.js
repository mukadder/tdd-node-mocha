/**
 * Created by mukadder on 2/28/17.
 */
function make_calculator() {
    var n = 0; // this calculator stores a single number n
    return {
        add: function(a) {
            n += a;
            return n;
        },
        multiply: function(a) {
            n *= a;
            return n;
        }
    };
}

first_calculator = make_calculator();
second_calculator = make_calculator();

console.log(first_calculator.add(3)); // returns 3
console.log(second_calculator.add(400)); // returns 400

console.log(first_calculator.multiply(11)); // returns 33
console.log(second_calculator.multiply(10)); // returns 4000
/*
 The key point: Each call to make_calculator creates a new local variable n, which continues to be usable by that calculator's add and multiply functions long after make_calculator returns.

 If you are familiar with stack frames, these calculators seem strange: How can they keep accessing  n after make_calculator returns? The answer is to imagine that JavaScript doesn't use "stack frames", but instead uses "heap frames", which can persist after the function call that made them returns.

 Inner functions like add and multiply, which access variables declared in an outer function**, are called closures.
 */