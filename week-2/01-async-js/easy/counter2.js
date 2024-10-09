function counter(){
    let count = 1;
    function incCounter(){
        console.log(count++);

        setTimeout(incCounter, 1000);        
    }
    incCounter();
}

//counter();


// Printing current seconds

function currentSeconds(){
    const now = new Date();
    const seconds = now.getSeconds();
    console.log("Current seconds: ", seconds);

    setTimeout(currentSeconds, 1000);
}

currentSeconds();