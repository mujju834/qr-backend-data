// backend/routes/bills.js
const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// POST /api/bills - Create a new bill
router.post('/', async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json({ message: 'Bill saved successfully', bill });
  } catch (error) {
    res.status(400).json({ message: 'Error saving bill', error });
  }
});

// GET /api/bills - Retrieve all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bills', error });
  }
});

// GET /api/bills/:id - Retrieve a single bill by ID
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bill', error });
  }
});

module.exports = router;
