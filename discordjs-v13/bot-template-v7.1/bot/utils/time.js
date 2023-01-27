function time(text) {
    let data = new Date();
    let years = data.getFullYear();
    let months = padStr(data.getMonth() + 1);
    let days = padStr(data.getDate());
    let hours = padStr(data.getHours());
    let minutes = padStr(data.getMinutes());
    let seconds = padStr(data.getSeconds());
    let ms = data.getMilliseconds();
    
    if(text == "data list") text = `${days}.${months}.${years} ${hours}:${minutes}`;
    if(text == "time ms") text = `${hours}:${minutes}:${seconds}.${ms}`;
    if(text == "data") text = `${days}.${months}.${years}`;
    if(text == "time") text = `${hours}:${minutes}`;

    return text;
}

function padStr(i) {
    return i.toString().padStart(2, "0");
}

exports.time = time;