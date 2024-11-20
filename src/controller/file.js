const asyncHandler = require("express-async-handler");
const fileModels = require("../models/file.js")
const path = require("path")
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const s3Clinet = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})


const handleUpload = asyncHandler(async (req, res) => {
    // save file path in DB
  //  const file = req.file
    const data = new fileModels(req.file)
    const result = await data.save()
    return res.json(result)
})
const handleUploads = asyncHandler(async (req, res) => {
    // const file = new FileModel(req.file)
    // file.save()
    const files = req.files
    return res.json(files)
})

const handleUploadS3 = asyncHandler(async (req, res) => {
    const file = req.file
    const data = new fileModels({
        filename: file.fieldname,
        originalname: file.originalname,
        size:file.size ,
        path: file.location,
        mimetype: file.mimetype,
        encoding: file.encoding,
        key:file.key
    
    })
    const result = await data.save()
    console.log("result",result)
    return res.json(result)
})

const getFile = asyncHandler(async (req, res) => {
    const id = req.params.id
    const file = await fileModels.findById(id)
    return res.sendFile(path.join(__dirname, "./../../" + file.path))
})
const getAllFiles = asyncHandler(async (req, res) => {
    const files = await fileModels.find()
    return res.json(files)
})

const deleteFileS3 = asyncHandler(async (req, res) => {
    const id = req.params.id
    const file = await fileModels.findById(id)
    const input = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: file.key,
    };
    // Delete in S3
    const command = new DeleteObjectCommand(input)
    const response = await s3Clinet.send(command)
    // Delete in Mongo
    const result = await fileModels.deleteOne({ _id: id })
    return res.json({ response, result })
})

module.exports = { handleUpload, getFile, handleUploads, handleUploadS3, deleteFileS3, getAllFiles }