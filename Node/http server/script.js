const express = require("express")
const port = 3000
const app = express();

// app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/conversation',(req, res) => {
    console.log(req.headers);
    console.log("=============================")
    console.log(req.body);
    res.send({
        msg: "2 + 2 = 4"
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})