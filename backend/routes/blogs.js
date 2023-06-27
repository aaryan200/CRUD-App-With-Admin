const router = require('express').Router();
const Blog = require('../models/Blog');

// CREATE BLOG
router.post("/", async (req, res) => {
    const newBlog = new Blog(req.body);
    try {
        await newBlog.save();
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// EDIT BLOG
router.put("/:blogId", async (req, res) => {
    try {
        // console.log(req.params.blogId);
        const blog = await Blog.findById(req.params.blogId);
        // console.log(blog.email);
        // console.log((req.body.email === process.env.ADMIN_EMAIL));
        if (blog.email === req.body.email || req.body.email === process.env.ADMIN_EMAIL) {
            try {
                req.body.email = blog.email;
                const updatedBlog = await Blog.findByIdAndUpdate(req.params.blogId, {
                    $set: req.body
                }, { new: true });
                res.status(200).json(updatedBlog);
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE BLOG
router.delete("/:blogId", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId);
        if (!blog) {
            return res.status(404).json("Blog not found");
        }
        // console.log(blog.email)
        // console.log(req.body.email)
        if (blog.email === req.body.email || req.body.email === process.env.ADMIN_EMAIL) {
            try {
                await Blog.findByIdAndDelete(req.params.blogId);
                return res.status(200).json("Successfully deleted");
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        else {
            res.status(401).json("You can't delete this post");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// GET BLOG
router.get("/:blogId", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all blogs or blogs of a particular email
router.get("/", async (req, res) => {
    const email = req.query.email;
    try {
        let blogs;
        if (email) {
            blogs = await Blog.find({ email });
        }
        else {
            blogs = await Blog.find();
        }
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get a random blog id
router.get("/get/random", async (req, res) => {
    try {
        const count = await Blog.countDocuments({});
        const randomIndex = Math.floor(Math.random() * count);
        const randomBlogId = await Blog.findOne().skip(randomIndex).select("_id");
        res.status(200).json(randomBlogId);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router