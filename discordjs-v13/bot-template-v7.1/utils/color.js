function color(text, obj) {
    if(!!text && !!obj) {
        if(typeof obj !== "object") return "N/A";
        if(typeof text !== "string") return "N/A";

        obj = {
            r: obj.r ?? 255,
            g: obj.g ?? 255,
            b: obj.b ?? 255
        };

        return `\x1b[38;2;${obj.r};${obj.g};${obj.b}m${text}\x1b[0m`;
    };
    return null;
}

exports.color = color;