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
    // Use multer to handle the image upload
    upload.single('image')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Destructure the request body to get product details
      const { product_name, product_number, price, product_category, product_type, size, color, discription } = req.body;

      // Initialize GridFSBucket
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
      });

      // Create an upload stream for the file
      const uploadStream = bucket.openUploadStream(req.file.originalname);

      // Pipe the file buffer into the upload stream
      uploadStream.end(req.file.buffer);

      // Wait for the upload to finish
      uploadStream.on('finish', async () => {
        console.log('File uploaded successfully.');

        // Create a new product object
        const newProduct = new Product({
          imgName: req.file.originalname,
          imgPath: `uploads/${req.file.originalname}`,
          product_name,
          product_number,
          price,
          product_category,
          product_type,
          size,
          color,
          discription,
          imageId: uploadStream.id,  // Assign the correct imageId after upload
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();
        console.log('Saved Product:', savedProduct);

        // Send a success response with the saved product data
        res.status(201).json({
          message: 'Product added successfully',
          product: savedProduct,
        });
      });

      // Handle error events from the upload stream
      uploadStream.on('error', (uploadError) => {
        console.error('Error uploading file:', uploadError);
        res.status(500).json({ error: 'Error uploading file', details: uploadError.message });
      });
    });
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
    const {id} = req.params;

    const result = await Product.findByIdAndDelete({_id:id});
    // console.log(id, result)
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
exports.getProducbyId = async (req, res) => {
  const {id} =req.params;
  try {
    const products = await Product.findById(id);

    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: error.message });
  }
}

exports.getImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    // Initialize GridFSBucket
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    // Find the file by filename
    const files = await bucket.find({ filename }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Stream the file to the response
    const downloadStream = bucket.openDownloadStreamByName(filename);

    // Set appropriate content type
    res.set('Content-Type', files[0].contentType || 'image/jpeg'); // Adjust if necessary

    downloadStream.on('error', (err) => {
      console.error('Error streaming image:', err);
      res.status(500).json({ error: 'Error streaming image' });
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ error: 'Error retrieving image', details: error.message });
  }
};
exports.getFilteredProducts = async (req, res) => {
  const { search } = req.query;

  try {
    // Build a filter object based on the search query
    const filter = {};
    if (search) {
      const regex = new RegExp(search, 'i'); // Case-insensitive search
      filter.$or = [
        { product_name: regex },
        // { description: regex }
      ];
    }

    const products = await Product.find(filter);

    // Map over products to attach image URL
    const productsWithImages = products.map(product => ({
      ...product.toObject(),
      image: `/image/${product.imgName}`
    }));

    res.json(productsWithImages);
  } catch (error) {
    console.error('Error retrieving filtered products:', error);
    res.status(500).json({ error: error.message });
  }
};