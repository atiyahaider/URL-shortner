const Url = require('../models/url');
const getDb = require("../util/db").getDb;

exports.fetchShortUrl = function (req, res) {

  var shortURL = req.params.shortURL;
  
  //Read the db to find the corresponding url from the short id
  const conn = getDb();  //get instance of db
  Url.findOne({'shortURL': shortURL}, function(err, data) {
    if (err) {
      console.log('Error reading DB');
      done(err);
    }
    else {
      if (data)
        res.redirect(data.originalURL);
      else
        res.json({"error":"No such URL found"});
    } 
  }); 
};

function done (err, data) {
  if (err) throw err;
  // Display the data
  console.log(data)
}