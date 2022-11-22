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
  },
  price: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    default : "a",
  },
  status: {
    type: String,
    default : "waiting",
  },  
});


const PrevOrder = mongoose.model("Prevorder", prevOrderSchema);

module.exports = { PrevOrder };

