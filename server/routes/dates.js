const express = require('express');
const router = express.Router();
const Date = require('../models/Date');

// Get all dates
router.get('/', async (req, res) => {
  try {
    const dates = await Date.find();
    res.json(dates);
  } catch (error) {
    console.error('Error fetching dates:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// POST /dates - Add a new date
router.post('/', async (req, res) => {
  try {
    const newDate = new Date({ date: req.body.date });
    await newDate.save();
    res.status(201).json(newDate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a date
router.delete('/:date', async (req, res) => {
  try {
    const { date } = req.params;

    // Ensure valid date
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const result = await Date.findOneAndDelete({ date });
    if (!result) return res.status(404).json({ message: 'Date not found' });

    res.json({ message: 'Date deleted' });
  } catch (error) {
    console.error('Error deleting date:', error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
