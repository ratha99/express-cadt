const express = require('express')
const { createService, getService, getServiceById, updateService, deleteService } = require('../controller/service')
const serviceRouter = express.Router()


serviceRouter.post('/', createService)
serviceRouter.get('/', getService)
serviceRouter.get('/:id', getServiceById)
serviceRouter.delete('/:id', deleteService)
serviceRouter.put('/:id', updateService)


module.exports = serviceRouter