const db = require('./connection');
const bcrypt = require('bcryptjs');
const { oneCup } = require('./apiquery');

function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

async function create(username, firstname, lastname, email, phonenumber, password) {
    const hash = createHash(password);
    const result = await db.one(`
insert into users
    (username, firstname, lastname, email, phonenumber, hash)
values
    ($1, $2, $3, $4, $5, $6)
returning id
    `, [username, firstname, lastname, email, phonenumber, hash]);
    
    return result.id;    
}

async function login(username, password) {
    const theUser = await getByUsername(username);
    return bcrypt.compareSync(password, theUser.hash);
}

async function getByUsername(username) {
    const theUser = await db.one(`
    select * from users where username=$1
    `, [username]);

    return theUser;
}

async function getCups(userId) {
    let userCups = await db.any(`
    select id from cups where userid=$1
    `, [userId]);
    userCups = userCups.map(x => x.id);
    let newCups = [];
    for (let id of userCups) {
        newCups += await oneCup(id);
    };
    console.log(oneCup(1));
    return newCups;
}

module.exports = {
    create,
    login,
    getByUsername,
    getCups,
};