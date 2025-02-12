
const asyncHandler = require('express-async-handler')
const PostModel = require('../models/post.js')

/**
 * Controller is a specific function to handle specific tasks
 */

const createPost = asyncHandler(async (req, res) => {
    const {  title, description, categoryId, type, location, images, date, phone, status } = req.body;
   const uid = req.body.userId;
   const userId = uid._id;
   console.log("UID",userId);
    const newPost = new PostModel({
        userId,
        title,
        description,
        categoryId,
        type,
        location,
        images, // Ensure this is an array if multiple images
        phone,
        date,
        status
    });
   // console.log("Data",req.body);
     const post = await newPost.save();
//     const result = await post.save()
//return res.json(result)
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
    const userId = req.query.userId; // Get userId from URL params
    const { limit, page } = req.query;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const options = {
        limit: limit ? parseInt(limit) : 10, // Default limit to 10
        page: page ? parseInt(page) : 1, // Default page to 1
        pagination: true,
        populate: ["userId"],
        sort: { createdDate: -1 }, // Sort by createdAt descending
    };

    try {
        const posts = await PostModel.paginate({ userId }, options); // ✅ Filtering by userId
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

const getPost = asyncHandler(async (req, res) => {
    const { limit, page,  userId} = req.query;
    const options = {
        limit: limit ? parseInt(limit) : -1, // Ensure limit is a number
        page: page ? parseInt(page) : 1, // Ensure page is a number, default to 1
        pagination: true,
        populate: ["userId"],
        sort: { createdDate: -1 } // Sort by createdAt in descending order
    };
    if(userId){
            const posts = await PostModel.paginate({ userId }, options); // ✅ Filtering by userId
            return res.json(posts);
    }else{
        const posts = await PostModel.paginate({}, options);
        return res.json(posts);
    }
    
});

const deletePostById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await PostModel.deleteOne({ _id: id })
    return res.json({
        status: "success",
        post: result
    })
    
})

const updateUpdateById = asyncHandler(async (req, res) => {
    console.log("Update",req.body);
    const {  title, description, categoryId, type, location, images, date, phone, status } = req.body;
    const uid = req.body.userId;
    const userId = uid._id;
    console.log("UID",userId);
     const updateData ={
         userId,
         title,
         description,
         categoryId,
         type,
         location,
         images, // Ensure this is an array if multiple images
         phone,
         date,
         status
     };

     const id = req.params.id
     console.log("ID",id);
     const result = await PostModel.updateOne({ _id: id }, { $set: updateData });
     return res.json({
        status: "success",
        post: result
    })
    // return res.json(result)
})

module.exports = {
    createPost,
    getPostById,
    getPost,
    deletePostById,
    updateUpdateById,
    getPostByUserId

}