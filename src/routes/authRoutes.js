const express = require('express');
const { register, login ,updateUser,logout,addProducts, getUser} = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getuser/:email', getUser);
router.put('/user/:id', updateUser);
router.post('/logout', logout);
router.post('/addProducts/:email', addProducts);


module.exports = router;
