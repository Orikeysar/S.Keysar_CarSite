const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();  // Add this line to use dotenv

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://s-keysar-car-site.vercel.app',
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/cars', carRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
