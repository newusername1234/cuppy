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
    
}
// new beanCoffee

// new greenCoffee

// new roaster

// new shop



module.exports = {
    createCup,
    // createBeanCoffee,
    // createGreenCoffee,
    // createRoaster,
    // createShop,
    yeet
}