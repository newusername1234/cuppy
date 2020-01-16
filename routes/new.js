const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

router.get('/testing', (req, res)=>{
    res.send('yeet');
});

router.get('/greencoffee', (req, res) => {
    res.render('greencoffee');
});

router.post('/greencoffee', parseForm, (req, res) => {
    
});

router.get('/roaster', (req, res) => {
    res.render('roaster');
});

router.post('/roaster', parseForm, (req, res) => {

});

// cup input route, modify later as needed
router.get('/cup', (req, res)=> {
    res.render('newCup', {
        locals: {},
        partials: {}
    })
});

router.post('/cup', parseForm, (req, res)=> {
    console.log(`*** POST from ${req.url}`)
    console.log(req.body);
    res.redirect('cup');

});

router.get('/retailcoffee', (req, res)=>{
    console.log('get request from /retail coffee');
    res.render('newRetailCoffee', {
        locals: {},
        partials: {}
    });
});

module.exports = router;