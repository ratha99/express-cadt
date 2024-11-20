const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String},
    text: { type: String },
    byUser: { type: mongoose.Types.ObjectId, ref: 'users' },
    created_date:{type:Date, default:Date.now()}
})

const UserModel = mongoose.model('chat', userSchema)
module.exports = UserModel