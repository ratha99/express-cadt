const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, required: true, default: Date.now() },
    
})

const CategoryModel = mongoose.model('categories', categorySchema)

module.exports = CategoryModel