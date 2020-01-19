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



module.exports = {
    yeet,
    kobe,
    oneRoaster,
    didChange
}