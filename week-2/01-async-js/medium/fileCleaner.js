const fs = require("fs");

function fileClean() {
    fs.readFile("a.txt", "utf-8", (err, data) => {
        if(err) {
            console.error("Unable to read file");
        }
         else {
            const cleanData = data.replace(/\s+/g, " ").trim();

            fs.writeFile("a.txt", cleanData, "utf-8", (err) => {
                if(err){
                    console.error("Unable to write to file");
                    return;
                }
                console.log("Successfully updated the file contents.")
            })
         }
    });
}

fileClean();