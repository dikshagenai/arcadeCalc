const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/ArcadeCalc?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

// const mongoURI = "mongodb+srv://deepanshu-prajapati01:k3u6sgEoCT8CMeO2@mydatabase.t63by.mongodb.net/ArcadeCalc?retryWrites=true&w=majority&appName=myDataBase"


const mongoURI = "mongodb+srv://deepanshu-prajapati01:k3u6sgEoCT8CMeO2@mydatabase.t63by.mongodb.net/ArcadeCalc?retryWrites=true&w=majority&appName=myDataBase"


const connectToMongo = () => {
    mongoose.connect(mongoURI)
    console.log("Connected to Mongo Successfully");
}

module.exports = connectToMongo;