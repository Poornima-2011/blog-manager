const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Store blogs in memory
let blogs = [];

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get all blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// Add a new blog
app.post("/blogs", (req, res) => {

    const { title, author, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const newBlog = {
        id: blogs.length + 1,
        title,
        author,
        content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog added successfully!",
        blog: newBlog
    });

});

// Edit Blog
app.put("/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found."
        });
    }

    const { title, author, content } = req.body;

    if (title) blog.title = title;
    if (author) blog.author = author;
    if (content) blog.content = content;

    res.json({
        message: "Blog updated successfully!",
        blog: blog
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});