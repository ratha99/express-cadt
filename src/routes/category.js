const express = require('express')
const {
    createCategory,
    getCategoryById,
    getCategory,
    deleteCategoryById,
    updateCategoryById
} = require('../controller/category.js')
const categoryRouter = express.Router()

categoryRouter.post('/', createCategory)
categoryRouter.get('/', getCategory)
categoryRouter.get('/:id', getCategoryById)
categoryRouter.delete('/:id', deleteCategoryById)
categoryRouter.put('/:id', updateCategoryById)

module.exports = categoryRouter