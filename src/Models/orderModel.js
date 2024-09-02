const mongoose = require("mongoose");

// Helper function to count words
 
// Custom validation function
 

const Orderdetails = new mongoose.Schema({
    orderId:{
        type:String
    },
    orderDate:{
        type:String
    },
    orderPerson:{
        type:String
    },
//   product_name: {
//     type: String,
//     required: true,
//   },
//   product_number: {
//     type: String,
//     required: true,
//   },
//   product_category: {
//     type: String,
//     required: true,
//   },
//   product_type: {
//     type: String,
//     required: true,
//   },
//   discription: {
//     type: String,
//     required: true,
//   },
//   color: {
//     type: String,
//     required: true,
//   },
//   size: {
//     type: String,
//     required: false,
//   },
//   price: {
//     type: String,
//     required: false,
//   },
//   imgPath: {
//     type: String,
//     required: false,
//   },
//   imgName: {
//     type: String,
//     required: false,
//   },
  // stateOfOrigin: {
  //   type: String,
  //   required: false,
  // },
  // soldBy: {
  //   type: String,
  //   required: true,
  // },
  // disclaimer: {
  //   type: String,
  //   required: false,
  //   validate: [
  //     wordCountValidator(1000),
  //     "Disclaimer must not exceed 1000 words",
  //   ],
  // },
  // details: {
  //   type: String,
  //   required: false,
  //   validate: [wordCountValidator(1000), "Details must not exceed 1000 words"],
  // },
});

const Order = mongoose.model("orderDetails", Orderdetails);

module.exports = Order;
