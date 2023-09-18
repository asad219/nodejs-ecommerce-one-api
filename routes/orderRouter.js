const express = require("express");
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { getOrders, createOrder } = require('../controllers/orderController')
const validateToken = require('../middleware/validateToken');

//Get Order
router.get('/', getOrders);
router.post('/', createOrder)



module.exports = router;