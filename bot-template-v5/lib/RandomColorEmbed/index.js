//Для ембедов бота
let blue = "BLUE";
let green = "GREEN";
let yellow = "YELLOW";
let red = "RED";
let orange = "ORANGE";

const arr = [
    blue,
    green,
    yellow,
    red,
    orange,
];

exports.ColorBlue = () => {
    return blue;
};

exports.ColorGreen = () => {
    return green;
};

exports.ColorYellow = () => {
    return yellow;
};

exports.ColorRed = () => {
    return red;
};

exports.ColorOrange = () => {
    return orange;
};

exports.randomColor = () => {
    return arr[Math.floor(Math.random() * 5)];
};

exports.massive = massive;