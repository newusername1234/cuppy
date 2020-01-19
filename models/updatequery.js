const db = require('./connection');

// yeet is for distance, kobe is for precision/accuracy
// const yeet = () => console.log('yeet');
function yeet() {
    console.log('Yeet');
}

const kobe = () => console.log('kobe');

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
    updateRoaster,
    updateGreenCoffee,
    didChange,
    allShops,
    allBeans
}