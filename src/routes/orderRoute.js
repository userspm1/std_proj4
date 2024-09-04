const express = require('express'); 
const { placeOrder, getOrder, updateOrder } = require('../controllers/orderController');
const router = express.Router();


router.post('/order', placeOrder); 
router.get('/get/order', getOrder); 
router.put('/update/order/:id', updateOrder); 
module.exports = router