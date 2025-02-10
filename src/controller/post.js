
const asyncHandler = require('express-async-handler')
const PostModel = require('../models/post.js')

/**
 * Controller is a specific function to handle specific tasks
 */

const createPost = asyncHandler(async (req, res) => {
    const post = new PostModel(req.body)
    const result = await post.save()
   // return res.json(result)
   return res.json({
        status: "success",
        post: post
    })
})

const getPostById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const post = await PostModel.findById(id).populate("userId"); 
    return res.json(post)
})
const getPostByUserId = asyncHandler(async (req, res) => {
    const id = req.params.id
    const post = await PostModel.find({userId, id}).populate("userId"); 
    return res.json(post)
})

const getPost = asyncHandler(async (req, res) => {
    const { limit, page } = req.query;
    const options = {
        limit: limit ? parseInt(limit) : -1, // Ensure limit is a number
        page: page ? parseInt(page) : 1, // Ensure page is a number, default to 1
        pagination: true,
        populate: ["userId"],
        sort: { createdDate: -1 } // Sort by createdAt in descending order
    };

    const posts = await PostModel.paginate({}, options);
    return res.json(posts);
});

const deletePostById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await PostModel.deleteOne({ _id: id })
    return res.json(result)
})

const updateUpdateById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await PostModel.updateOne({ _id: id }, req.body)
    return res.json(result)
})

module.exports = {
    createPost,
    getPostById,
    getPost,
    deletePostById,
    updateUpdateById
}