const express = require("express");
const app = express();


// Defining middlewares
/*
    Middleware use cases
        1. Input validation
        2. Body parsing
        3. Authentication and Authorization
        4. Error handling
        5. Cross origin resource sharing (CORS)
        6. Rate limiting / Request throttling
        7. Session managements
        8. Request logging
        9. Conditional Middleware Execution
        10. Request Data Compression

*/
// Middlewares will have req, res, next() - > This will be responsible for calling the next function if everything goes well in a middleware.
// Middlewares are the pre-checks between the end-point and the main function of the HTTP method.
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


// Post req

// app.use() is required to read the body, Here we'll declare the type of content that should take/read from the body. Based on this we'll
// catch the inputs in POST method.
app.use(express.json());

app.post("/post", (req, res) => {
    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;
    
    res.send("You have " + kidneyLength + " kidneys");
});


// Error handling middlewares => Global catches
/*
    It is used to catch exceptions if any route is failed.
    It takes 4 inputs => err, req, res, next
*/

app.use((err, req, res, next) =>{
    res.status(500).json({
        "msg": "Sorry something is up with our server"
    })
})

app.listen(3000);