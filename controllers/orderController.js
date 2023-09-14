const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

//Get All Order
const getOrders = asyncHandler(async(req,res)=>{
    res.status(200).json({message:"Order API is working"})
})

module.exports = { getOrders }