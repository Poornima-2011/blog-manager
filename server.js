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

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});