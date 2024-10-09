const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const filesDirectory = path.join(__dirname, 'images');

app.get("/files", (req, res) => {
  
  console.log(filesDirectory)
  fs.readdir(filesDirectory, (err, files) => {
    if(err){
        res.status(500).json({error : "Unable to read directory"});
    } else {
        res.status(200).json({files});
    }
  })
})

app.get("/files/:fileName", (req, res) => {
    const name = req.params.fileName;
    const filePath = path.join(filesDirectory, name);

    if(fs.existsSync(filePath)){
        fs.readFile(filePath, "utf-8", (err, data) => {
            if(err){
                console.error("Error reading file:", err); 
                res.status(500).json("Error reading file")
            } else{
                res.status(200).send(data);
            }
        });
    } else{
        res.status(404).json({ msg :"File not found"})
    }
})

app.listen(3000)