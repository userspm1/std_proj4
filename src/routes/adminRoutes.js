const express = require('express');
const { addProduct,updateProduct,deleteProduct, getProducts,} = require('../controllers/adminController');
const router = express.Router(); 

router.post('/addproduct',  addProduct);
router.get('/getProduct',  getProducts);
router.put('/addproduct/:id', updateProduct);
router.delete('/products/:id', deleteProduct);


module.exports = router; 

// Route to get a file by filename
// router.get('/file/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json({ error: 'No file found' });
//     }

//     // Read the file from GridFS
//     const readstream = gfs.createReadStream(file.filename);
//     readstream.pipe(res);
//   });
// });

// module.exports = router;