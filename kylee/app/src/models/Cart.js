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
  },
  price: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    default : "default",
  },
  status: {
    type: String,
    default : "waiting",
  },
  coffee: {
    type: Number,
    default : 0,
  },
  bread: {
    type: Number,
    default : 0,
  },
  steak: {
    type: Number,
    default : 0,
  },
  message: {
    type: String,
  },  
});


const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };

