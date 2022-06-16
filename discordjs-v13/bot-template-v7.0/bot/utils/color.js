module.exports = (text, { r, g, b }) => {
    return `\x1b[38;2;${r};${g};${b}m${text}\x1b[0m`;
};