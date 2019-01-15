const Url = require('../models/url');
const checkUrl = require('../util/urlValidation').checkUrl;
const getDb = require("../util/db").getDb;

exports.createShortUrl = function (req, res) {
  var originalURL;
  var uniqueId;
  
  if (req.method === 'POST') //coming from form
    originalURL = req.body.url;
  else       //coming from API
    originalURL = req.params.originalURL;

  //validate the URL & receive the formated url
  checkUrl(originalURL, function(err, result, formattedURL) {
    if (!result) 
      res.json({"error":"invalid URL"});
    else { //if url valid..
      //Read the db to find the first largest id and then create a uniqueId
      const conn = getDb();  //get instance of db
      conn.db.listCollections({name: 'urls'}).toArray(function (err, collectionNames) {
        if (err) {
          console.log('listCollection err ' + err);
          done(err);
        }
        else {
          if (collectionNames.length === 0) {
            uniqueId = 0;
            saveUrl(originalURL, formattedURL, done);
          }
          else {
            //check for duplicate
            checkDuplicate(formattedURL, function (err, duplicate) {
                if (duplicate)
                  res.json({"error": "Duplicate URL"});
                else {  //duplicate not found, find the largest id
                  Url.find().sort('-shortURL').limit(1).exec(function(err, data){
                    if (err) {
                      console.log('Error finding a document');
                      done(err);
                    }
                    else {
                      uniqueId = data[0].shortURL + 1;
                      saveUrl(originalURL, formattedURL, done);
                    } //else no error on find
                  });  //.find
                } //else duplicate not found
              });   //check duplicate
          } //else collection found
        } //else no error on collection
      }); //.toArray */
    } //if urlvalid
  });  //checkURL

  
  function checkDuplicate(formattedURL, done) {
    Url.findOne({'originalURL': formattedURL}, function(err, data){
      if (err) {
        console.log('Error finding a duplicate');
        done(err);
      }
      else {
        if (data)  //duplciate found
          return done(null, true);
        else    //duplicate not found
          return done(null, false);
      }
    })
  };
    
  
  function saveUrl(originalURL, formattedURL, done){
    //create a new document and save the object in db
    var url = new Url(
        {originalURL: formattedURL, 
         shortURL: uniqueId}
        );

    url.save(function (err, data){
      if (err) {
        console.log('err ' + err);
        done(err);
      }
      else {
        console.log('new url successfully saved'); 
        done(null, data);    
      }
    }); //.save

    //Display the shortened url in json response
    res.json({"original_url": originalURL,"short_url": uniqueId});
  }  
  
};

function done (err, data) {
  if (err) throw err;
  // Display the data
  console.log(data)
}