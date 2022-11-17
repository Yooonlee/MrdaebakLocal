"use strict";
const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  coffee: {
    type: Number,
    default : 10,
  },
  wine: {
    type: Number,
    default : 10,
  },
  shamp: {
    type: Number,
    default : 10,
  },  
  steak: {
    type: Number,
    default : 10,
  },
  salad: {
    type: Number,
    default : 10,
  },
  egg: {
    type: Number,
    default : 10,
  },
  bacon: {
    type: Number,
    default : 10,
  },
  bread: {
    type: Number,
    maxlength: 150,
  },
  baguette: {
    type: Number,
    maxlength: 150,
  },
});
inventorySchema.pre('save', function(next) {
  var inventory = this;
  for(item in inventory)
  {
    if (item === 0) { // 재고가 0이되면  에러 표시 후 저장 취소
      throw '재고가 없습니다.';
    }
  }
  next();
});


const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = { Inventory };

