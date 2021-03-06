/**
 * Created by mukadder on 3/8/17.
 */
async.waterfall([
    function(done) {
        crypto.randomBytes(16, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
        });
    },
    function(token, done) {
        User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
            if (!user) {
                req.flash('errors', { msg: 'No account with that email address exists.' });
                return res.redirect('/forgot');
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
                done(err, token, user);
            });
        });
    },
    function(token, user, done) {
        var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'SendGrid',
            auth: {
                user: secrets.sendgrid.user,
                pass: secrets.sendgrid.password
            }
        });
        var mailOptions = {
            to: user.email,
            from: 'hackathon@starter.com',
            subject: 'Reset your password on Hackathon Starter',
            text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
            req.flash('info', { msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
            done(err);
        });
    }
], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
});
};