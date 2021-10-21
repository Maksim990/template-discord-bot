function time(){    var data = new Date();
    var hour = data.getHours();
    var minute = data.getMinutes();
    let month = data.getMonth();
    let date = data.getDate();
    let year = data.getFullYear();
    if(month > 12){ var getmonth = month - 1 }else{ var getmonth = `${month}`; }
    if(month => 0){ var getmonth = month + 1; };

    if(hour == "1"){
        var hours = "01";
    }else if(hour == "2"){
        var hours = "02";
    }else if(hour == "3"){
        var hours = "03";
    }else if(hour == "4"){
        var hours = "04";
    }else if(hour == "5"){
        var hours = "05";
    }else if(hour == "6"){
        var hours = "06";
    }else if(hour == "7"){
        var hours = "07";
    }else if(hour == "8"){
        var hours = "08";
    }else if(hour == "9"){
        var hours = "09";
    }else{
    var hours = `${hour}`;
    }
    if(minute == "1"){
        var minutes = "01";
    }else if(minute == "2"){
        var minutes = "02";
    }else if(minute == "3"){
        var minutes = "03";
    }else if(minute == "4"){
        var minutes = "04";
    }else if(minute == "5"){        var minutes = "05";
    }else if(minute == "6"){
        var minutes = "06";    }else if(minute == "7"){        var minutes = "07";
    }else if(minute == "8"){
        var minutes = "08";
    }else if(minute == "9"){
        var minutes = "09";
    }else{
        var minutes = `${minute}`;
    }
    var tim = `${hours}:${minutes}`;
    var dat = `${date}.${getmonth}.${year}`;

    let time = `${dat} ${tim}`;
    return time;
}
setInterval(() => { time() }, 1000);

global.time = time;