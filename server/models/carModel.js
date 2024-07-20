const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  kind: String,
  year: Number,
  price: Number,
  kilometer: Number,
  description: String,
  carImages: [String], // Store image paths
  hand: Number,
  isElectric: Boolean,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
