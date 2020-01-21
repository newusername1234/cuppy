const db = require('./connection');

async function allCups(){
    const cups = await db.any(`SELECT id, name from cups`);
    return cups;
}

async function allCupsAPI(apikey){
    const user =await getUserFromAPIKey(apikey);
    const cups = await db.any(`SELECT id, name from cups where userid=${user.id}`);
    return cups;
}

async function oneCupAPI(apikey, cupID){
    const userid = await getUserFromAPIKey(apikey);
    const cupUser = await db.oneOrNone(`SELECT userid from cups where id=${cupID}`);
    console.log(userid);
    console.log(cupUser);
    if (userid.id == cupUser.userid){
        const cup = await oneCup(cupID);
        return cup;
    }
    return {error: "access restricted"};
}

async function oneCup(cupID){
    let cup = await db.oneOrNone(`SELECT * from cups where id=${cupID}`);
    delete cup.userid;
    // console.log(cup);
    if(cup){
        if(cup.shopid){
            let shop = await db.one(`SELECT name from shops where id=${cup.shopid}`);
            // console.log(shop);
            if(shop){
                cup.shopname = shop.name;
            }
        }
        delete cup.shopid;
        if(cup.beancoffeeid){
            let bean = await oneBean(cup.beancoffeeid);
            // console.log(bean);
            delete bean.averageScore;
            delete bean.id;
            bean.beanname = bean.name;
            delete bean.name;
            cup = Object.assign(cup, bean); 
        }
        delete cup.beancoffeeid;
        // console.log(cup);
        return cup;
    }
    return {};
}

async function allShops(){
    const shops = await db.any(`SELECT id, name from shops`);
    return shops;
}

async function oneShop(shopID){
    let shop = await db.oneOrNone(`SELECT * from shops where id=${shopID}`);
    if(shop){
        delete shop.shopownerid;
        let roasters = await db.any(`SELECT roasterID from roasters_shops WHERE shopID=${shopID}`);
        if (roasters !=[]){
            let roasterString = roasters.map(y => `id=${y.roasterid}`).join(' OR ');
            let newRoasters = await db.any(`select name from roasters where ${roasterString}`);
            shop.featuredRoasters = newRoasters.map(z => z.name);
        } else {
            shop.featuredRoasters = ['No known roasters'];
        }
        let cupScores = await db.any(`SELECT score from cups where shopID=${shopID}`);
        let scoreAvg = 0;
        let cupLen = cupScores.length;
        if (cupLen == 1){
            scoreAvg = cupScores[0].score;
        } else if(cupLen > 1){
            scoreAvg = cupScores.reduce((x, y) => x.score + y.score)/cupLen;
        }
        shop.averageScore = scoreAvg;
        return shop;
    }
    return {};
}

async function allBeans(){
    const beans = await db.any(`SELECT id, name from beanCoffee`);
    return beans;    
}

async function oneBean(beanID){
    let beans = await db.oneOrNone(`SELECT * from beanCoffee where id=${beanID}`);
    if (beans){
        // console.log(beans);
        if(beans.roasterid){
            const roaster = await db.oneOrNone(`SELECT name from roasters where id=${beans.roasterid}`);
            beans.roaster = roaster.name;
            delete beans.roasterid;
        }
        if(beans.greencoffeeid){
            const green = await oneGreen(beans.greencoffeeid);
            delete beans.greencoffeeid;
            delete green.id;
            beans.greenname = green.name;
            delete green.name;
            // console.log(green);
            beans = Object.assign(beans, green);
        }
        let cupScores = await db.any(`SELECT score from cups where beanCoffeeID=${beanID}`);
        let scoreAvg = 0;
        let cupLen = cupScores.length;
        if (cupLen == 1){
            scoreAvg = cupScores[0].score;
        } else if(cupLen > 1){
            scoreAvg = cupScores.reduce((x, y) => x.score + y.score)/cupLen;
        }
        beans.averageScore = scoreAvg;
        return beans;
    }
    return {};
}

async function allRoasters(){
    const roasters = await db.any(`SELECT id, name from roasters`);
    return roasters;
}

async function oneRoaster(roasterID){
    let roaster = await db.oneOrNone(`SELECT * from roasters WHERE id=${roasterID}`);
    
    if (roaster){
        let shops = await db.any(`SELECT shopID from roasters_shops WHERE roasterID=${roasterID}`);
        if (shops != []){
            let shopstring = shops.map(y => `id=${y.shopid}`).join(' OR ');
            let newShops = await db.any(`select name from shops where ${shopstring}`);
            roaster.atshops = newShops.map(z => z.name);
        }
        let beans = await db.any(`SELECT id from beanCoffee where roasterID=${roasterID}`);
        beans = beans.map(x=>x.id);
        let cupScores = [];
        for (let beanCoffeeID of beans){
            let beanScores = await db.any(`SELECT score from cups where beanCoffeeID=${beanCoffeeID}`);
            cupScores = cupScores.concat(beanScores.map(x => x.score));
        }
        let scoreAvg = 0;
        let cupLen = cupScores.length;
        if (cupLen == 1){
            scoreAvg = cupScores[0];
        } else if(cupLen > 1){
            scoreAvg = cupScores.reduce((x, y) => x + y)/cupLen;
        }
        roaster.averageScore = scoreAvg;
        return roaster;
    }
    return {};
}

async function allGreen(){
    const greens = await db.any(`SELECT id, name from greenCoffee`);
    return greens;
}

async function oneGreen(greenID){
    const green = await db.oneOrNone(`SELECT * from greenCoffee WHERE id=${greenID}`);
    if (green){
        return green;
    }
    return {};
}

async function getApiKey(userID){
    const user = await db.oneOrNone(`SELECT * from users where id=${userID}`);
    if (user){
        return user.apikey;
    }
    return {};
}

async function getUserFromAPIKey(apikey){
    let user = await db.oneOrNone(`Select id from users where apikey='${apikey}'`);
    return user;
}

function convertSQLDateToJS(sqlDate){

    let dateTimeParts= sqlDate.split(/[- :]/);
    dateTimeParts[1]--;
    console.log("DATETIMEPARTS = " + dateTimeParts);
    const JSDate = new Date(...dateTimeParts);

    console.log("JSDATE = " + JSDate);
    let JSDateH = new Date(JSDate.setTime(JSDate.getTime() + (60*60*1000)));
    console.log("JSDATE + 1 HOUR =" + JSDateH);

    
    let JSDateHvO = JSDateH.valueOf();
    let JSDatevO = JSDate.valueOf();
    console.log("JSDATEHv0 = " + JSDateHvO);
    console.log("JSDATEv0 = " + JSDatevO);
    let trueFalse = (JSDateHvO > JSDatevO);
    console.log("IS JSDateH > JSDate " + trueFalse );
    return JSDate;
}

async function keyVerifier(apikey){
    const apikeys = await db.any('SELECT apikey from users');
    let apiarray = apikeys.map(x => x.apikey);
    if(apiarray.includes(apikey)){
        const user = await db.one(`SELECT * from users where apikey='${apikey}'`);
        let { id, apicalls, apitimestamp } = user;
        apicalls +=1;
        console.log(apitimestamp.split(/[- :]/));
        // console.log(apitimestamp.toString());
        // let apiHour = apitimestamp.toISOString().slice(11,12);
        // let currentHour = new Date;
        // currentHour = currentHour.getHours();
        // console.log(apiHour);
        // console.log(currentHour);
        // console.log("apitimestamp = " + apitimestamp);
        // let thingy =new Date().toISOString().slice(0, 19).replace('T', ' ');
        // console.log("new Date thingy = " + thingy);
        // //if(apitimestamp + 1 hour < currentTime){
        //     apicalls = 1;
        //     apitimestamp = currentTime;
        //}
        const tally = await db.any(`UPDATE users SET apicalls=${apicalls}, apitimestamp='${apitimestamp}' WHERE id=${id}`);
        return true;
    }
    return false;
}

async function main(){
    let thingy = await keyVerifier("292100f9-76cb-4a63-be7b-2ea67e901c09");
    console.log(thingy);
}

main();

//convertSQLDateToJS('2020-01-20 20:29:40');



module.exports = {
    oneCup,
    oneCupAPI,
    allCups,
    allCupsAPI,
    allShops,
    oneShop,
    allBeans,
    oneBean,
    allRoasters,
    oneRoaster,
    allGreen,
    oneGreen,
    getApiKey,
    keyVerifier
}