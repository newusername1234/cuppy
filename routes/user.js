const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});
const { getApiKey } = require('../models/apiquery');
const user = require('../models/userquery');

const { check } = require('express-validator');
const sani = [
    check('id').escape(),
    check('name').escape(),
    check('cost').escape(),
    check('brewmethod').escape(),
    check('coffeesize').escape(),
    check('condiments').escape(),
    check('didlike').escape(),
    check('flavor').escape(),
    check('aroma').escape(),
    check('acidity').escape(),
    check('sweetness').escape(),
    check('mouthfeel').escape(),
    check('comments').escape(),
    check('score').escape(), 
    check('shopid').escape(), 
    check('beancoffeeid').escape(),
    check('location').escape(),
    check('phonenumber').escape(),
    check('website').escape(),
    check('countryoforigin').escape(),
    check('regionoforigin').escape(),
    check('farm').escape(),
    check('farmer').escape(),
    check('elevation').escape(),
    check('varietal').escape(),
    check('processingstyle').escape(),
    check('roastprofile').escape(),
    check('roasterid').escape(),
    check('greencoffeeid').escape(),
    check('location').escape(),
    check('hours').escape(),
    check('userid').escape(),
    check('username').escape(),
    check('firstname').escape(),
    check('lastname').escape(),
    check('email').escape(),
    check('password').escape()
]

router.post('*'), sani, async (req, res, next)=>{
    console.log("HERES MY SANITIZER!! ITS DOING A THING!!!");
    next();
}

router.get('/login', (req, res) => {
    let { loggedIn } = req.session;
    res.render('user/login', {
        locals: {
            loggedIn
        },
        partials: {
            nav: 'partials/nav'
        }
    });
});

router.post('/login', parseForm, sani, async (req, res) => {
    let { loggedIn } = req.session;
    const { username, password } = req.body;
    const didLoginSuccessfully = await user.login(username, password);
    if (didLoginSuccessfully) {
        const theUser = await user.getByUsername(username);
        console.log(theUser);
        req.session.user = {
            username,
            id: theUser.id,
            isadmin: theUser.isadmin
        };
        req.session.save(() => {
            res.redirect('profile');
        });
    } else {
        res.send('incorrect login info. refresh the page');
    }
});

router.get('/signup', (req, res) => {
    let { loggedIn } = req.session;
    res.render('user/signup', {
        locals: {
            loggedIn
        },
        partials: {
            nav: 'partials/nav'
        }
    });
});

router.get('/api', async (req, res) => {
    const apiKey = await getApiKey(req.session.user.id);
    res.json(apiKey);
})

router.post('/signup', parseForm, sani, async (req, res) => {
    const { username, firstname, lastname, email, phonenumber, password } = req.body;
    const id = await user.create(username, firstname, lastname, email, phonenumber, password);
    
    const didLoginSuccessfully = await user.login(username, password);
    
    if (didLoginSuccessfully) {
        const theUser = await user.getByUsername(username);
        console.log(theUser);
        req.session.user = {
            username,
            id
        };
        req.session.save(() => {
            res.redirect('profile');
        });
    } else {
        res.send('incorrect login info. refresh the page');
    }
});

router.use('/*', (req, res, next) =>{
    if (!req.session.loggedIn){
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/cups', async (req, res) => {
    const userCups = await user.getCups(req.session.user.id);
    let { loggedIn } = req.session;
    const { username } = req.session.user;
    // res.send(userCups);
    res.render('user/cups', {
        locals: {
            loggedIn,
            username,
            userCups
        },
        partials: {
            nav: 'partials/nav'
        }
    });
});

router.get('/profile', async (req, res) => {
    let { loggedIn } = req.session;
    const username = req.session.user.name;
    let apiKey = await getApiKey(req.session.user.id);
    if (loggedIn === false) {
        res.send('please <a href="/user/signup">sign up</a> or <a href="/user/login"> log in</a> ;)');
    }
    res.render('user/profile', {
        locals: {
            loggedIn,
            username: req.session.user.username,
            apiKey
        },
        partials: {
            nav: 'partials/nav'
        }
    });
});

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    });
});

router.get('/edit', (req, res)=>{
    let { loggedIn } = req.session;
    res.render('user/edit', {
        locals: {
            loggedIn
        },
        partials: {
            nav: 'partials/nav'
        }
    })
})

module.exports = router;