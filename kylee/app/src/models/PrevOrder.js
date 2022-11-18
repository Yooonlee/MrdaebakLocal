"use strict";
const mongoose = require("mongoose");


const prevOrderSchema = mongoose.Schema({
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
  status: {
    type: String,
    default : "waiting",
  },  
  }
});


const PrevOrder = mongoose.model("Prevorder", prevOrderSchema);

module.exports = { PrevOrder };

