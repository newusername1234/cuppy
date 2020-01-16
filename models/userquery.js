const db = require('./connection');
const bcrypt = require('bcryptjs');

function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function create(username, password) {
    const hash = createHash(password);
    const newUser = {
        username,
        hash
    };
}

async function login(username, password) {
    const theUser = await getByUsername()
}

module.exports = {
    createHash,

}