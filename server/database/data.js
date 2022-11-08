const mongoose = require("mongoose");

const connString = `mongodb+srv://sushil03:${process.env.DB_PASS}@cluster0.igc3o5n.mongodb.net/?retryWrites=true&w=majority`;
const connectDB = () => {
    mongoose
        .connect(connString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(
                `Database is connected finally 🥳 ${data.connection.host}`
            );
        })
        .catch((error) => {
            console.log(`Error Occured 🥲`, error);
        });
};
module.exports = connectDB;
