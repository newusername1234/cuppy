const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const newNew = require('../models/newquerry');

// green coffee
router.get('/greencoffee', (req, res) => {
    res.render('new/greencoffee');
});

router.post('/greencoffee', parseForm, (req, res) => {
    console.log(req.body);
    res.redirect('/new/greencoffee');
});

// roaster
router.get('/roaster', (req, res) => {
    res.render('new/roaster');
});

router.post('/roaster', parseForm, (req, res) => {
    console.log(req.body);
    res.redirect('/new/roaster');
});

// cup
router.get('/cup', (req, res)=> {
    res.render('new/Cup', {
        locals: {},
        partials: {}
    })
});

router.post('/cup', parseForm, (req, res)=> {
    console.log(req.body);
    res.redirect('cup');

});

// bean coffee
router.get('/beanCoffee', (req, res)=>{
    res.render('new/beanCoffee', {
        locals: {},
        partials: {}
    });
});

router.post('/beanCoffee', parseForm, (req, res)=>{
    console.log(req.body);
    res.redirect('/new/beancoffee');
});

// shop
router.get('/shop', (req, res)=>{
    res.render('new/shop');
});

router.post('/shop', parseForm, (req, res)=>{
    console.log(req.body);
    res.redirect('/new/shop');
})

module.exports = router;