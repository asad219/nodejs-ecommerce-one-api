const express = require("express");
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { getOrders, getOrdersById, createOrder } = require('../controllers/orderController')
const validateToken = require('../middleware/validateToken');

//Get Order
router.get('/', validateToken, getOrders);
router.get('/:id', validateToken, getOrdersById);
router.post('/', validateToken, createOrder)



module.exports = router;