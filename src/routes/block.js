const express = require('express')
const {
    createBlock,
    getNotification
} = require('../controller/block.js')
const blockRouter = express.Router()

blockRouter.post('/', createBlock)
blockRouter.get('/getnotification', getNotification)
module.exports = blockRouter