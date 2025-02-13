const express = require('express')
const {
    createPost,
    getPostById,
    getPost,
    deletePostById,
    updateUpdateById,
    getPostByUserId,
    // searchPosts
} = require('../controller/post.js')
const postRouter = express.Router()

postRouter.post('/', createPost)
postRouter.get('/', getPost)
// postRouter.get('/user/:userId', getPostByUserId);
postRouter.get('/:id', getPostById)
postRouter.delete('/:id', deletePostById)
postRouter.put('/:id', updateUpdateById)
// postRouter.get('/search', searchPosts);

module.exports = postRouter