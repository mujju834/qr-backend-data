// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI ;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Define a dynamic schema
const qrCodeSchema = new mongoose.Schema(
  {
    data: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const QrCode = mongoose.model('QrCode', qrCodeSchema);

app.get('/', (req, res) => {
  res.json({ message: 'qrcode scanner backend is working!' });
});

// Routes
app.post('/api/scan', async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ message: 'No data provided' });
    }

    const newQrCode = new QrCode({ data });
    await newQrCode.save();
    res.status(201).json({ message: 'QR Code data saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
