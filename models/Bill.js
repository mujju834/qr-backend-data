// backend/models/Bill.js
const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema(
  {
    storeName: { type: String, required: true },
    date: { type: Date, required: true },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bill', BillSchema);
