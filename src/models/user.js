const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, unique: true },
    type:{type: String},
    refreshToken:{type:String},
    createdDate: { type: Date, required: true, default: Date.now() },
    password: { type: String}
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel