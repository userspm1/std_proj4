const express = require('express');
const { register, login ,updateUser,logout,addProducts} = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/user/:id', updateUser);
router.post('/logout', logout);
router.post('/addProducts/:email', addProducts);


module.exports = router;
