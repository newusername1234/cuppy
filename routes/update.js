const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const { yeet, kobe } = require('../models/updatequery')
// kobe();

// cup update page
router.get('/cup', (req, res)=>{
     res.send('cuppy');
    // res.render('create/');
});

// roaster update page

// green coffee update page

// bean coffee update page

// shop update page

module.exports = router;