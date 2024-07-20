const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config(); // Add this line

const carRoutes = require('./routes/carRoutes');
const { initUploadDir } = require('./utils/multerConfig');

const app = express();
const port = process.env.PORT || 5000; // Use environment variable

app.use(cors({
  origin: 'https://s-keysar-car-site.vercel.app/' // Replace with your Vercel client URL
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

initUploadDir(); // Initialize uploads directory

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // Use environment variable

app.use('/api/cars', carRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
