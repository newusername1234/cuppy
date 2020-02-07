const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const { yeet, kobe, didChange, oneRoaster, oneBean, oneShop, oneGreenCoffee, oneCup, updateRoaster, updateShop, updateBeancoffee, updateCup, updateGreenCoffee, allShops, allBeans, allGreen, allRoasters, allCups, allRoastersFull, allBeansFull, allGreenFull,allShopsFull } = require('../models/updatequery');

// kobe();
router.get('/roaster', async (req, res)=>{
    let { loggedIn } = req.session;
    let theRoasters = await allRoastersFull(req.session.user.id);
    console.log(theRoasters)
    res.render('update/roasterlist', {
        locals: {
            loggedIn,
            theRoasters
        }, 
        partials: {
            nav: 'partials/nav'
        }
    })

})

router.get('/beancoffee', async (req, res)=>{
    let { loggedIn } = req.session;
    let theBeans = await allBeansFull(req.session.user.id);
    const theRoasterNameID = await allRoasters();
    const theGreenNameID = await allGreen();
    console.log(theRoasterNameID)
    console.log(theBeans);
    console.log(theGreenNameID)
    res.render('update/beancoffeelist', {
        locals: {
            loggedIn,
            theBeans,
            theRoasterNameID,
            theGreenNameID
            // from roaster, get one name based on theBeans.roasterid
        }, 
        partials: {
            nav: 'partials/nav'
        }
    })
})

router.get('/greencoffee', async (req, res)=>{
    let { loggedIn } = req.session;
    let fullgreen = await allGreenFull(req.session.user.id);
    console.log(fullgreen);
    res.render('update/greencoffeelist', {
        locals: {
            loggedIn,
            fullgreen
        }, 
        partials: {
            nav: 'partials/nav'
        }
    })

})

router.get('/shop', async (req, res)=>{
    let { loggedIn } = req.session;
    // let theShops = await allShops();
    let fullShops = await allShopsFull(req.session.user.id);
    console.log(fullShops)
    res.render('update/shoplist', {
        locals: {
            loggedIn,
            // theShops,
            fullShops
        }, 
        partials: {
            nav: 'partials/nav'
        }
    })

})

router.get('/cups', async (req, res)=>{
    let { loggedIn } = req.session;
    let theCups = await allCups(req.session.user.id);
    console.log(theCups)
    res.render('update/cuplist', {
        locals: {
            loggedIn,
            theCups
        }, 
        partials: {
            nav: 'partials/nav'
        }
    })
})

// cup update page
router.get('/cup/:id', async (req, res)=>{
    let { loggedIn } = req.session;
try {
    const reqID = req.params.id;
    const theCup = await oneCup(reqID);
    const theShop = await oneShop(theCup.shopid);
    let theBean = await oneBean(theCup.beancoffeeid);
    // This is just for the seed data; when a new entry is made, anything that's blank is an empty string. 
    if(theBean == null) {
        theBean = 'Choose your bean'
    } else {
        theBean = theBean.name;
    } 
    // console.log(theBean)
    const shopItems = await allShops();
    const beanItems = await allBeans();
    const cupShopid = theCup.shopid;
    const cupBeanCoffeeid = theCup.beancoffeeid;
    res.render('update/cup', {
        locals: {
            loggedIn,
            shopItems,
            beanItems,
            theCup,
            theShop,
            cupShopid,
            cupBeanCoffeeid,
            theBean
        },
        partials: {
            nav:'partials/nav',
            shopdropdown: 'dropDowns/shopDropUpdate',
            beancoffeedropdown: 'dropDowns/beanCoffeeDropUpdate'
        }
    })
}
catch(err) {
    console.log(err);
}
});

router.post('/cup/:id', parseForm, async (req, res)=>{
    let { loggedIn } = req.session;
    const reqID = req.params.id;
    const theCup = await oneCup(reqID);
    // make the newDB a shallow copy of the cup
    let newDB = {...theCup}
    // make a shallow copy of req.body
    let newReq = {...req.body}

    // delete all blanks
    for(let item in newReq) {
        if(newReq[`${item}`] == '') {
            delete newReq[`${item}`]
        }
    }
    // make the strings into numbers
    newReq.beancoffeeid = parseInt(newReq.beancoffeeid)
    newReq.shopid = parseInt(newReq.shopid)

    if(newReq.score) {
        newReq.score = parseInt(newReq.score)
    }
    // take the items in newReq, replace the items in newDB with them
    for(let item in newReq) {
        newDB[`${item}`] = newReq[`${item}`];
    }
    console.log(newDB)
    const { id, name, cost, brewmethod, coffeesize, condiments, didlike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopid, beancoffeeid } = newDB;

    updateCup(id, name, cost, brewmethod, coffeesize, condiments, didlike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopid, beancoffeeid);



    res.redirect(`/update/cup/${reqID}`)
})

// roaster update page
router.get('/roaster/:id', async (req, res)=>{
    let { loggedIn } = req.session;
try {
    const reqID  = req.params.id;
    const theRoaster = await oneRoaster(reqID);
    const name = theRoaster.name;
    res.render('update/roaster', {
        locals: {
            loggedIn,
            reqID,
            theRoaster,
            name
        },
        partials: {
            nav: 'partials/nav'
        }
    })
}
catch(err) {
    console.log(`
    ===============================
    ${err}
    `)
}

});

router.post('/roaster/:id', parseForm, async (req, res)=>{
    let { loggedIn } = req.session;
    const reqID = req.params.id;
    const theRoaster = await oneRoaster(reqID);
    // console.log(theRoaster)
    // console.log(req.body)
    let newDB = {
        id: parseInt(reqID)
    };
    for(let item in theRoaster) {
        // for everything except the id from theRoaster
        if(item != 'id'){
            const reqName = req.body[`${item}`]
            const roastName = theRoaster[`${item}`];

        // if the item in request is different from request to database
            if(didChange(reqName, roastName)) {
                newDB[`${item}`] = req.body[`${item}`];
            }
            else {
                newDB[`${item}`] = theRoaster[`${item}`];
            }
        }
    }
    // send the database a request to update with newDB
    const { id, name, location, phonenumber, website } = newDB;
    updateRoaster(id, name, location, phonenumber, website);
    res.redirect(`/update/roaster/${id}`)
});

// green coffee update page
router.get('/greencoffee/:id', async (req, res)=>{
    let { loggedIn } = req.session;
    try{
        const reqID  = req.params.id;
        const theGreenCoffee = await oneGreenCoffee(reqID);
        // console.log(theGreenCoffee);
        res.render('update/greencoffee', {
            locals: {
                loggedIn,
                GC: theGreenCoffee
            },
            partials: {
                nav: 'partials/nav'
            }
        })
    }
    catch(err) {
        console.log(err)
    }
});

router.post('/greencoffee/:id', parseForm, async (req, res)=>{
    let { loggedIn } = req.session;
    const reqID = req.params.id;
    const theGreenCoffee = await oneGreenCoffee(reqID);
    // console.log(req.body);
    let newDB = {
        id: parseInt(reqID)
    };
    for(let item in theGreenCoffee) {
        // for everything except the id from theRoaster
        if(item != 'id'){
            const reqName = req.body[`${item}`];
            const greenName = theGreenCoffee[`${item}`];

        // if the item in request is different from request to database
            if(didChange(reqName, greenName)) {
                newDB[`${item}`] = req.body[`${item}`];
            }
            else {
                newDB[`${item}`] = theGreenCoffee[`${item}`];
            }
        }
    }
    // send the database a request to update with newDB
    const { id, name, countryoforigin, regionoforigin, farm, farmer, elevation, varietal, processingstyle } = newDB;
    updateGreenCoffee(id, name, countryoforigin, regionoforigin, farm, farmer, elevation, varietal, processingstyle);
    res.redirect(`/update/greencoffee/${reqID}`)
})

// bean coffee update page
router.get('/beancoffee/:id', async (req, res)=>{
    let { loggedIn } = req.session;
    const reqID = req.params.id;
    const theBean = await oneBean(reqID);
    const greenCoffeeItems = await allGreen();
    const allRoasterItems = await allRoasters();
    const theRoaster = await oneRoaster(theBean.id);
    const theGreenCoffee = await oneGreenCoffee(theBean.id);
    const beanRoasterid = theBean.roasterid;
    const beanGreencoffeeid = theBean.greencoffeeid;
    
    if(req.session.user.id == theBean.userid || req.session.user.isadmin){
        res.render('update/beancoffee', {
            locals: {
                loggedIn,
                greenCoffeeItems,
                allRoasterItems,
                theBean,
                theRoaster,
                theGreenCoffee,
                beanRoasterid,
                beanGreencoffeeid
            },
            partials: {
                nav:'partials/nav',
                greencoffeedropdown: 'dropDowns/greenCoffeeDropUpdate',
                roasterdropdown: 'dropDowns/roasterDropUpdate'
            }
        });
    } else {
        res.render("404");
    }
});

router.post('/beancoffee/:id', parseForm, async (req, res)=>{
    let { loggedIn } = req.session;
    const reqID = req.params.id;
    const theBean = await oneBean(reqID);
    // make the newDB a shallow copy of the thebean
    let newDB = {...theBean};
    // make a shallow copy of req.body
    let newReq = {...req.body};
    // delete all blanks
    for(let item in newReq) {
        if(newReq[`${item}`] == '') {
            delete newReq[`${item}`]
        }
    }
    // make strings into numbers 
    newReq.roasterid = parseInt(newReq.roasterid);
    newReq.greencoffeeid = parseInt(newReq.greencoffeeid);
    // take the items in newReq, replace the items in newDB with them
    for(let item in newReq) {
        newDB[`${item}`] = newReq[`${item}`];
    }
    // put it in the database
    const { id, name, roastprofile, roasterid, greencoffeeid } = newDB;
    updateBeancoffee(id, name, roastprofile, roasterid, greencoffeeid);
    res.redirect(`/update/beancoffee/${reqID}`)
})

// shop update page
router.get('/shop/:id', async (req, res)=>{
    let { loggedIn } = req.session;
    const reqID = req.params.id;
    const theShop = await oneShop(reqID);
    console.log("req.session");
    console.table(req.session);
    console.log("theShop");
    console.table(theShop);
    res.render('update/shop', {
        partials: {
            nav:'partials/nav'
        },
        locals: {
            loggedIn,
            theShop
        }
    });
});

router.post('/shop/:id', parseForm, async (req, res)=>{
    let { loggedIn } = req.session;
    const reqID = req.params.id;
    const theShop = await oneShop(reqID);
    // make newDB a shallow copy of shop
    let newDB = {...theShop};
    // and the req
    let newReq = {...req.body};
    // delete all blanks
    for(let item in newReq) {
        if(newReq[`${item}`] == '') {
            delete newReq[`${item}`]
        }
    }
    // take the items in newReq, replace the items in newDB with them
    for(let item in newReq) {
        newDB[`${item}`] = newReq[`${item}`];
    }
    console.log(newDB)
    const { id, name, location, phonenumber, hours, website, userid } = newDB;
    updateShop(id, name, location, phonenumber, hours, website, userid);
    res.redirect(`/update/shop/${reqID}`);
})

module.exports = router;