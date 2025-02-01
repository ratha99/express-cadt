const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    phone: { type: String },
    profile_pic: { type: String },
    status: { type: String },
    role: { type: String },
    address: { type: String },
    type:{type: String},
    refreshToken:{type:String},
    createdDate: { type: Date, required: true, default: Date.now() },
    updatedDate: { type: Date, required: true, default: Date.now() },
    
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel