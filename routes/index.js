var express = require('express')
    , router = express.Router()
    , nodemailer = require('nodemailer')
    , sgTransport = require('nodemailer-sendgrid-transport');

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/payload', function (req, res) {
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    res.end('success');
});

module.exports = router;
