const db = require('./connection');

// yeet is for distance, kobe is for precision/accuracy
// const yeet = () => console.log('yeet');
function yeet() {
    console.log('Yeet');
}

const kobe = () => console.log('kobe');

async function oneRoaster(roasterID){
    let roaster = await db.oneOrNone(`SELECT * from roasters WHERE id=${roasterID}`);
    return roaster;
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

module.exports = {
    yeet,
    kobe,
    oneRoaster,
    updateRoaster,
    didChange
}