require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const User = mongoose.model("Users", UserSchema);

app.post("/signup", async(req, res) => {
    const username = req.body.name;
    const useremail = req.body.email;
    const userpassword = req.body.password;

    const existingUser = await User.findOne({email: useremail});

    if(existingUser) {
        return res.status(400).send("User already exists");
    }

    const user = new User ({
        name: username,
        email: useremail,
        password: userpassword,
    });

    user.save();
    res.json({
        "msg": "User created successfully"
    });
});

app.get("/users", (req, res) => {
    if(User.length > 0) {
        res.send(User());
    }
});

app.listen(3000);