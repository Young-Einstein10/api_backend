const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');


router.get('/', userCtrl.getAllUsers);
// router.post('/', userCtrl.createUser);
router.get('/:id', auth, userCtrl.getUserById);
router.put('/:id', auth, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
