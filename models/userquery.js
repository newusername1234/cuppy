const db = require('./connection');
const bcrypt = require('bcryptjs');
const { oneCup } = require('./apiquery');
const { uuid } = require('uuidv4');

function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

async function create(username, firstname, lastname, email, phonenumber, password) {
    const hash = createHash(password);
    const apiKey = uuid();
    const apicalls =0;
    const apitimestamp = new Date;
    const isadmin = FALSE;
    console.log(apitimestamp);
    console.log(apitimestamp.toISOString());
    const result = await db.one(`
insert into users
    (username, firstname, lastname, email, phonenumber, hash, apikey, apicalls, apitimestamp, isadmin)
values
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning id
    `, [username, firstname, lastname, email, phonenumber, hash, apiKey, apicalls, apitimestamp.toISOString(), isadmin]);
    
    return result.id;    
}

async function login(username, password) {
    const theUser = await getByUsername(username);
    console.log(theUser);
    if(theUser){
        if (theUser.hash){
            return bcrypt.compareSync(password, theUser.hash);
        }
    }
    return false;
}

async function getByUsername(username) {
    const theUser = await db.oneOrNone(`
    select * from users where username=$1
    `, [username]);

    return theUser;
}

async function getCups(userId) {
    let userCups = await db.any(`
    select id from cups where userid=$1
    `, [userId]);
    console.log(userCups);
    userCups = userCups.map(x => x.id);
    console.log(userCups);
    let newCups = [];
    for (let id of userCups) {
        let aCup = await oneCup(id);
        delete aCup.id;
        newCups.push(aCup);
        console.log(newCups);
    };
    // console.log(oneCup(1));
    return newCups;
}

module.exports = {
    create,
    login,
    getByUsername,
    getCups
};