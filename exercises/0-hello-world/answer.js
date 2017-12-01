/**
 * Get the name asynchronously and print out a greeting.
 *
 * Checkout setup.js for the available API
 */
api.getNamePromise(function(name) {
  showMessage('Hello, ' + name + '!');
});
