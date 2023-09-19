const express = require("express");
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { getOrders, getOrdersById, createOrder, updateOrderStatus, deleteOrder, getTotalSales } = require('../controllers/orderController')
const validateToken = require('../middleware/validateToken');

//Get Order
router.get('/', validateToken, getOrders);
router.get('/:id', validateToken, getOrdersById);
router.put('/:id', validateToken, updateOrderStatus);
router.delete('/:id', validateToken, deleteOrder);
router.post('/', validateToken, createOrder)



module.exports = router;