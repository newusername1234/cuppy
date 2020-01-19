const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const { yeet, kobe, oneRoaster, didChange } = require('../models/updatequery');

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
    console.log(theRoaster.name)
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
    const { name, location, phonenumber, website } = req.body;
    // console.log(theRoaster)
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
                console.log(item + ' **CHANGE ME TO: ' + req.body[`${item}`])
                console.log(req.body[`${item}`])
            }
            else {
                newDB[`${item}`] = theRoaster[`${item}`];
            }

        }
    }
    // send the database a request to update with newDB
    console.log(newDB)
    res.redirect('/update/roaster/1')
    
    
    // console.log(newDB)
    // console.log('ITEM: ' + item)
    // console.log(req.body[`${item}`])
    // console.log(theRoaster[`${item}`])
});

// green coffee update page
router.get('greencoffee', (req, res)=>{

});

// bean coffee update page
router.get('beancoffee', (req, res)=>{

});

// shop update page
router.get('shop', (req, res)=>{

});

module.exports = router;