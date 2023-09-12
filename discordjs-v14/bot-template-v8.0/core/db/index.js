const { log } = require("../lib");
const fs = require("fs-extra");
const path = require("path");
const { Readable, Writable, pipeline } = require("stream");
const { promisify } = require("util");

const fileName = path.join(__dirname, "./db.json");

// Функция для чтения данных из файла в виде потока
function createReadStream() {
    return fs.createReadStream(fileName, 'utf8');
}

// Функция для записи данных в файл в виде потока
function createWriteStream() {
    return fs.createWriteStream(fileName, { encoding: 'utf8' });
}

// Функция для чтения данных
async function read() {
    const dataStream = createReadStream();
    let data = '';

    dataStream.on('data', chunk => {
        data += chunk;
    });

    await promisify(dataStream.on.bind(dataStream))('end');

    try {
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (err) {}
}

// Функция для записи данных
async function write(obj) {
    if (!obj || typeof obj !== "object") {
        log("Не удалось записать данные", "warn");
        return;
    }

    const dataStream = createReadStream();
    let data = '';

    dataStream.on('data', chunk => {
        data += chunk;
    });

    await promisify(dataStream.on.bind(dataStream))('end');

    let jsonData = {};

    try {
        jsonData = JSON.parse(data);
    } catch (err) {}

    Object.assign(jsonData, obj);

    const writeStream = createWriteStream();

    // Используем промисифицированный pipeline
    const pipelineAsync = promisify(pipeline);

    await pipelineAsync(
        Readable.from(JSON.stringify(jsonData, null, 4), 'utf8'),
        writeStream
    );
}

module.exports = { read, write };