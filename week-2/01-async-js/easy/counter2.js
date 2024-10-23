function counter(){
    let count = 1;
    setTimeout(function run() {
        console.log(count++);
        setTimeout(run, 1000);
    }, 1000);
}

counter();



// Printing current seconds

function currentSeconds(){
    const now = new Date();
    const seconds = now.getSeconds();
    console.log("Current seconds: ", seconds);

    setTimeout(currentSeconds, 1000);
}

//currentSeconds();