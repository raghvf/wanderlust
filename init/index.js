const mongoose = require("mongoose");
const initdata = require("./data");
const Listing = require("../models/listing");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

const initDB = async () => {

    await Listing.deleteMany({});

    initdata.data = initdata.data.map(obj => ({
        ...obj,
        owner: new mongoose.Types.ObjectId("69aeffc4461ed98101da1cb3")
    }));

    await Listing.insertMany(initdata.data);

    console.log("Data initialized");

    await mongoose.connection.close();
};

initDB();