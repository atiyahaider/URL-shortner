const mongoose = require('mongoose');

// Schema for the db
let UrlSchema = new mongoose.Schema({
  originalURL: {type: String,
                required: true},
  shortURL: {type: Number,
             required: true}
})

//* Model for the schema
var Url = mongoose.model('Url', UrlSchema)

// make this available to the users in our Node applications
module.exports = Url;