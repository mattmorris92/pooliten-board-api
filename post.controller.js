const Post = require('./post.model.js');

//Create new Post
exports.create = (req, res) => {

    console.log(req)

    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Post content cannot be empty"
        });
    }

    // Create a Post
    const post = new Post({
        title: req.body.title || "No post title",
        body: req.body.body || "No post body",
    });

    // Save Post in the database
    post.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating the post."
        });
    });
};

// Retrieve all posts from the database.
exports.findAll = (req, res) => {
    Post.find()
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while retrieving posts."
        });
    });
};

// Find a single post with a postId
exports.findOne = (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Something went wrong retrieving post with id " + req.params.postId
        });
    });
};

// Update a post
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    // Find and update post with the request body
    Post.findByIdAndUpdate(req.params.postId, {
        title: req.body.title || "No post title",
        body: req.body.body
    }, {new: true})
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Something went wrong updating note with id " + req.params.postId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        res.send({message: "Post deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Could not delete post with id " + req.params.postId
        });
    });
};
