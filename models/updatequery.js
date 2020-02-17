const db = require('./connection');
const API = require('./apiquery');

// yeet is for distance, kobe is for precision/accuracy
// const yeet = () => console.log('yeet');
function yeet() {
    console.log('Yeet');
} 

const kobe = () => console.log('kobe');

async function oneBean(beanID){
    let beans = await db.oneOrNone(`SELECT * from beancoffee where id=${beanID}`);
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

async function updateShop(id, name, location, phonenumber, hours, website){
    await db.any(`
    update shops
        set name=$2, location=$3, phonenumber=$4, hours=$5, website=$6
    where id=$1
    `, [id, name, location, phonenumber, hours, website])
}

async function updateBeancoffee(id, name, roastprofile, roasterid, greencoffeeid) {
    await db.any(`
    update beancoffee
        set name=$2, roastprofile=$3, roasterid=$4, greencoffeeid=$5
    where id=$1
    `, [id, name, roastprofile, roasterid, greencoffeeid])
}

async function updateCup(id, name, cost, brewmethod, coffeesize, condiments, didlike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopid, beancoffeeid) {
    if(cost == ''){
        cost = 0;
    }
    if(score == ''){
        score = 5;
    }
    await db.any(`
    update cups
        set name=$2, cost=$3, brewmethod=$4, coffeesize=$5, condiments=$6, didlike=$7, flavor=$8, aroma=$9, acidity=$10, sweetness=$11, mouthfeel=$12, comments=$13, score=$14, shopid=$15, beancoffeeid=$16
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
    const beans = await db.any(`SELECT id, name from beancoffee`);
    return beans;    
}

async function allGreen() {
    const greens = await db.any(`SELECT id, name from greencoffee`);
    return greens;
}

async function allRoasters() {
    const roasters = await db.any(`SELECT id, name from roasters`);
    return roasters;
}

async function allCups(userid){
    const cups = await db.any(`SELECT id from cups where userid=$1`, [userid]);
    console.table(cups);
    console.log(cups[0].id);
    
    const cupsArr =Promise.all(cups.map(async cup => API.oneCup(cup.id)));
    
    // cupsArr = [];
    // for (let cup of cups){
    //     let newCup = await API.oneCup(cup.id);
    //     cupsArr.push(newCup);
    // }
    
    
    return cupsArr;
}

async function allRoastersFull(userid) {
    const roasters = await db.any(`SELECT * from roasters where userid=$1`, [userid]);
    return roasters;
}

async function allBeansFull(userid) {
    const beans = await db.any(`SELECT * from beancoffee where userid=$1`, [userid]);
    return beans;
}

async function allGreenFull(userid) {
    const greens = await db.any(`SELECT * from greencoffee where userid=$1`, [userid]);
    return greens;
}

async function allShopsFull(userid){
    const shops = await db.any(`SELECT * from shops where userid=$1`, [userid]);
    return shops;
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
    updateBeancoffee,
    updateCup,
    updateShop,
    didChange,
    allShops,
    allBeans,
    allGreen,
    allRoasters,
    allCups,
    allRoastersFull,
    allBeansFull,
    allGreenFull,
    allShopsFull
}