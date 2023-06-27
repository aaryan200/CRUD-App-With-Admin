const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const bcrypt = require("bcrypt");

// Update user
router.put("/:userId", async (req, res) => {
    try {
        if (req.body.userId === req.params.userId) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            try {
                const user = await User.findById(req.params.userId);
                const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                    $set: req.body
                }, { new: true });
                // if (user.email !== updatedUser.email) {
                    // console.log("here")
                try {
                    // get all blogs of the user with previous mail
                    const blogs = await Blog.find({ email: user.email });
                    // (await blogs).forEach((blog) => {
                    //     Blog.findByIdAndUpdate(blog._id, {
                    //         email: updatedUser.email
                    //     }, { new: true });
                    // });
                    // update the field email and username of each blog
                    for (const blog of blogs) {
                        await Blog.findByIdAndUpdate(blog._id, { email: updatedUser.email, username: `${updatedUser.firstName} ${updatedUser.lastName}` }, { new: true });
                    }
                } catch (err) {
                    return res.status(500).json("Something went wrong");
                }
                // }
                return res.status(200).json(updatedUser);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        else {
            return res.status(401).json("Permission Denied");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get user by email
router.get("/", async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ email });
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get user
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete user
router.delete("/:userId", async (req, res) => {
    if (req.body.userId === req.params.userId) {
        const user = await User.findById(req.params.userId);
        try {
            await Blog.deleteMany({ email: user.email });
            await User.findByIdAndDelete(req.params.userId);
            res.status(200).json("Deleted successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(401).json("Permission Denied!");
    }
});

// get total number of users
// router.get("/count", async (req, res) => {
//     console.log("here");
//     try {
//         // await User.countDocuments({}, (err, ct) => {
//         //     if (err) res.status(500).json(err);
//         //     console.log(ct);
//         //     res.status(200).json(ct);
//         // })
//         console.log(count);
//         res.status(200).json(count);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

// GET numeber of users
router.get("/get/count", async (req, res) => {
    // if (req.query.email === process.env.ADMIN_EMAIL) {
        try {
            // this method is deprecated
            // await User.countDocuments({}, function (err, cnt) {
            //     res.status(200).json(cnt);
            // })
            const count = await User.countDocuments({});
            res.status(200).json(count);
        } catch (error) {
            res.status(500).json(error);
        }
    // }
    // else res.status(401).json("Permission denied");
});

module.exports = router;