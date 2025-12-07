// backend/src/routes/salesRoutes.js
const express = require('express');
const router = express.Router();
const { getAllSales, getSaleById } = require('../controllers/salesController');

router.get('/api/sales', getAllSales);
router.get('/api/sales/:id', getSaleById);

module.exports = router;