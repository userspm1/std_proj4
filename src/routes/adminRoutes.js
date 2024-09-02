const express = require('express');
const { addProduct,updateProduct,deleteProduct, getProducts, getImage, getProducbyId,} = require('../controllers/adminController');
const router = express.Router(); 

router.post('/addproduct',  addProduct);
router.get('/getProduct',  getProducts);
router.get('/getProduct/:id',  getProducbyId);
router.put('/addproduct/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/image/:filename', getImage);

module.exports = router; 
