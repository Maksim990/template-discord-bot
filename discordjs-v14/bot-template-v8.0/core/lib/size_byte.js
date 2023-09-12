module.exports = (byte,bit) => {
    /**
     * !Как использовать эту функцию
     * size_byte(0,"1000") - (number byte, 1000/1024бит)
    **/
    /*
    ?Вычесленная сумма байтов в конвертируемое, играйтесь на здоровье
    1024byte = 1kb
    5120byte = 5kb
    102406byte = 100kb
    1048576byte = 1mb
    5242880byte = 5mb
    104857600byte = 100mb
    1073741824byte = 1gb
    5368709120byte = 5gb
    107374182400byte = 100gb
    1099511627776byte = 1tb  
    5497558138880byte = 5tb
    109951162777600byte = 100tb
    1125899906842624byte = 1pt
    5629499534213120byte = 5pt
    112589990684262400byte = 100pt
    1152921504606847000byte = 1eb
    5764607523034235000byte = 5eb
    115292150460684700000byte = 100eb
    1180591620717411303424byte = 1zb
    5902958103587056517120byte = 5zb
    118059162071741130342400byte = 100zb
    1208925819614629174706176byte = 1ib
    6044629098073145873530880byte = 5ib
    120892581961462917470617600byte = 100ib
    */
    let Errors = {"typeof":{"string":"строка","number":"цифра","object":"объект","boolean":"булевых"}};
    if(bit == "1000"){
        if(isNaN(byte)) return "N/A";
        if(typeof byte !== "number") return new Error(`Тип ${Errors.typeof[typeof byte]} не присваивается для этой функции первого типа`);
        let a = byte, b = 2, k = 1000;
        with(Math){
            let d=floor(log(a)/log(k));
            return 0 == a ? "0байт": parseFloat((a/pow(k,d)).toFixed(max(0,b)))+["байт","кб","мб","гб","тб","пт","эб","зб","иб"][d]
        }
    }else{
        bit = "1024";
    }
    if(bit == "1024"){
        if(isNaN(byte)) return "N/A";
        if(typeof byte !== "number") return new Error(`Тип ${Errors.typeof[typeof byte]} не присваивается для этой функции второго типа`);
        let a = byte, b = 2, k = 1024;
        with(Math){
            let d=floor(log(a)/log(k));
            return 0 == a ? "0байт": parseFloat((a/pow(k,d)).toFixed(max(0,b)))+["байт","кб","мб","гб","тб","пт","эб","зб","иб"][d]
        }
    };
}