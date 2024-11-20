const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');
const bookSchema = new mongoose.Schema({
    title: { type: String, required:true},
    description: { type: String, required:true },
    pub_date: { type: String, required:true },
    author: { type: mongoose.Types.ObjectId, ref: 'users' },
    isbn:{type : String, required:true},
    link:{type:String, required:true},
    created_date:{type:Date, default:Date.now()}
})
bookSchema.plugin(mongoosePaginate);

const bookModel = mongoose.model('Books', bookSchema)

module.exports = bookModel