const express = require('express');
const router = express.Router();

router.get('/testing', (req, res)=>{
    res.send('yeet');
});

router.get('/', (req,res)=>{
    res.render('api');
});

router.get('/shops', (req,res)=>{
    res.json("");
});

router.get('/')



module.exports = router;