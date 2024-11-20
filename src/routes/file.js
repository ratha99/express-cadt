const express = require('express')
const { handleUpload, getFile, handleUploads, handleUploadS3, deleteFileS3, getAllFiles } = require('../controller/file')
const { singleUpload, multiUpload } = require('../middlewares')
const uploadS3 = require('../middlewares/uploadS3')
const fileRouter = express.Router()

fileRouter.post('/upload-single', singleUpload, handleUpload)
fileRouter.post('/upload-single-s3',uploadS3, handleUploadS3)
fileRouter.post('/upload-multi', multiUpload, handleUploads)
fileRouter.delete('/s3/:id', deleteFileS3)
fileRouter.get('/', getAllFiles)
fileRouter.get('/:id', getFile)
module.exports = fileRouter