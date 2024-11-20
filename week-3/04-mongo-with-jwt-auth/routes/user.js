const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        username,
        password
    }).then(async function (value) {
        if(value) {
            res.status(403).json({
                msg: "User already exists"
            });
        } else {
            await User.create({
                username,
                password
            })
            res.json({
                msg: "User created successfully"
            })
        }
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
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

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.send(courses);
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    
    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    }).catch(function(e) {
        console.log(e);
    })

    res.json({
        msg: "Course purchased successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    const user = await User.findOne({
        username: username
    });
    const courses = await Course.find({
        _id : {
            "$in": user.purchasedCourses
        }
    });
    res.json({
        courses: courses
    });
});

module.exports = router