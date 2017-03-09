/**
 * Created by mukadder on 3/8/17.
 */
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: 'username@gmail.com',
        pass: 'password'
    }
});

var mailOptions = {
    from: 'sender@mail.com',
    to: 'receiver@mail.com',
    subject: 'Hello world!',
    text: 'Plaintext message example.'
};

smtpTransport.sendMail(mailOptions, function(err) {
    console.log('Message sent!');
});