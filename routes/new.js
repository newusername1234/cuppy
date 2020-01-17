const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const newNew = require('../models/newquerry');

// green coffee
router.get('/greencoffee', (req, res) => {
    res.render('new/greencoffee', {
        partials: {
            nav:'partials/nav'
        }
    });
});

router.post('/greencoffee', parseForm, (req, res) => {
    console.log(req.body);
    const { countryOfOrigin, regionOfOrigin, farm, farmer, elevation, varietal, processingStyle } = req.body;
    newNew.createGreenCoffee(countryOfOrigin, regionOfOrigin, farm, farmer, elevation, varietal, processingStyle);
    res.redirect('/new/greencoffee');
});

// roaster
router.get('/roaster', (req, res) => {
    res.render('new/roaster', {
        partials: {
            nav:'partials/nav'
        }
    });
});

router.post('/roaster', parseForm, (req, res) => {
    console.log(req.body);
    const { name, location, phoneNumber, website } = req.body;
    newNew.createRoaster(name, location, phoneNumber, website);
    res.redirect('/new/roaster');

});

// cup
router.get('/cup', (req, res)=> {
    res.render('new/cup', {
        partials: {
            nav:'partials/nav'
        }
    })
});

router.post('/cup', parseForm, async (req, res)=> {
    // console.log(req.body);
    const { cost, didLike, brewMethod, coffeeSize, condiments, name, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID, roastDate } = req.body;
    const userID = 1; 
    const dateOrdered = '2019-12-15';
    await newNew.createCup(userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID);
    res.redirect('cup');

});

// bean coffee
router.get('/beanCoffee', (req, res)=>{
    res.render('new/beanCoffee', {
        partials: {
            nav:'partials/nav'
        }
    });
});

router.post('/beanCoffee', parseForm, (req, res)=>{
    console.log(req.body);
    const { name, roastProfile, roasterid, greencoffeeid } = req.body;
    // roasterid = parseInt(roasterid);
    newNew.createBeanCoffee(name, roastProfile, roasterid, greencoffeeid);

    res.redirect('/new/beancoffee');
});

// shop
router.get('/shop', (req, res)=>{
    res.render('new/shop', {
        partials: {
            nav:'partials/nav'
        }
    });
});

router.post('/shop', parseForm, (req, res)=>{
    console.log(req.body);
    const { name, location, phoneNumber, hours, website } = req.body;
    // needs shopOwnerID
    // const shopOwnerID = req.session.user.id;
    newNew.createShop(name, location, phoneNumber, hours, website /* shopOwnerID */);

    res.redirect('/new/shop');
})

module.exports = router;