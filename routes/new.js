const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const newNew = require('../models/newquerry');
const api = require('../models/apiquery');

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
    check('userid').escape()
]

router.post('*'), sani, async (req, res, next)=>{
    next();
}

// green coffee
router.get('/greencoffee', (req, res)=>{
    let { loggedIn } = req.session;
    res.render('new/greencoffee', {
        locals: {
            loggedIn 
        },
        partials: {
            nav:'partials/nav'
        }
    });
});

router.post('/greencoffee', parseForm, (req, res)=>{
    let { loggedIn } = req.session;
    console.log(req.body);
    const { name, countryOfOrigin, regionOfOrigin, farm, farmer, elevation, varietal, processingStyle } = req.body;
    const userID = req.session.user.id;
    newNew.createGreenCoffee(name, countryOfOrigin, regionOfOrigin, farm, farmer, elevation, varietal, processingStyle, userID);
    res.redirect('/new/greencoffee');
});

// roaster
router.get('/roaster', (req, res)=>{
    let { loggedIn } = req.session;
    res.render('new/roaster', {
        locals: {
            loggedIn 
        },
        partials: {
            nav:'partials/nav'
        }
    });
});

router.post('/roaster', parseForm, (req, res)=>{
    let { loggedIn } = req.session;
    console.log(req.body);
    const { name, location, phoneNumber, website } = req.body;
    const userID = req.session.user.id;
    newNew.createRoaster(name, location, phoneNumber, website, userID);
    res.redirect('/new/roaster');

});

// cup
router.get('/cup', async (req, res)=>{
    let { loggedIn } = req.session;
    const shopItems = await api.allShops();
    const beanItems = await api.allBeans();
    res.render('new/cup', {
        locals: {
            loggedIn,
            shopItems,
            beanItems
        },
        partials: {
            nav:'partials/nav',
            shopdropdown: 'dropDowns/shopDrop',
            beancoffeedropdown: 'dropDowns/beanCoffeeDrop'
        }
    });
});

router.post('/cup', parseForm, async (req, res)=>{
    let { loggedIn } = req.session;
    console.log(req.body);
    const { cost, didLike, brewMethod, coffeeSize, condiments, name, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopid, beancoffeeid, roastDate, dateOrdered } = req.body;
    const userID = req.session.user.id;
    await newNew.createCup(userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopid, beancoffeeid);
    res.redirect('cup');

});

// bean coffee
router.get('/beanCoffee', async (req, res)=>{
    let { loggedIn } = req.session;
    const greenCoffeeItems = await api.allGreen();
    const allRoasterItems = await api.allRoasters();
    // console.log(greenCoffeeItems)
    res.render('new/beanCoffee', {
        locals: {
            loggedIn,
            greenCoffeeItems,
            allRoasterItems
        },
        partials: {
            nav:'partials/nav',
            greencoffeedropdown: 'dropDowns/greenCoffeeDrop',
            roasterdropdown: 'dropDowns/roasterDrop'
        }
    });
});

router.post('/beanCoffee', parseForm, (req, res)=>{
    let { loggedIn } = req.session;
    console.log(req.body);
    const { name, roastProfile, roasterid, greencoffeeid } = req.body;
    const userID = req.session.user.id;
    newNew.createBeanCoffee(name, roastProfile, roasterid, greencoffeeid, userID);

    res.redirect('/new/beancoffee');
});

// shop
router.get('/shop', (req, res)=>{
    let { loggedIn } = req.session;
    res.render('new/shop', {
        locals: {
            loggedIn 
        },
        partials: {
            nav:'partials/nav'
        }
    });
});

router.post('/shop', parseForm, (req, res)=>{
    let { loggedIn } = req.session;
    console.log(req.body);
    const { name, location, phoneNumber, hours, website } = req.body;
    // needs shopOwnerID
    const userID = req.session.user.id;
    newNew.createShop(name, location, phoneNumber, hours, website, userID);

    res.redirect('/new/shop');
})

module.exports = router;