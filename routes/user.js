const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');


router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getUserById);
router.patch('/:id', auth, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
