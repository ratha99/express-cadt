const { date } = require('joi');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const blockSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "post" },
    reason: { type: String, required: true },
    status: { type: String },
    createdDate: { type: Date, required: true, default: Date.now },
});

blockSchema.plugin(mongoosePaginate);

const BlockModel = mongoose.model('block', blockSchema);

module.exports = BlockModel;