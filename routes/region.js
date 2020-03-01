const express = require("express")
const router = express.Router()

const Country = require("../models/Country");

router.get('/', (req, res) => {
    const {
        name,
        page
    } = req.query;
    if (!req.query.name) {
        Country.paginate({}, {
            page: page,
            limit: 20,
        }).then((result, err) => {
            if (result) {
                res.send(result);
            } else {
                console.log(err);
            }
        })
    } else {
        // Find all the country start with @param(name) case insensitive
        Country.paginate({
            "name": {
                $regex: new RegExp(`^${name}`),
                $options: 'i'
            }
        }, {
            page: page,
            limit: 20
        }).then((result, err) => {
            if (result) {
                res.send(result);
            } else {
                res.send("Not found");
                console.log(err);
            }
        })
    }
})

router.get('/names', (req, res) => {
    Country.find({}, "name").then((result, err) => {
        res.send(result);
    })
})

module.exports = router;