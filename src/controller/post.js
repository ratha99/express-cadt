
const asyncHandler = require('express-async-handler')
const PostModel = require('../models/post.js');
const { el } = require('@faker-js/faker');

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

// const getPost = asyncHandler(async (req, res) => {
//     const { limit, page, userId, query, category} = req.query;
//     const options = {
//         limit: limit ? parseInt(limit) : -1, // Ensure limit is a number
//         page: page ? parseInt(page) : 1, // Ensure page is a number, default to 1
//         pagination: true,
//         populate: ["userId"],
//         sort: { createdDate: -1 } // Sort by createdAt in descending order
//     };
//     if(category){
//         const posts = await PostModel.paginate(
//             {
//                 $or: [
//                     { categoryId: { $regex: category, $options: 'i' } }
//                 ]
//             },
//             options
//         );
//         console.log("Category");
//         return res.json(posts);
//     }
//     if (!query) {
//         if(userId){
//             const posts = await PostModel.paginate({ userId }, options); // ✅ Filtering by userId
//             return res.json(posts);
//         }else{
//             const posts = await PostModel.paginate({}, options);
//             return res.json(posts);
//         }
//     }else{
//         const posts = await PostModel.paginate(
//             {
//                 $or: [
//                     { title: { $regex: query, $options: 'i' } }, // Case-insensitive search
//                     { description: { $regex: query, $options: 'i' } },
//                     { type: { $regex: query, $options: 'i' } },
//                     { categoryId: { $regex: query, $options: 'i' } }
//                 ]
//             },
//             options
//         );
//         console.log("Category 1");
//         return res.json(posts);
//     }
    
    
// });


const getPost = asyncHandler(async (req, res) => {
    const { limit, page, userId, query, category } = req.query;

    // Validate and parse query parameters
    const parsedLimit = limit ? parseInt(limit) : 10; // Default limit to 10
    const parsedPage = page ? parseInt(page) : 1;

    const options = {
        limit: parsedLimit,
        page: parsedPage,
        pagination: true,
        populate: ["userId"],
        sort: { createdDate: -1 }
    };

    // Base query to filter posts with status "active"
    const baseQuery = { status: { $in: ["active"] } };

    let searchQuery = { ...baseQuery };

    if (category) {
        searchQuery = {
            ...baseQuery,
            categoryId: { $regex: category, $options: 'i' }
        };
    } else if (query) {
        searchQuery = {
            ...baseQuery,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { type: { $regex: query, $options: 'i' } },
                { categoryId: { $regex: query, $options: 'i' } }
            ]
        };
    } else if (userId) {
        searchQuery = {
            status: { $in: ["active", "Resolved"] },
            userId
        };
    }

    try {
        const posts = await PostModel.paginate(searchQuery, options);
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const deletePostById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log("Status:", status);
    console.log("id:", id);
    if (!status) {
      return res.status(400).json({
        status: "error",
        message: "Status is required in the request body.",
      });
    }
  
    try {
      const updateData = { status }; // Create the update object
      
  
      // Update the post in the database
      const result = await PostModel.updateOne({ _id: id }, { $set: updateData });
  
      console.log("Result:", result);
  
      if (result.matchedCount === 0) {
        return res.status(404).json({
          status: "error",
          message: "Post not found.",
        });
      }
  
      return res.json({
        status: "success",
        message: "Post status updated successfully.",
        post: result,
      });
    } catch (error) {
      console.error("Error updating post status:", error);
      return res.status(500).json({
        status: "error",
        message: "An error occurred while updating the post status.",
      });
    }
    
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

// Search posts by title and description
// const searchPosts = asyncHandler(async (req, res) => {
//     const { query, limit, page } = req.query;

//     if (!query) {
//         return res.status(400).json({ message: "Search query is required" });
//     }

//     const options = {
//         limit: limit ? parseInt(limit) : 10, // Default limit to 10
//         page: page ? parseInt(page) : 1, // Default page to 1
//         pagination: true,
//         populate: ["userId"],
//         sort: { createdDate: -1 }, // Sort by createdAt descending
//     };

//     try {
//         // Use MongoDB's $regex to search for posts with matching title or description
//         const posts = await PostModel.paginate(
//             {
//                 $or: [
//                     { title: { $regex: query, $options: 'i' } }, // Case-insensitive search
//                     { description: { $regex: query, $options: 'i' } }
//                 ]
//             },
//             options
//         );

//         return res.json(posts);
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// });


module.exports = {
    createPost,
    getPostById,
    getPost,
    deletePostById,
    updateUpdateById,
    getPostByUserId,
    //searchPosts

}