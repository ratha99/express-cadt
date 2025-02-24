const express = require('express')
const {
    createBlock,
} = require('../controller/block.js')
const blockRouter = express.Router()

blockRouter.post('/', createBlock)

module.exports = blockRouter