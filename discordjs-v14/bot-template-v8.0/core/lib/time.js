module.exports = (str) => {
    let data = new Date();
    let years = data.getFullYear();
    let months = padStr(data.getMonth() + 1);
    let days = padStr(data.getDate());
    let hours = padStr(data.getHours());
    let minutes = padStr(data.getMinutes());
    let seconds = padStr(data.getSeconds());
    let ms = data.getMilliseconds();

    let list = {
        "data list": `${days}.${months}.${years} ${hours}:${minutes}`,
        "time ms": `${hours}:${minutes}:${seconds}.${ms}`,
        "time min": `${hours}:${minutes}:${seconds}`,
        "data": `${days}.${months}.${years}`,
        "time": `${hours}:${minutes}`
    };

    return list[str];
}

function padStr(i) {
    return i.toString().padStart(2, "0");
}