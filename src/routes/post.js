const express = require('express')
const {
    createPost,
    getPostById,
    getPost,
    deletePostById,
    updateUpdateById,
    getPostByUserId
} = require('../controller/post.js')
const postRouter = express.Router()

postRouter.post('/', createPost)
postRouter.get('/', getPost)
// postRouter.get('/user/:userId', getPostByUserId);
postRouter.get('/:id', getPostById)
postRouter.delete('/:id', deletePostById)
postRouter.put('/:id', updateUpdateById)

module.exports = postRouter