const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const ServiceModel = require('../models/service')
const { PaginationParameters } = require('mongoose-paginate-v2');

const createService = expressAsyncHandler(async (req, res) => {
    const service = new ServiceModel(req.body)
    const result = await service.save()
    return res.json(result)
})

const getService = expressAsyncHandler(async (req, res) => {
    const options = new PaginationParameters(req).get()
    const result = await ServiceModel.paginate(...options)
    return (result)? res.json(result): res.json('No data')
})

const getServiceById = expressAsyncHandler(async(req, res) => {
    const id = req.params.id
    const service = await ServiceModel.findById(id)
    return (service)? res.json(service): res.json('No data')
})

const updateService = expressAsyncHandler(async(req, res) => {
    const id = req.params.id
    const service = ServiceModel.findById(id)
    const result = await service.updateOne(req.body)
    return res.json({
        opt: 'Updated',
        item: result
    })
})

const deleteService = expressAsyncHandler(async(req, res) => {
    const service = ServiceModel.findById(req.params.id)
    const result = await service.deleteOne()
    return res.json({
        opt: 'Deleted',
        item: result
    })
})

module.exports = {
    createService,
    getService,
    getServiceById,
    updateService,
    deleteService
}