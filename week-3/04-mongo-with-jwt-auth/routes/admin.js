const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.findOne({
        username: username,
        password: password
    }).then(async function (value) {
        if(value) {
            res.status(400).json({
                msg: "Admin user already exists"
            });
        } else{
            await Admin.create({
                username,
                password
            })
            res.json({
                msg: "Admin user created successfully"
            })
        }
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.find({
        username,
        password
    })
    if(user) {
        const token = jwt.sign({username}, process.env.JWT_SECRET); 
        res.json({
            token
        })
    } else {
        json.status(403).json({
            msg: "Unauthenticated access"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const course = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        msg: "Course created successfully",
        courseId: course._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.send(courses);
});

module.exports = router;