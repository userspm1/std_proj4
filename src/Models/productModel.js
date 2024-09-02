const mongoose = require("mongoose");

// Helper function to count words
const countWords = (text) => {
  if (!text) return 0;
  return text.split(/\s+/).length;
};

// Custom validation function
const wordCountValidator = (maxWords) => (value) => {
  return countWords(value) <= maxWords;
};

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_number: {
    type: String,
    required: true,
  },
  product_category: {
    type: String,
    required: true,
  },
  product_type: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  imgPath: {
    type: String,
    required: false,
  },
  imgName: {
    type: String,
    required: false,
  },
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
