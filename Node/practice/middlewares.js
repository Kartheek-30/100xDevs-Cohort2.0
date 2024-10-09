const express = require("express");
const app = express();

app.get("/health-check", (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = +req.query.kidneyId;

    if(username !== 'kartheek' || password !== 'pass'){
        res.status(403).json({
            "msg": "User data not found!"
        });
        return;
    }

    if(kidneyId !== 1 && kidneyId !== 2) {
        res.status(411).json({
            "msg" : "Wrong Kidney ID!!!"
        });
        return;
    }

    res.send("Your Kidney is fine!");
});

app.listen(3000);