module.exports = (app) => {
    const posts = require('./post.controller.js');

    // Create a new Product
    app.post('/posts', posts.create);

    // Retrieve all Products
    app.get('/posts', posts.findAll);

    // Retrieve a single Product with productId
    app.get('/posts/:postId', posts.findOne);

    // Update a Note with productId
    app.put('/posts/:postId', posts.update);

    // Delete a Note with productId
    app.delete('/posts/:postId', posts.delete);
}
