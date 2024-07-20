const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Car = require('../models/carModel');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new car
router.post('/', upload.array('images', 5), async (req, res) => {
  const { make, model, year, price, kilometer, description, hand, kind, isElectric } = req.body;
  const carImages = req.files.map(file => `/uploads/${file.filename}`);

  const car = new Car({
    make,
    model,
    year,
    price,
    kilometer,
    description,
    hand,
    kind,
    isElectric,
    carImages
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
