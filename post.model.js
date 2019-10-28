const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    tags: String,
    upvotes: Number,
    downvotes: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Posts', PostSchema);
