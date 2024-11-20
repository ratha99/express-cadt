const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const { validationResult } = require('express-validator')

const { responseHandler } = require('express-intercept');
const redisClient = require('../redis');
// File Upload
const multer = require('multer');
const path = require('path')
const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const extract = token.split(' ')[1]
    const decoded = jwt.verify(extract, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id)
    req.user = user;
    next();
})
const verifyRefresh = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const extract = token.split(' ')[1]
    const decoded = jwt.verify(extract, process.env.JWT_REFESH_SECRET);
    const user = await UserModel.findById(decoded.id)
    // console.log(user)
    req.user = { ...user._doc, extract }
    // console.log(req.user)
    next();
})
function logger(req, res, next) {
    // console.log(req)
    console.log("Incoming request", req.rawHeaders[3])
    // Example, request from unauthorized user
    // return res.status(404).send("Forbidden")
    next()
}

function authroize(req, res, next) {
    return res.status(404).json({
        msg: "Not Found"
    })
}

function handleError(error, req, res, next) {
    // console.log("Hello")
    // console.log(error.message)
    return res.status(500).json(error.message)
}

function checkId(req, res, next) {
    const id = req.params.id
    const course = courses.find((item) => {
        return item.id == id
    })
    if (!course) {
        return res.status(404).json({
            error: "Resource Not Found"
        })
    }
    next()
}

function handleValidation(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

const invalidateInterceptor = responseHandler().for(req => {
    const methods = ["POST", "PUT", "PATCH", "DELETE"]
    return methods.includes(req.method)
}).if(res => {
    const codes = [200, 201, 202, 203, 204]
    return codes.includes(res.statusCode)
}).getString(async (body, req, res) => {
    const { baseUrl } = req
    console.log(baseUrl)
    const keys = await redisClient.keys(`${baseUrl}*`)
    console.log(keys)
    redisClient.del(keys[0])
})

const cacheInterceptor = (ttl) => responseHandler().for(req => {
    return req.method == "GET"
}).if(res => {
    const codes = [200, 201, 202, 203, 204]
    return codes.includes(res.statusCode)
}).getString(async (body, req, res) => {
    const { originalUrl } = res.req
    console.log("Called")
    redisClient.set(originalUrl, body, {
        EX: ttl
    })
})

const cacheMiddleware = asyncHandler(async (req, res, next) => {
    const { originalUrl } = req
    if (req.method == "GET") {
        const data = await redisClient.get(originalUrl)
        if (data !== null) {
            return res.json(JSON.parse(data))
        }
    }
    next()
})
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
})

const singleUpload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
}).single('file')

const multiUpload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
}).array('files')

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|pdf/
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    // Check mime
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb(new Error('Error: Images Only!'), false)
    }
}

module.exports = { 
    handleError,
    logger, 
    verifyJWT, 
    verifyRefresh,
    handleValidation, 
    cacheInterceptor, 
    cacheMiddleware, 
    invalidateInterceptor,
    singleUpload,
    multiUpload
}