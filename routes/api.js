const express = require('express');
const router = express.Router();

router.get('/testing', (req, res)=>{
    res.send('yeet');
});


module.exports = router;