const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const carRoutes = require('./routes/carRoutes');
const { initUploadDir } = require('./utils/multerConfig');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

initUploadDir(); // Initialize uploads directory

mongoose.connect('mongodb://127.0.0.1:27017/skeysar', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/cars', carRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
