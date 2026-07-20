const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET Route
app.get("/blogs", (req, res) => {
    res.json({
        message: "GET request working successfully!",
        blogs: []
    });
});

// POST Route
app.post("/blogs", (req, res) => {

    const blog = req.body;

    res.status(201).json({
        message: "Blog received successfully!",
        data: blog
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});