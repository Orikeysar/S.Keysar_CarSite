// server/routes/carRoutes.js
const express = require('express');
const router = express.Router();
const { upload } = require('../utils/multerConfig');
const Car = require('../models/carModel');

// GET /api/cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
