const express = require('express');
const multer = require('multer');
const path = require('path');
const Car = require('../models/carModel'); // Ensure this path is correct
const { initUploadDir } = require('../utils/multerConfig');

const router = express.Router();

// Initialize uploads directory
initUploadDir();

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
    console.error(err);
    res.status(500).json({ message: 'Error fetching cars' });
  }
});

// Add a new car
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { make, model, year, price, kilometer, description, hand, kind, isElectric } = req.body;
    const carImages = req.files.map(file => `/uploads/${file.filename}`);

    if (!make || !model || !year || !price || !kilometer || !description || !hand || !kind) {
      return res.status(400).json({ message: 'נא מלא את כל השדות' });
    }

    const car = new Car({ make, model, year, price, kilometer, description, hand, kind, carImages, isElectric });
    await car.save();
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving car' });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'מכונית נמחקה מהמאגר' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting car' });
  }
});

module.exports = router;
