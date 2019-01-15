const express = require('express');
const router = express.Router();

const newUrl_controller = require('../controllers/newUrlController');
const fetchUrl_controller = require('../controllers/fetchUrlController');

// API endpoint to receive the original URL submitted as a param and create a shortened URL for it
router.get('/new/:originalURL(*)', newUrl_controller.createShortUrl);

// API endpoint to fetch the original URL from the submitted shortened URL
router.get('/:shortURL', fetchUrl_controller.fetchShortUrl);

// Post form 
router.post('/new', newUrl_controller.createShortUrl);

module.exports = router;