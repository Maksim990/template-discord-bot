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

    return result;
};