const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');
const courseSchema = new mongoose.Schema({
    title: { type: String, required:true},
    price:{ type: String, required:true},
    category: { type: String, required:true },
    author: { type: String, required:true },
    created_date:{type:Date, default:Date.now()}
})
courseSchema.plugin(mongoosePaginate);
const courseModel = mongoose.model('courses', courseSchema)

module.exports = courseModel