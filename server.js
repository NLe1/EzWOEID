const express = require('express')
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 5000

const app = express()
const db = config.get("Customer.mongoURI");

app.use(cors())
app.use("/region", require('./routes/region'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/client/public'), {
    index: false
}))

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
})


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    //SET static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));