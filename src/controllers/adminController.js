const Product = require('../Models/productModel'); // Adjust path as necessary
const path = require('path');
const multer = require('multer')
const express = require('express')
const app = express()
const { GridFSBucket } = require('mongodb');
const { Readable } = require('stream');
const mongoose = require('mongoose');

// Use Multer to store the image in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.addProduct = async (req, res) => {

  try {
    upload.single('image')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      // console.log('',req.file)
      const { product_name, product_number, price, product_category, product_type, size, color, discription } = req.body;

      // Initialize GridFSBucket
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
      });

      const uploadStream = bucket.openUploadStream(req.file.originalname);

      uploadStream.end(req.file.buffer);

      uploadStream.on('finish', async () => {
        console.log('File uploaded successfully.');


        const newProduct = new Product({
          imgName: req.file.originalname,
          imgPath: `uploads/${req.file.originalname}`,
          product_name: req.body.product_name,
          product_number: req.body.product_number,
          price: req.body.price,
          product_category: req.body.product_category,
          product_type: req.body.product_type,
          size: req.body.size,
          color: req.body.color,
          discription: req.body.discription,
          imageId: uploadStream.id,
        });

        const savedProduct = await newProduct.save();
        console.log('Saved Product:', savedProduct);

        res.status(201).json({
          message: 'Product added successfully',
          product: savedProduct,
        });
      })
    })
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Error saving product', details: error.message });
  }
};




// Controller to update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params; // Product ID from URL
  const updateData = req.body; // Data to update

  try {
    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true // Validate updated fields
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send success response
    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    // Handle errors
    console.error('Error updating product:', error);
    res.status(400).json({
      error: error.message
    });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await Product.findByIdAndDelete(productId);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    // Map over products to attach image URL
    const productsWithImages = products.map(product => ({
      ...product.toObject(),
      image: `/image/${product.imgName}`
    }));

    res.json(productsWithImages);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: error.message });
  }
}