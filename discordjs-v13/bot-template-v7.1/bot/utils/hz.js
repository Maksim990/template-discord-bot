function hz(text){
    let Errors = {"typeof":{"string":"строка","object":"объект","boolean":"булевых"}};
    if(isNaN(text)) return "N/A";
    if(typeof text !== "number") return new Error(`Тип ${Errors.typeof[typeof text]} не присваивается для этой функции`);
    if(text < "1000") return `${text}Кгц`;
    if(text < "100000") return `${(text/1000).toFixed(2)}Мгц`;
    if(text < "1000000") return `${(text/1000).toFixed(1)}Мгц`;
    if(text < "100000000") return `${(text/1000/1000).toFixed(2)}Ггц`;
    if(text < "1000000000") return `${(text/1000/1000).toFixed(1)}Ггц`;
    if(text => "1000000000") return `${(text/1000/1000).toFixed(0)}Ггц`;
}

exports.hz = hz;