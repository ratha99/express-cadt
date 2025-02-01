const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "categories" },
    type: { type: String, required: true },
    location: { type: String, required: true },
    images: { type: String }, // If multiple images, use [String]
    status: { type: String},
    createdDate: { type: Date, required: true, default: Date.now() },

    
})

const PostModel = mongoose.model('post', postSchema)

module.exports = PostModel