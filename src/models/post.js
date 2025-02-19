const { date } = require('joi');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    images: { type: String }, // If multiple images, use [String]
    date: { type: Date, required: true },
    phone: { type: String, required: true },
    status: { type: String },
    createdDate: { type: Date, required: true, default: Date.now },
});

postSchema.plugin(mongoosePaginate);

const PostModel = mongoose.model('post', postSchema);

module.exports = PostModel;