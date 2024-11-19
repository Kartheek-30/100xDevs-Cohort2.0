const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const todos =[ {
    "task": "Add todo 1",
    "description": "Added one todo",
    "id" : 1
},
{
    "task": "Add todo 2",
    "description": "Added one todo",
    "id" : 2
},
{
    "task": "Add todo 3",
    "description": "Added one todo",
    "id" : 3
},
{
    "task": "Add todo 4",
    "description": "Added one todo",
    "id" : 4
},
{
    "task": "Add todo 5",
    "description": "Added one todo",
    "id" : 5
}];

const getRandomTasks = (tasks) => {
const maxTasks = Math.floor(Math.random() * (tasks.length + 1)); 

return todos.slice(0, maxTasks);
}

app.get("/todos", (req, res) => {
    const response = getRandomTasks(todos);
    res.send(response);
});

app.listen(3000);