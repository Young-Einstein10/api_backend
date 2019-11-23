const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');


router.post('/signin', adminCtrl.adminSignin);

module.exports = router;