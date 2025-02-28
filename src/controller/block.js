const asyncHandler = require('express-async-handler');
const BlockModel = require('../models/block.js');
const PostModel = require('../models/post.js');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK if not done already
if (!admin.apps.length) {
    const serviceAccount = require('../serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const createBlock = asyncHandler(async (req, res) => {
    const block = new BlockModel(req.body);
    const result = await block.save();
    console.log('Test', req.body);

    const { postId, smToken, postTitle, reason,userId } = req.body; // Add userToken and postTitle
    console.log('smToken', smToken);


    // Update post status to 'blocked'
    const update = await PostModel.updateOne({ _id: postId }, { $set: { status: 'blocked' } });

    // Send push notification
    const message = {
        notification: {
            title: 'Post Blocked',
            body: `Your post "${postTitle}" has been blocked by the admin.Reason: ${reason}`,
        },
        token: smToken,
    };

    try {
        await admin.messaging().send(message);
        console.log('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
    }

    return res.json(result);
});

module.exports = {
    createBlock,
};
