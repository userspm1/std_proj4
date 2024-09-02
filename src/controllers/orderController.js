const Order = require('../Models/orderModel'); // Adjust path as necessary
const path = require('path'); 
const express = require('express') 
 

exports.placeOrder = async (req, res) => {
    const { orderId,orderDate,orderPerson } = req.query; // Product ID from URL 
    try {
      // Find the product by ID and update it
      const updatedProduct = await Order.insertMany({orderId:orderId,orderDate:orderDate,orderPerson:orderPerson})
  
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
exports.getOrder = async (req, res) => {
    
    try {
      // Find the product by ID and update it
      const updatedProduct = await Order.find()
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Send success response
      res.status(200).json({ 
        updatedProduct
      });
    } catch (error) {
      // Handle errors
      console.error('Error updating product:', error);
      res.status(400).json({
        error: error.message
      });
    }
  };