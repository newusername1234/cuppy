const db = require('./connection');

async function allShops(){
    const shops = await db.any(`SELECT id, name from shops`);
    return shops;
}


//change query to hide ownerID
async function oneShop(shopID){
    let shop = await db.one(`SELECT * from shops where id=${shopID}`);
    delete shop.shopownerid;
    return shop;
}

async function allBeans(){
    const beans = await db.any(`SELECT id, name from beanCoffee`);
    return beans;    
}

//change query to pull roaster and greencoffee instead of just the ID
async function oneBean(beanID){
    const beans = await db.one(`SELECT * from beanCoffee where id=${beanID}`);
    return beans;
}

async function allRoasters(){
    const roasters = await db.any(`SELECT id, name from roasters`);
    return roasters;
}

async function oneRoaster(roasterID){
    const roaster = await db.one(`SELECT * from roasters WHERE id=${roasterID}`);
    return roaster;
}

async function allGreen(){
    const greens = await db.any(`SELECT * from greenCoffee`);
    return greens;
}

async function oneGreen(greenID){
    const green = await db.one(`SELECT * from greenCoffee WHERE id=${greenID}`);
    return green;
}

module.exports = {
    allShops,
    oneShop,
    allBeans,
    oneBean,
    allRoasters,
    oneRoaster,
    allGreen,
    oneGreen
}