const date = new Date();
let counter = 1;

function counter1(callback, duration) {
    setInterval(callback, duration);
}

counter1(() => {
    console.log(counter++)
}, 1000);
