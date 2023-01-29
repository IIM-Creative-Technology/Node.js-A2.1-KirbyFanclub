require('dotenv').config();
const mongoose = require('mongoose');


connectDatabase().catch(err => console.log(err));

async function connectDatabase(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log('db connecté');
}

module.exports = {
    connectDatabase
}
