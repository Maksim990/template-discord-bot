function random(min, max) {
    if(refaild(min) && refaild(max)) {
        if(isNaN(min)) return "N/A";
        if(isNaN(max)) return "N/A";

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return null;
}

function refaild(value) {
    let out = true;
    if(typeof value !== "number") {
        if(value == true) out = false;
        if(value == false) out = false;
    };
    if(value == undefined) out = false;
    if(value == null) out = false;
    if(value == Infinity) out = false;
    if(value == NaN) out = false;
    return out;
}

exports.random = random;

/*class RNG {
    constructor(key) {
        this.key = key;
    }

    random() {
        const a = 269323675994833;
        const b = 7131910007;
        const c = 3408380627;
        return (this.key = (this.key * b + c) % a) / a;
    }
}*/