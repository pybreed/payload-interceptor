var express = require('express')
    , router = express.Router()
    , nodemailer = require('nodemailer')
    , sgTransport = require('nodemailer-sendgrid-transport')
    , options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    }
    , mailer = nodemailer.createTransport(sgTransport(options));


router.get('/', function (req, res) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/payload', function (req, res) {
    var eventType = req.headers['x-github-event']
        , email = {
            to: process.env.EMAIL_TO,
            from: 'noreply@github-payload-interceptor.herokuapp.com',
            subject: eventType + ' payload sample',
            text: JSON.stringify(req.body)
        };

    mailer.sendMail(email, function (err, info) {
        if (err) {
            console.log(err);
        }

        console.log(info);
        res.end(JSON.stringify(info));
    })
});

module.exports = router;
