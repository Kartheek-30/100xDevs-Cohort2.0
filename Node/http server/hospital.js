const express = require("express");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json());

var users = [{
    name: "John",
    kidneys: [{
        healthy: true
    }]
}];

// Query parameter is sent via URL by adding a question mark and value to the URL 

app.get("/", (req, res) => {
    const johnKidneys = users[0].kidneys;
    console.log(johnKidneys);
    const numOfKidneys = johnKidneys.length;
    let numOfHealthyKidneys = 0;
    for(let i = 0; i < johnKidneys.length; i++){
        if(johnKidneys[i].healthy){
            numOfHealthyKidneys = numOfHealthyKidneys + 1;
        }
    }
    console.log(johnKidneys[0])
    console.log(johnKidneys[0].healthy)
    const numOfUnhealthyKidneys = numOfKidneys - numOfHealthyKidneys;
    res.json({
        numOfKidneys,
        numOfHealthyKidneys,
        numOfUnhealthyKidneys
    })
})

// We'll send data via body
// Add kidneys either healthy or unhealthy

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })

    res.json({
        msg: "done"
    })
})

// Change all the unhealthy kidneys to healthy ones
app.put("/", (req, res) => {
    if(checkUnhealthyKidney()){
        for(let i = 0; i < users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true;
        }
        res.json({});
    } else {
        res.status(400).json({
            msg: "You don't have a bad kidney"
        })
    }
})

// removing all the unhealthy kidneys
app.delete("/", (req, res) => {
    if(checkUnhealthyKidney()){
        const newKidneys = [];
        for(let i = 0; i < users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            }
        } 
        users[0].kidneys = newKidneys;
        res.json({msg: "done"})
    } else {
        res.status(400).json({
            msg : "You don't have any bad kidneys"
        })
    }
})

function checkUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i = 0; i < users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}

app.listen(3000);