const express = require('express')
const {
    createPost,
    getPostById,
    getPost,
    deletePostById,
    updateUpdateById
} = require('../controller/post.js')
const postRouter = express.Router()

postRouter.post('/', createPost)
postRouter.get('/', getPost)
postRouter.get('/:id', getPostById)
postRouter.delete('/:id', deletePostById)
postRouter.put('/:id', updateUpdateById)

module.exports = postRouter