const db = require('./connection');

// yeet is for distance, kobe is for precision/accuracy
// const yeet = () => console.log('yeet');
function yeet() {
    console.log('Yeet');
}

const kobe = () => console.log('kobe');

async function oneBean(beanID){
    let beans = await db.oneOrNone(`SELECT * from beanCoffee where id=${beanID}`);
    return beans;
}

async function oneShop(shopID){
    let shop = await db.oneOrNone(`SELECT * from shops where id=${shopID}`);
    return shop;
}

async function oneCup(cupID){
    let cup = await db.oneOrNone(`SELECT * from cups WHERE id=${cupID}`);
    return cup;
}

async function oneRoaster(roasterID){
    let roaster = await db.oneOrNone(`SELECT * from roasters WHERE id=${roasterID}`);
    return roaster;
}

async function oneGreenCoffee(greencoffeeID) {
    let greencoffee = await db.oneOrNone(`select * from greencoffee where id = ${greencoffeeID}`);
    return greencoffee;
}

function didChange(a, b) {
    return a !== b;
}
// update functions

async function updateCup(id, name, cost, brewmethod, coffeesize, condiments, didlike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopid, beancoffeeid) {
    await db.any(`
    update cup
        set name=$2, cost=$3, brewmethod=$4, coffeesize=$5, condiments=$6, didlike=$7, flavor=$8, aroma=$9, acidity=$10, sweetness=$11, mouthfeel=$12, comments=$13, score=$14, shopid=$15, beancoffee=$16
    where id = $1;
    `, [id, name, cost, brewmethod, coffeesize, condiments, didlike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopid, beancoffeeid])
}

async function updateRoaster(id, name, location, phonenumber, website) {
    await db.any(`
    update roasters
        set name = '${name}', location = '${location}', phonenumber = '${phonenumber}', website = '${website}'
    where id = ${id};
    `)
}

async function updateGreenCoffee(id, name, countryoforigin, regionoforigin, farm, farmer, elevation, varietal, processingstyle) {
    await db.any(`
    update greencoffee
        set name = '${name}', countryoforigin = '${countryoforigin}', regionoforigin = '${regionoforigin}', farm = '${farm}', farmer = '${farmer}', elevation = '${elevation}', varietal = '${varietal}', processingstyle = '${processingstyle}'
    where id = ${id};
    `)
}

async function allShops(){
    const shops = await db.any(`SELECT id, name from shops`);
    return shops;
}

async function allBeans(){
    const beans = await db.any(`SELECT id, name from beanCoffee`);
    return beans;    
}

module.exports = {
    yeet,
    kobe,
    oneRoaster,
    oneGreenCoffee,
    oneCup,
    oneShop,
    oneBean,
    updateRoaster,
    updateGreenCoffee,
    updateCup,
    didChange,
    allShops,
    allBeans
}