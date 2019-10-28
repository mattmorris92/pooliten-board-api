const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    body: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Posts', PostSchema);
