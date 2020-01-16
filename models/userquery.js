const db = require('./connection');
const bcrypt = require('bcryptjs');

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
    `, [username, firstname, lastname, email, phonenumber, hash]);
    
    return result;    
}


async function login(username, password) {
    const theUser = await getByUsername()
}

module.exports = {
    create,

}