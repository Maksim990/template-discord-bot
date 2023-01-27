function uptime(text){
    if(typeof text !== "number") return console.log(TypeError("Unable to read text, number is undefined"));
    let totalSeconds = (text / 1000);
    let daysWatch = Math.floor(totalSeconds / 86400);
    let hoursWatch = Math.floor(totalSeconds / 3600);
    let minutesWatch = Math.floor(totalSeconds / 60);
    let secondsWatch = Math.floor(totalSeconds % 60);
    if(daysWatch != 0){
        var days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        if(days <= 1) days = `${days}день `;
        if(days <= 4) days = `${days}дня `;
        if(days >= 5) days = `${days}дней `;
    }else days = ""
    if(hoursWatch != 0){
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        if(hours <= 1) hours = `${hours}час `;
        if(hours <= 4) hours = `${hours}часа `;
        if(hours >= 5) hours = `${hours}часов `;
    }else hours = ""
    if(minutesWatch != 0){
        var minutes = Math.floor(totalSeconds / 60);
        if(minutes <= 1) minutes = `${minutes}минута `;
        if(minutes <= 4) minutes = `${minutes}минуты `;
        if(minutes >= 5) minutes = `${minutes}мин `;
    }else minutes = ""
    if(secondsWatch != 0){
        var seconds = Math.floor(totalSeconds % 60);
        if(seconds <= 1) seconds = `${seconds}секунда`;
        if(seconds <= 4) seconds = `${seconds}секудны`;
        if(seconds >= 5) seconds = `${seconds}сек`;
    }else seconds = ""

    if(!secondsWatch && !minutesWatch && !hoursWatch && !daysWatch && !monthDays) {
        if(totalSeconds >= 0) 
        var milliseconds = totalSeconds + "ms";
    }else var milliseconds = "";
    /*if(!secondsWatch && !minutesWatch && !hoursWatch && !daysWatch && !monthDays == 0){
        var end = "Время вышло";
    }else{end = ""}*/
    let uptime = `${days}${hours}${minutes}${seconds}${milliseconds}`;
    return uptime;
}

exports.uptime = uptime;