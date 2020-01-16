const db = require('./connection');

function yeet() {
    console.log('teey')
}



// new cup querries for shop you got it from and retail coffee
// createcup(database items except the ids)
// destructure in the controller, run this function on the pieces

async function createCup(userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID) {
    await db.any(`
    insert into cups 
        (userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID)
    values
        ($1,  $2,  $3,  $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    `, [userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID]);
    
}



module.exports = {
    yeet,
    createCup
}