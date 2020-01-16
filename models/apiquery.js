const db = require('./connection');

async function allShops(){
    const shops = await db.any('SELECT id, name from shops');
    console.log(shops);
    return shops;
}

allShops();