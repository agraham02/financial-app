const mongoose = require("mongoose");

const mongoURI = process.env.LOCAL_DATABASE_URL;

const dbOptions = {
};

mongoose.connect(mongoURI, dbOptions);

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Database");
});

mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB: " + err);
});

module.exports = mongoose;
