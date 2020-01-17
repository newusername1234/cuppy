const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const user = require('../models/userquery');


router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', parseForm, async (req, res) => {
    const { username, password } = req.body;
    const didLoginSuccessfully = await user.login(username, password);
    if (didLoginSuccessfully) {
        const theUser = await user.getByUsername(username);
        console.log(theUser);
        req.session.user = {
            username,
            id: theUser.id
        };
        req.session.save(() => {
            res.redirect('profile');
        });
    } else {
        res.send('incorrect login info. refresh the page');
    }
});

router.get('/signup', (req, res) => {
    res.render('user/signup');
});

router.post('/signup', parseForm, async (req, res) => {
    const { username, firstname, lastname, email, phonenumber, password } = req.body;
    user.create(username, firstname, lastname, email, phonenumber, password);
    
    res.redirect('profile');
});

router.get('/:userId(\\d+)', async (req, res) => {
    const userCups = await user.getCups(req.params.userId);
    res.send(userCups);
});

router.get('/profile', (req, res) => {
    res.render('user/profile', {
        locals: {
            username: req.session.user.username,
            id: req.session.user.id
        }
    });
});

function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('login');
    }
}


module.exports = router;