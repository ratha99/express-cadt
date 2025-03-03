const express = require('express')
const {
    createBlock,
    getNotification,
    updateNotificationStatus
} = require('../controller/block.js')
const blockRouter = express.Router()

blockRouter.post('/', createBlock)
blockRouter.get('/getnotification', getNotification)
blockRouter.get('/updatenotification', updatenotificationstatus)
module.exports = blockRouter