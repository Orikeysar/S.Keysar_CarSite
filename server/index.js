const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const carRoutes = require('./routes/carRoutes');
const { initUploadDir } = require('./utils/multerConfig');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

initUploadDir();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/cars', carRoutes);

// נתיב אימות
const adminPassword = process.env.ADMIN_PASSWORD;

app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === adminPassword) {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
