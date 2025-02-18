const express = require('express')
const {
    getPostReport,
    getUsersReport
} = require('../controller/report.js')
const reportRouter = express.Router()
reportRouter.get('/post', getPostReport)
reportRouter.get('/user', getUsersReport)
module.exports = reportRouter