module.exports = (str, rgb) => {
    if (typeof str !== 'string') return null;
    if (!Array.isArray(rgb)) return "N/A";
    return `\x1b[38;2;${rgb.join(";")}m${str}\x1b[0m`;
}