const express = require('express');
const bodyParser = require('body-parser');
const { todo } = require('node:test');
const port = process.env.port || 3000;
const app = express();
let id = 1;

app.use(bodyParser.json());
const todoList = [];
app.get('/todos', (req, res) => {
  res.status(200).send(todoList);
})

app.get('/todos/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = todoList.find(t => t.id === taskId)

    if(task){
        res.status(200).json(task);
    } else {
        res.status(404).json({msg: "Task not found"})
    }
})

app.post("/todos", (req, res) => {
    const {title, completed, description} = req.body;

    if(!title || typeof completed !== 'boolean' || !description){
        return res.status(404).json({msg: "Invalid data"})
    }

    const newTask = {
        id: id++,
        title,
        completed,
        description
    };

    todoList.push(newTask);
    res.status(201).json(newTask);
})

app.put("/todos/:id", (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = todoList.findIndex(t => t.id === taskId);
    const {title, completed, description} = req.body;

    if (taskIndex === -1) {
        return res.status(404).json({ msg: "Task not found" });
    }

    if(completed !== undefined && typeof completed !== 'boolean'){
        res.status(400).json({msg: "Invalid body 'completed' must be a boolean"})
    }
    todoList[taskIndex] = {
        id: taskId,
        title: title || todoList[taskIndex].title,
        completed: completed !== undefined ? completed : todoList[taskIndex].completed,
        description: description || todoList[taskIndex].description
    };

    res.status(200).json(todoList[taskIndex]);

});

app.delete("/todos/:id", (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = todoList.find(t => t.id === taskId);

    if(task !== -1) {
        todoList.splice(task, 1);
        res.status(200).json({msg: "Given task is deleted"});
    } else {
        res.status(404).json({msg: "Task not found"})
    }
});

app.listen(port);