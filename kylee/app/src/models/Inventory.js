"use strict";
const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  coffee: {
    type: Number,
    default : 100,
  },
  wine: {
    type: Number,
    default : 100,
  },
  shamp: {
    type: Number,
    default : 100,
  },  
  steak: {
    type: Number,
    default : 100,
  },
  salad: {
    type: Number,
    default : 100,
  },
  egg: {
    type: Number,
    default : 100,
  },
  bacon: {
    type: Number,
    default : 100,
  },
  bread: {
    type: Number,
    default : 100
  },
  baguette: {
    type: Number,
    default : 100
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

