//const Category = require("../models/categoryModel");

const Category = require("../models/categoryModel");

const asyncHandler = require("express-async-handler");

//Get All Categories
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
});
//Get Category by ID
const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(500).json({message: "Category not found"});
    }
    res.status(200).json(category);
});
//Create Category
const createCategory = asyncHandler(async (req, res) => {
    const { name, icon, color, image } = req.body;
    if (!name) {
        res.status(400).json({error: "Name is mandatory"});
    }
    const categoryAvailable = await Category.findOne({ name: name });
    if (categoryAvailable) {
        res.status(400).json({ Error: `${name} category already exist` });
        return;
    }
    const category = await Category.create({
        name,
        icon,
        color,
        image,
    });
    if (!category) 
    return res.status(400).json({message: "Oops! something went wrong, please check administrator"});
    
    res.send(category);
    
});
//Update Category
const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    // const { name, icon, color, image } = req.body;
    if (!category) {
        res.status(403).json({ Error: "No category found" });
        return;
    }
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    );
    res.status(200).json({
        result: updatedCategory,
        message: "Category updated successfully",
    });
});
//Delete category
const deleteCategory = asyncHandler(async (req, res) => {
    // const category = await Category.findById(req.params.id);
    // const { name, icon, color, image } = req.body;
    // if (!category) {
    //     return res.status(403).json({ Error: "No category found" });
    // }
    // const categoryDel = await Category.findByIdAndDelete(
    //     req.params.id,
    //     req.body,
    //     { new: true },
    // )
    //     .then((category) => {
    //         return res
    //             .status(200)
    //             .json({ message: "Category deleted successfully" });
    //     })
    //     .catch((err) => {
    //         return res.status(404).json({ error: "No data found" });
    //     });
    await Category.findByIdAndRemove(req.params.id).then(category=>{
        if(category){
            return res.status(200).json({success: true, message:"Delete successfully"})
        }
        else{
            return res.status(404).json({success: false, message:"no category found"});
        }
       
    }).catch((err)=>{
        return res.status(400).json({success: false, message:err})
    })
});

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
