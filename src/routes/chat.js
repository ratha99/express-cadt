const express = require('express')
const chatRouter = express.Router();
const {getChats} = require("../controller/chat.js")

chatRouter.get('/', getChats)


module.exports = chatRouter