const express = require('express');
const router = express.Router();
const api = require('../models/apiquery');
const { makeError, error404, handleRouteErrors } = require('./errors');
router.get('/testing', (req, res)=>{
    res.send('yeet');
});

//needs to go to a API documentation page
router.get('/', (req,res)=>{
    res.send('API pages')
});

router.get('/:apikey/cups', async (req,res)=>{
    let { apikey } = req.params;
    const cups = await api.allCups();
    res.json(cups);
});

//returns full info for given shop, and all roasters using/used
router.get('/:apikey/cups/:id(\\d+)', async (req,res)=> {
    let { apikey, id } = req.params;
    const cup = await api.oneCup(id);
    res.json(cup);
});

//returns name and id for all shops
router.get('/:apikey/shops', async (req,res)=>{
    let { apikey } = req.params;
    const shops = await api.allShops();
    res.json(shops);
});

//returns full info for given shop, and all roasters using/used
router.get('/:apikey/shops/:id(\\d+)', async (req,res)=> {
    let { apikey, id } = req.params;
    const shop = await api.oneShop(id);
    res.json(shop);
});

//returns name and id for all whole bean coffees
router.get('/:apikey/bean', async (req,res)=>{
    let { apikey } = req.params;
    const beans = await api.allBeans();
    res.json(beans);
});

//returns full info for given whole bean coffee
router.get('/:apikey/bean/:id(\\d+)', async (req,res)=>{
    let { apikey, id } = req.params;
    const bean = await api.oneBean(id);
    res.json(bean);
});


//returns name and id for all roasters
router.get('/:apikey/roasters', async (req,res)=>{
    let { apikey } = req.params;
    const roasters = await api.allRoasters();
    res.json(roasters);
});

//returns full info for given roaster, including list of cafes using
router.get('/:apikey/roasters/:id(\\d+)', async (req,res)=>{
    let { apikey, id } = req.params;
    const roaster = await api.oneRoaster(id);
    res.json(roaster);
});

//returns full info for all green coffees.
router.get('/:apikey/green', async (req,res)=>{
    let { apikey } = req.params;
    const greens = await api.allGreen();
    res.json(greens);
});

//returns full info for given green coffee id.
router.get('/:apikey/green/:id(\\d+)', async (req,res)=>{
    let { apikey, id } = req.params;
    const green = await api.oneGreen(id);
    res.json(green);
});

router.use(error404);

router.use(handleRouteErrors);

module.exports = router;