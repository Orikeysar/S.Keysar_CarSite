const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const carRoutes = require('./routes/carRoutes');
const { initUploadDir } = require('./utils/multerConfig');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://s-keysar-car-site.vercel.app', // Update with your Vercel client URL
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

initUploadDir(); // Initialize uploads directory

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/cars', carRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
