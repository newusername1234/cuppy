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

router.post('/cup', parseForm, async (req, res)=> {
    console.log(req.body);
    const { cost, didLike, brewMethod, coffeeSize, condiments, name, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID, roastDate } = req.body;
    const userID = 1; 
    const dateOrdered = '2019-12-15';
    await newNew.createCup(userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID);
    res.redirect('cup');

});
const dateOrdered = new Date().toString();


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