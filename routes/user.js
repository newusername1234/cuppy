const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});


router.get('/login', (req, res) => {
    res.render('/user/login');
});

router.post('/login', parseForm, (req, res) => {
    res.send(`welcome back, ${req.body.username}`);
});

router.get('/signup', (req, res) => {
    res.render('/user/signup');
});

router.post('/signup', parseForm, (req, res) => {
    res.send(`thanks for joining our coffee thing, ${req.body.username}`);
});


module.exports = router;