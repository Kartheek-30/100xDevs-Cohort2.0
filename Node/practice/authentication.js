/*
    How authentication works
        1. User sends username, Password from frontend / Postman / any post req
        2. The credentials will get validated at the backend using Databases
        3. If the user is valid then the backend will generate and return a token to the user
        4. This token gets stored in the browser(local storage) and for every request from now on this token will be used.

        Hashing: ->  One way -> Doesn't need a password
            Converting a simple string into a complicated gibberish string. Such that whenever a hash function called on the same simple string,
            it gets converted into the same gibberish string. Cannot be decrypted back to the simple string.
            Whenever a user signs up to a site, The username stores into the DB and the password will gets hashed and later whenever we logged 
            into a site, The password is converted to the gibberish string and will be compared with the string present in DB.
        
        Encryption: -> Two way -> Needs a Password
            Similar to Hashing but, We can convert the gibberish to the password by using a key.
            Eg: When we upload an image or video, It will be encrypted and stores in to the DB, Then when we fetch it, It'll decrypt and shows 
            us the content.

        Json Web Tokens(JWT): 
            It's neither an encryption/hashing function but creating a digital signature which will only work for JSON inputs.
            It generates the token after converting the JSON input.
            It's not protected / Hashed. Whoever having the token can see the contents of it(JSON Object).
            But only the backend server can verify the JWT token using the password and convert it to original object. Then based on it we can
             access the site/content
        
        Local storage:
            Whenever a user login to the site, the credentials will be validated at the backend and a token will be generated.
            The frontend devs will take this token and will store it in a local storage present in the browser and will be stored till the user 
            logs out. From now on every subsequent request from the user will send this token and will be verified at the backend instead of 
            sending the credentials all the time.
*/

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS =[
    {
        username: "kartheek@gmail.com",
        password: "123",
        name: "Kartheek",
    },
    {
        username: "raja@gmail.com",
        password: "12321",
        name: "Raja",
    },
    {
        username: "nikki@gmail.com",
        password: "1234321",
        name: "nikki",
    },
];

function userExists(username, password) {
    return ALL_USERS.find(user => user.username === username && user.password === password) !== undefined;
}

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesn't exist",
        });
    }

    var token = jwt.sign({username: username}, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        // return list of users other than this username
        res.json({
            users: ALL_USERS.filter((value) => {
                if(value.username == username) {
                    return false;
                } else {
                    return true;
                }
            })
        });
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});

app.listen(3000);