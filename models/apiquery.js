const db = require('./connection');

async function allShops(){
    const shops = await db.any(`SELECT id, name from shops`);
    return shops;
}

async function oneShop(shopID){
    let shop = await db.one(`SELECT * from shops where id=${shopID}`);
    delete shop.shopownerid;


    let roasters = await db.any(`SELECT roasterID from roasters_shops WHERE shopID=${shopID}`);
    console.log(roasters);
    if (roasters !=[]){
        let roasterString = roasters.map(y => `id=${y.roasterid}`).join(' OR ');
        let newRoasters = await db.any(`select name from roasters where ${roasterString}`);
        shop.featuredRoasters = newRoasters.map(z => z.name);
    }


    
    return shop;
}

async function allBeans(){
    const beans = await db.any(`SELECT id, name from beanCoffee`);
    return beans;    
}

async function oneBean(beanID){
    let beans = await db.one(`SELECT * from beanCoffee where id=${beanID}`);
    console.log(beans);
    const roaster = await db.one(`SELECT name from roasters where id=${beans.roasterid}`);
    beans.roaster = roaster.name;
    delete beans.roasterid;
    console.log(roaster);
    console.log(beans);
    const green = await oneGreen(beans.greencoffeeid);
    delete beans.greencoffeeid;
    delete green.id;
    console.log(green);
    beans = Object.assign(beans, green);
    return beans;
}

async function allRoasters(){
    const roasters = await db.any(`SELECT id, name from roasters`);
    return roasters;
}

async function oneRoaster(roasterID){
    let roaster = await db.one(`SELECT * from roasters WHERE id=${roasterID}`);
    let shops = await db.any(`SELECT shopID from roasters_shops WHERE roasterID=${roasterID}`);
    if (shops != []){
        let shopstring = shops.map(y => `id=${y.shopid}`).join(' OR ');
        let newShops = await db.any(`select name from shops where ${shopstring}`);
        roaster.atshops = newShops.map(z => z.name);
    }
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