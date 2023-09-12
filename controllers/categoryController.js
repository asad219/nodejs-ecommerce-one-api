const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

const getCategories = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Done hogaya" });
});
const getCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    
    res.status(200).json({ message: 'This is id pass by service: ' + id });
});
const createCategory = asyncHandler(async(req, res)=>{
    const {name, icon, color} = req.body;
    res.status(200).json({message: `Created Category: Category name is: ${name}, icon is ${icon} and color is ${color}` })
})
const updateCategory = asyncHandler(async(req, res)=>{
    const {name, icon, color} = req.body;
    res.status(200).json({message: `Updated Category: Category name is: ${name}, icon is ${icon} and color is ${color}` })
})

module.exports = { getCategories, getCategory,createCategory, updateCategory };
