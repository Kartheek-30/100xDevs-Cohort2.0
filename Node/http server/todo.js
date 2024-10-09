const prompt = require('prompt-sync')();
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('<h1>Hi Cutie ❤️</h1>')
});

app.post("/data/", (req, res) => {
    const n = req.query.n;
    console.log(req.headers);
    res.json({
        msg: n
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})