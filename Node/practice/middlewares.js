const express = require("express");
const app = express();

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    if(username !== 'Kartheek' || password !== 'pass') {
        res.status(403).json({
            "msg" : "Invalid username"
        });
    } else {
        next();
    }
};

function kidneyMiddleware(req, res, next) {
    const kidneyId = +req.query.kidneyId;

    if(kidneyId !== 1 && kidneyId !== 2) {
        res.status(403).json({
            "msg" : "Invalid kidney details"
        });
    } else {
        next();
    }
};

app.get("/health-check", userMiddleware, kidneyMiddleware, (req, res) => {
    res.send("Your health is fine");
    });

app.get("/kidney-check", kidneyMiddleware, (req, res) => {
    res.send("Your kidney is Fine!");
});



// // Ugly way of declaring Methods
// app.get("/health-check", (req, res) => {
//     const username = req.headers.username;
//     const password = req.headers.password;
//     const kidneyId = +req.query.kidneyId;

//     if(username !== 'kartheek' || password !== 'pass'){
//         res.status(403).json({
//             "msg": "User data not found!"
//         });
//         return;
//     }

//     if(kidneyId !== 1 && kidneyId !== 2) {
//         res.status(411).json({
//             "msg" : "Wrong Kidney ID!!!"
//         });
//         return;
//     }

//     res.send("Your Kidney is fine!");
// });

app.listen(3000);