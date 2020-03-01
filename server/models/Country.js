const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
//create Schema
const CountrySchema = new Schema({
    name: String,
    placeType: {
        code: Number,
        name: String
    },
    url: String,
    parentid: Number,
    country: String,
    woeid: Number,
    countryCode: Schema.Types.Mixed
});

CountrySchema.plugin(mongoosePaginate);

module.exports = Country = mongoose.model("country", CountrySchema);