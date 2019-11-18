const express = require('express');
const router = express.Router();
const feed = require('../controllers/feed');
const auth = require('../middleware/auth');


router.get('/', auth, feed.getFeed);

module.exports = router;