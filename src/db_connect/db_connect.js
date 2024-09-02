const mongoose = require("mongoose");
require('dotenv').config();

const dbConfig = () => {

    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.error("Cannot connect to the database!", err);
        process.exit(1); // Exit with failure
    });

}
module.exports = dbConfig;


