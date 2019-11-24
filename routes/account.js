const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/account');


router.post('/createUser', userCtrl.signup);
router.post('/signin', userCtrl.signin);

module.exports = router;