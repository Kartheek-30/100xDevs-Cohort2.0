const fs = require("fs");

function fileRead() {
    fs.readFile("a.txt", "utf-8", (err, data) => {
        if(err){
            console.error("Unable to read file");
        } else {
            console.log("File content: \n", data);

            expOperation(1000);
            expOperation(100000);
            expOperation(1000000000);
        }
    })
    
}

function expOperation(iterations) {
    console.time(`Expensive operation with ${iterations} iterations`);

    let a = 0;
    for(let i = 0; i <= iterations; i++){
        a+=i;
    }

    console.log(`Result of ${iterations}: `, a);
    console.timeEnd(`Expensive operation with ${iterations} iterations`);
}

function fileWrite() {
    const data = "\n Hello from newbie!!! \n";
    fs.appendFile("a.txt", data, (err) => {
        if(err){
            console.error("Unable to write to file");
        } else {
            console.log("File written successfully");
        }
    })
}

fileRead();

fileWrite();

fileRead();