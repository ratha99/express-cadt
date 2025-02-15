
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/user.js')
const redis = require('redis');
const redisClient = redis.createClient();
/**
 * Controller is a specific function to handle specific tasks
 */

const createUser = asyncHandler(async (req, res) => {
    const user = new UserModel(req.body)
    const result = await user.save()
    return res.json(result)
})

const getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)
    return res.json(user)
})

const getUserByToken = asyncHandler(async (req, res) => {
    const token = req.params.token
    const user = await UserModel.findOne({ refreshToken: token })
    return res.json(user)
})

const getUsers = asyncHandler(async (req, res) => {
    // Get all courses 
    const user = await UserModel.find()
    return res.json(user)
})

const deleteUserById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await UserModel.deleteOne({ _id: id })
    return res.json(result)
})

const updateUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updateData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        profilePic: req.body.profilePic
    };

    const result = await UserModel.updateOne({ _id: id }, updateData);
    console.log("Updated:", result);
    return res.json({
        status: "success",
        post: result.modifiedCount
    });
});

module.exports = {
    createUser,
    getUserById,
    getUsers,
    deleteUserById,
    getUserByToken,
    updateUserById
}