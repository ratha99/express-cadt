const chatModels = require("../models/chat.js")
const asyncHandler = require("express-async-handler")
const createChat = asyncHandler(async(req,res) => {

    const chat = new chatModels(req.body)
    const result = await chat.save()
    return res.json(result)
})
const  getChats = asyncHandler(async(req, res) => {
    const chat = await chatModels.find().populate('byUser')
    return res.json(chat)
})
module.exports = { getChats, createChat}