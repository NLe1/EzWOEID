const mongoose = require('mongoose');
const config = require('config');
const db = config.get("Customer.mongoURI");
const Country = require('./models/Country');

const fs = require('fs');


readFile();
// run().catch(error => console.log(error.stack));

function readFile() {
    fs.readFile('./WOEID.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log('File cannot be read: ', err);
            return
        }
        if (jsonString != "") {
            createTable(jsonString)
        }
    })
}

async function createTable(jsonString) {
    const table = JSON.parse(jsonString);
    await run(table).catch(error => console.log(error.stack));
}

async function run(table) {
    await mongoose
        .connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));
    // Clear the database every time. This is for the sake of example only,
    // don't do this in prod :)
    await mongoose.connection.dropDatabase();
    for (country of table) {
        await Country.create(new Country(country));
    }
    // Find all customers
    // const docs = await Country.find();
}