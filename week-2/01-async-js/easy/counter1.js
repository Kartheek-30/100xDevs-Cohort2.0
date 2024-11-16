let counter = 1;

setInterval(() => {
    console.log(counter++)
}, 1000);

/*
    Timer for specific (30) seconds
    let counter = 1;

    const interval = setInterval(() => {
        console.log(counter++)
        if (counter > 30) {
            clearInterval(interval);
        }
    }, 1000);
    
}
*/