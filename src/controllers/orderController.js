const Order = require('../Models/orderModel'); // Adjust path as necessary
const path = require('path');
const express = require('express')


exports.placeOrder = async (req, res) => {
  const { orderId, orderDate, orderPerson,orderContact,orderAddress } = req.body; // Product ID from URL 
  try {
    // Find the product by ID and update it
    const user = new Order({ orderId, orderDate, orderPerson,orderContact,orderAddress })

    await user.save();

    // Send success response
    res.status(200).json({
      message: 'Order Placed successfully',
      user
    });
  } catch (error) {
    // Handle errors
    console.error('Error updating product:', error);
    res.status(400).json({
      error: error.message
    });
  }
};
exports.updateOrder = async (req, res) => {
  const {id} = req.params;
  const  {orderStatus} = req.body; // Product ID from URL 
  try {
    // Find the product by ID and update it
    const userStatus = await  Order.findByIdAndUpdate(id, {orderStatus},{
      new: true, // Return the updated document 
      runValidators: true 
    })
 
    // Send success response
    res.status(200).json({
      message: 'Order updated successfully',
      userStatus
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