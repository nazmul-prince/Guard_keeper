const mongoose = require('mongoose');
const config = require('config');

const db = config.get("mongoDbURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser:true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Mongo db connected');
    } catch (error) {      
        console.log('Mongo db failed to be connected');
        process.exit(1);
    }
}

module.exports = connectDB;