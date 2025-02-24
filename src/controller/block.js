
const asyncHandler = require('express-async-handler')
const BlockModel = require('../models/block.js');
const { el } = require('@faker-js/faker');
const PostModel = require('../models/post.js');

/**
 * Controller is a specific function to handle specific tasks
 */

const createBlock = asyncHandler(async (req, res) => {
    const block = new BlockModel(req.body)
    const result = await block.save()
    console.log("Test",req.body);
    const  {postId}  = req.body;
    console.log("ID",postId);
    const update = await PostModel.updateOne({ _id: postId }, { $set: { status: "blocked" } });
    return res.json(result)
})



module.exports = {
    createBlock,

}