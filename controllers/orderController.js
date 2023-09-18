const Order = require("../models/orderModel");
const OrderItem = require('../models/orderItemModel');
const asyncHandler = require("express-async-handler");

//Get All Order
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name email').sort('dateOrdered');
    if (!orders)
    return res.status(400).json({message:'No order found'});

    res.send(orders);
});

//Create Order
const createOrder = asyncHandler(async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;
    
    const {
        orderItems,
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        status,
        totalPrice,
        user
    } = req.body;
    
    const order = await Order.create({
        orderItems:orderItemsIdsResolved,
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        status,
        totalPrice,
        user
    });

    if (!order) 
    return res.status(400).json({message: "Oops! something went wrong, please check administrator"});
    
    res.send(order);
});
module.exports = { getOrders, createOrder };
