/* 
    Zod is a input validation library which will validate the inputs based on the given criteria 
    Eg: Email, username(With specific number of characters), Password
*/

const express = require("express");
const z = require("zod");
const app = express();
app.use(express.json());

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    country: z.literal("IN").or(z.literal("US")),
    kidneys: z.array(z.number())
});

app.post('/post', (req, res) => {
    const body = req.body;
    const response = schema.safeParse(body);
    res.send(response);
});

app.listen(3000);