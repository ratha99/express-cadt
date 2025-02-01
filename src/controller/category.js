
const asyncHandler = require('express-async-handler')
const CategoryModel = require('../models/category.js')
const mongoose = require("mongoose");
/**
 * Controller is a specific function to handle specific tasks
 */

const createCategory = asyncHandler(async (req, res) => {
    const post = new CategoryModel(req.body)
    const result = await post.save()
    return res.json(result)
})

const getCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const category = await CategoryModel.findById(id); 
    return res.json(category)
})

const getCategory = asyncHandler(async (req, res) => {
    const category = await CategoryModel.find();
    return res.json(category)
})

const deleteCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await CategoryModel.deleteOne({ _id: id })
    return res.json(result)
})

const updateCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, message: "Invalid category ID format" });
    }
    const category = await CategoryModel.findById(id); 
    if (!category) {
        return res.status(404).json("Category not found!")
    }else{
        const result = await CategoryModel.updateOne({ _id: id }, req.body)
        return res.json(result)
    }
   
})

module.exports = {
    createCategory,
    getCategoryById,
    getCategory,
    deleteCategoryById,
    updateCategoryById
}