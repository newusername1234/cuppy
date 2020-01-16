const express = require('express');
const router = express.Router();
const api = require('../models/apiquery');

router.get('/testing', (req, res)=>{
    res.send('yeet');
});

router.get('/', (req,res)=>{
    res.send('API pages')
});

//returns name and id for all shops
router.get('/shops', async (req,res)=>{
    const shops = await api.allShops();
    res.json(shops);
});

//returns full info for given shop, and all roasters using/used
router.get('/shops/:id', async (req,res)=> {
    const shop = await api.oneShop(req.params.id);
    res.json(shop);
});

//returns name and id for all whole bean coffees
router.get('/bean', async (req,res)=>{
    const beans = await api.allBeans();
    res.json(beans);
});

//returns full info for given whole bean coffee
router.get('/bean/:id', async (req,res)=>{
    const bean = await api.oneBean(req.params.id);
    res.json(bean);
});


//returns name and id for all roasters
router.get('/roasters', async (req,res)=>{
    const roasters = await api.allRoasters();
    res.json(roasters);
});

//returns full info for given roaster, including list of cafes using
router.get('/roasters/:id', async (req,res)=>{
    const roaster = await api.oneRoaster(req.params.id);
    res.json(roaster);
});

//returns full info for all green coffees.
router.get('/green', async (req,res)=>{
    const greens = await api.allGreen();
    res.json(greens);
});

//returns full info for given green coffee id.
router.get('/green/:id', async (req,res)=>{
    const green = await api.oneGreen(req.params.id);
    res.json(green);
});


module.exports = router;