function mockPromise(value, delay) {
	var d = RSVP.defer();
	setTimeout(function() {
		d.resolve(value);
	}, delay);
	return d.promise;
}

function mockCallback(value, delay, callback) {
	setTimeout(function() {
		callback(value);
	}, delay);
}

function mockPromiseReject(reason, delay) {
	var d = RSVP.defer();
	setTimeout(function() {
		d.reject(reason);
	}, delay);
	return d.promise;
}

function showMessage(message) {
	document.getElementById('message').innerHTML = message;
}

function showErrorMessage(message) {
	document.getElementById('message').innerHTML = '<span style="color: red;">' + message + '</span>';
}

function appendMessage(message) {
	document.getElementById('message').innerHTML += message;
}

function appendErrorMessage(message) {
	document.getElementById('message').innerHTML += '<br/><span style="color: red;">' + message + '</span>';
}