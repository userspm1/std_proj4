const express = require('express'); 
const { placeOrder, getOrder } = require('../controllers/orderController');
const router = express.Router();


router.post('/order', placeOrder); 
router.get('/get/order', getOrder); 
module.exports = router