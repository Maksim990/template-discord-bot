//Для ембедов бота
let default_ = "0x000000";
let white = "0xffffff";
let aqua = "0x1abc9c";
let green = "0x2ecc71";
let blue = "0x3498db";
let yellow = "0xffff00";
let purple = "0x9b59b6";
let luminous_vivid_pink = "0xe91e63";
let gold = "0xf1c40f";
let orange = "0xe67e22";
let red = "0xe74c3c";
let grey = "0x95a5a6";
let navy = "0x34495e";
let dark_aqua = "0x11806a";
let dark_green = "0x1f8b4c";
let dark_blue = "0x1f8b4c";
let dark_purple = "0x71368a";
let dark_vivid_pink = "0xad1457";
let dark_gold = "0xc27c0e";
let dark_orange = "0xa84300";
let dark_red = "0x992d22";
let dark_grey = "0x979c9f";
let darker_grey = "0x7f8c8d";
let light_grey = "0xbcc0c0";
let dark_navy = "0x2c3e50";
let blurple = "0x7289da";
let greyple = "0x99aab5";
let dark_but_not_black = "0x2c2f33";
let not_quite_black = "0x23272a";
const arr = [
    default_, white, aqua, green, blue,
    yellow, purple, luminous_vivid_pink, gold,
    orange, red, grey, navy, dark_aqua,
    dark_green, dark_blue, dark_purple,
    dark_vivid_pink, dark_gold, dark_orange,
    dark_red, dark_grey, darker_grey,
    light_grey, dark_navy, blurple,
    greyple, dark_but_not_black, not_quite_black
];
exports.default_ = () => { return default_ };
exports.white = () => { return white };
exports.aqua = () => { return aqua };
exports.green = () => { return green };
exports.blue = () => { return blue };
exports.yellow = () => { return yellow };
exports.purple = () => { return purple };
exports.luminous_vivid_pink = () => { return luminous_vivid_pink };
exports.gold = () => { return gold };
exports.orange = () => { return orange };
exports.red = () => { return red };
exports.grey = () => { return grey };
exports.navy = () => { return navy };
exports.dark_aqua = () => { return dark_aqua };
exports.dark_green = () => { return dark_green };
exports.dark_blue = () => { return dark_blue };
exports.dark_purple = () => { return dark_purple };
exports.dark_vivid_pink = () => { return dark_vivid_pink };
exports.dark_gold = () => { return dark_gold };
exports.dark_orange = () => { return orange };
exports.dark_red = () => { return dark_red };
exports.dark_grey = () => { return dark_grey };
exports.darker_grey = () => { return darker_grey };
exports.light_grey = () => { return light_grey };
exports.dark_navy = () => { return dark_navy };
exports.blurple = () => { return blurple };
exports.greyple = () => { return greyple };
exports.dark_but_not_black = () => { return dark_but_not_black };
exports.not_quite_black = () => { return not_quite_black };
exports.randomColor = () => { return arr[Math.floor(Math.random() * 29)] };
exports.lengthColor = () => { return arr[Math.floor(Math.random() * arr.length)] };