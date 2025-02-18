const asyncHandler = require('express-async-handler');
const PostModel = require('../models/post.js');
const UserModel = require('../models/user.js')
const getPostReport = asyncHandler(async (req, res) => {
    // Count total posts
    const totalPosts = await PostModel.countDocuments();

    // Group by type and count
    const typeCounts = await PostModel.aggregate([
        {
            $group: {
                _id: "$type",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                type: "$_id",
                count: 1
            }
        }
    ]);

    // Group by category and count
    const categoryCounts = await PostModel.aggregate([
        {
            $group: {
                _id: "$categoryId",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                count: 1
            }
        }
    ]);

    const statusCounts = await PostModel.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                status: "$_id",
                count: 1
            }
        }
    ]);

    // Format the response
    const response = [
        {
            type: typeCounts.reduce((acc, item) => {
                acc[item.type] = item.count.toString();
                return acc;
            }, {})
        },
        {
            category: categoryCounts.reduce((acc, item) => {
                acc[item.category] = item.count.toString();
                return acc;
            }, {})
        },
        {
            status: statusCounts.reduce((acc, item) => {
                acc[item.status] = item.count.toString();
                return acc;
            }, {})
        },
        {
            totalPosts: totalPosts.toString() // Add total number of posts
        }
    ];

    return res.json(response);
});
const getUsersReport = asyncHandler(async (req, res) => {
    try {
        // Count the total number of users
        const totalUsers = await UserModel.countDocuments();

        // Return the count as a JSON response
        return res.json({ totalUsers });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: "Failed to fetch user count", error: error.message });
    }
});
module.exports = {
    getPostReport,
    getUsersReport
    //searchPosts
};