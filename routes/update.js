const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const { yeet, kobe, didChange, oneRoaster, oneGreenCoffee, updateRoaster, updateGreenCoffee } = require('../models/updatequery');

// kobe();

// cup update page
router.get('/cup', (req, res)=>{
     res.send('cuppy');
    // res.render('create/');
});

// roaster update page
router.get('/roaster/:id', async (req, res)=>{
try {
    const reqID  = req.params.id;
    const theRoaster = await oneRoaster(reqID);
    const name = theRoaster.name;
    res.render('update/roaster', {
        locals: {
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
    try{
        const reqID  = req.params.id;
        const theGreenCoffee = await oneGreenCoffee(reqID);
        // console.log(theGreenCoffee);
        res.render('update/greencoffee', {
            locals: {
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
router.get('beancoffee', (req, res)=>{

});

// shop update page
router.get('shop', (req, res)=>{

});

module.exports = router;