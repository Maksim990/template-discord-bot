function addLeadingZero(num) {
    if (num < 10) {
        return "0" + num;
    }
    return num;
}

module.exports = (type) => {
    const date = new Date();
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    const seconds = addLeadingZero(date.getSeconds());
    const milliseconds = addLeadingZero(date.getMilliseconds());
    const years = date.getFullYear();
    const months = addLeadingZero(date.getMonth() + 1);
    const days = addLeadingZero(date.getDate());

    let result = `${hours}:${minutes}:${seconds}`;

    //   if(text == "data list") text = `${days}.${months}.${years} ${hours}:${minutes}`;
    //     if(text == "time ms") text = `${hours}:${minutes}:${seconds}.${ms}`;
    //     if(text == "data") text = `${days}.${months}.${years}`;
    //     if(text == "time") text = `${hours}:${minutes}`;

    return result;
};