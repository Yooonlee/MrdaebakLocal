"use strict";
const mongoose = require("mongoose");


const cartSchema = mongoose.Schema({
  dinnerMenu: {
    type: String,
    maxlength: 150,
  },
  dinnerStyle: {
    type: String,
    maxlength: 150,
  },
  num: {
    type: Number,
    maxlength: 100,
  },
  price: {
    type: Number,
    maxlength: 10000,
  },
  name: {
    type: String,
    maxlength: 10000,
  },
  address: {
    type: String,
    maxlength: 10000,
  }
});


const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };

