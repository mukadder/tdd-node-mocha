var twilio = require('twilio');

var client = twilio('YOUR_TWILIO_ACCOUNT_SID', 'YOUR_TWILIO_AUTH_TOKEN'); // TODO

async function sendTextMessage(to) {
    try {
        await client.sendMessage({
            to: to,
            from: 'YOUR_TWILIO_PHONE_NUMBER', // TODO
            body: 'Hello, Async/Await!'
        });
        console.log('Request sent');
    } catch(error) {
        console.error(error);
    }
}

sendTextMessage('YOUR_PHONE_NUMBER'); // TODO
console.log('I print out first to show I am async!');/**
 * Created by mukadder on 2/23/17.
 */
