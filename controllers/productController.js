const express = require("express");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

//Get All Products
const getAllProducts = asyncHandler(async (req, res) => {
        
    //Select all products (populate with category data)
    //const productList = await Product.find().populate('category');

    //Select specific columns without _id field
    //const productList = await Product.find().populate('category').select('name description image images isFeatured -_id');

    //Select specific columns witho _id field
    const productList = await Product.find()
        .populate("category")
        .select("name description image images isFeatured");

    if (!productList) return res.status(500).json({ message: "No products" });

    return res.status(200).json(productList);
});
//Get Product by ID
const getProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate("category");

    if (!product) return res.status(500).json({ message: "No products" });

    return res.status(200).json(product);
});
//Create Products
const createProduct = asyncHandler(async (req, res) => {
    const isAdmin = req.user.isAdmin;
    if (!isAdmin)
    res.send(401).json({message: "Unauthorized Access"});
    const {
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
    } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    if (!description)
        return res.status(400).json({ error: "Description is required" });

    if (!category)
        return res.status(400).json({ error: "Category is required" });
    const _category = await Category.findById(req.body.category)
        .then((_category) => {
            if (!_category)
                return res.status(404).json({ message: "Invalid category" });
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ message: "Invalid type of Category" });
        });

    const product = await Product.create({
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
    });

    if (!product)
        return res
            .status(500)
            .json({
                message:
                    "Oops! something wrong please contact to system administrator",
            });

    return res.status(201).json({ message: "Product created" });
});
//Update product
const updateProduct = asyncHandler(async (req, res) => {
    const isAdmin = req.user.isAdmin;
    if (!isAdmin)
    res.send(401).json({message: "Unauthorized Access"});
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(500).json({Error: "Invalid ID format"});
    }
    const {
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
    } = req.body;

    const _category = await Category.findById(req.body.category)
        .then((_category) => {
            if (!_category)
                return res.status(404).json({ message: "Invalid category" });
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ message: "Invalid type of Category" });
        });

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }).then((product) => {
        if (!product)
            return res.status(400).json({ message: "No record found" });
        return res.send({ product, message: "Record updated" });
    }).catch((err)=>{
        return res.status(500).json({ message: "Invalid product id" });
    });
});
//Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const isAdmin = req.user.isAdmin;
    if (!isAdmin)
    res.send(401).json({message: "Unauthorized Access"});
    await Product.findById(req.params.id).then(async (product) => {
        if (product) {
            await Product.findByIdAndRemove(req.params.id);
            return res
                .status(200)
                .json({ message: "Record deleted successfully" });
        } else {
            return res.status(400).json({ message: "No record found" });
        }
    }).catch((err)=>{
        return res.status(500).json({ message: "Invalid product id" });
    });
});
//Get Product Count
const getProductCount = asyncHandler(async(req, res)=>{
    // const productCount = await Product.countDocuments();
    // if (!productCount){
    //     return res.status(500).json({success: false})
    // }else
    // {
    //     res.send(productCount);
    // }
    res.status(200).json({message: "Product count api"});
    
})
//Get Featured Product
const getFeaturedProduct = asyncHandler(async(req, res)=>{
    const _limit = req.params.limit ? req.params.limit : 0;
    const productCount = await Product.find({isFeatured: true}).limit(+_limit);// + means convert string to number
    if (!productCount){
        return res.status(500).json({success: false})
    }else
    {
        res.send({
            productCount: productCount
        })
    }
})
//Filter Products
const getFilterProducts = asyncHandler(async(req, res)=>{
    let _category={};
    if (req.query.category){
        _category = {category: req.query.category.split(',')};
    }
    
    const product = await Product.find(_category).populate("category");
    if (!product)
    return res.status(500).json({message: "No product found"});

    return res.status(200).json(product);



})

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductCount,
    getFeaturedProduct,
    getFilterProducts
};
