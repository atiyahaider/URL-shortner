// server.js
// where your node app starts

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const shortUrl = require('./routes/shortUrlRoute');  //import route for shortURL

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that the API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// Mount the body-parser middleware to get ready for POST Requests
// place it before all the routes !
app.use(bodyParser.urlencoded({extended: false}))

// Serve static assets (CSS)
var absoluteAssetsPath = __dirname + "/public";
app.use(express.static(absoluteAssetsPath))

// Serve the index.HTML file 
var absolutePath = __dirname + "/views/index.html"
app.get("/", function(req, res) {
        res.sendFile(absolutePath);
});

//other routes
app.use('/api/shorturl', shortUrl);

const initDb = require("./util/db").initDb;
// const getDb = require("./util/db").getDb;
const port = process.env.PORT || 3000;

//initialize db before starting up the server
initDb(function (err) {
    app.listen(port, function (err) {
        if (err) {
            throw err;
        }
        console.log("API Up and running on port " + port);
    });
});