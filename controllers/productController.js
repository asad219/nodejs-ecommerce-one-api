const express = require('express');
const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

//Get All Products
const getAllProducts = asyncHandler(async(req, res)=>{
    res.status(200).json({message: "Called Get All Products API"})
})

module.exports = {getAllProducts}