function currentTime() {
    const date = new Date();
    let hours = date.getHours() % 12 || 12;
    hours = String(hours).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';


    console.log(`${hours}:${minutes}:${seconds} ${ampm}`);
    setTimeout(currentTime, 1000);
}

currentTime();