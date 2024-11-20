const express = require('express')
const {createBook, getBooks, updateBook, deleteBook, getBookById} = require("../controller/book.js")
const { validation } = require('swagger-generator-express');
const requestModel = require('../models/request/book')
const bookRouter = express.Router();

bookRouter.post('/',validation(requestModel[0]), createBook)
bookRouter.get('/', validation(requestModel[1]), getBooks)
bookRouter.get('/:id', validation(requestModel[2]), getBookById)
bookRouter.delete('/:id',validation(requestModel[3]), deleteBook)
bookRouter.patch('/:id', validation(requestModel[4]), updateBook)

module.exports = bookRouter