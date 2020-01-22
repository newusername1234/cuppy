const db = require('./connection');

// yeet is for distance (and testing)
function yeet() {
    console.log('teey')
}

///// DATABASE ENTRIES FUNCTIONS /////

// new cup
async function createCup(userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID) {
    await db.any(`
    insert into cups 
        (userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID)
    values
        ($1,  $2,  $3,  $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    `, [userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID]);
    
    //checks to see if shop and roaster relationship exists in shops_roasters already, and if not, add it.
    let roasterid = await db.one(`SELECT roasterid from beancoffee where id=${beanCoffeeID}`);
    console.log(roasterid);
    let linky = await db.any(`SELECT roasterID from roasters_shops where shopid=${shopID}`);
    console.log(linky);
    roasterid = roasterid.roasterid;
    console.log(roasterid);
    linky = linky.map(x => x.roasterid);
    console.log(linky);
    if(linky.includes(roasterid) == false){
        await db.any(`insert into roasters_shops (roasterid, shopid) VALUES (${roasterid}, ${shopID})`);
    }    
}
// new beanCoffee
async function createBeanCoffee(name, roastProfile, roasterid, greencoffeeid) {
    await db.any(`
    insert into beancoffee
        (name, roastProfile, roasterid, greencoffeeid)
    values
        ($1, $2, $3, $4)
    `, [name, roastProfile, roasterid, greencoffeeid])
}

// new greenCoffee
async function createGreenCoffee(name, countryOfOrigin, regionOfOrigin, farm, farmer, elevation, varietal, processingStyle) {
    await db.any(`
    insert into greencoffee
        (name, countryOfOrigin, regionOfOrigin, farm, farmer, elevation, varietal, processingStyle)
    values 
        ($1,  $2,  $3,  $4, $5, $6, $7, $8)
    `, [name, countryOfOrigin, regionOfOrigin, farm, farmer, elevation, varietal, processingStyle])
}

// new roaster
async function createRoaster(name, location, phoneNumber, website) {
    await db.any(`
    insert into roasters
        (name, location, phoneNumber, website)
    values 
        ($1,  $2,  $3,  $4)
    `, [name, location, phoneNumber, website]);
}

// new shop
async function createShop(name, location, phoneNumber, hours, website) {
    await db.any(`
    insert into shops
        (name, location, phoneNumber, hours, website)
    values
        ($1,  $2,  $3,  $4, $5)
    `, [name, location, phoneNumber, hours, website]);
}


module.exports = {
    createCup,
    createBeanCoffee,
    createGreenCoffee,
    createRoaster,
    createShop,
    yeet
}