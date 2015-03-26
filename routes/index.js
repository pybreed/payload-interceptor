var express = require('express')
    , router = express.Router()
    , nodemailer = require('nodemailer')
    , sgTransport = require('nodemailer-sendgrid-transport'),
    options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };


router.get('/', function (req, res) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/payload', function (req, res) {
    var mailer = nodemailer.createTransport(sgTransport(options))
        , email = {
            to: process.env.EMAIL_TO,
            from: 'noreply@github-payload-interceptor.herokuapp.com',
            subject: 'Payload sample',
            text: JSON.stringify(req.body)
        };

    mailer.sendMail(email, function (err, res) {
        if (err) { 
            console.log(err) 
        }
        res.end('success');
    })
});

module.exports = router;
