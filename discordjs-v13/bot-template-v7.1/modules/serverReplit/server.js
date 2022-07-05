const express = require("express");
const app = express();

app.all("/", (req, res) => {
    res.end("<p>Running host</p><img src='https://c.tenor.com/6MsukwHKJ58AAAAC/ara-anime.gif'>");
});

function server(){
    app.listen(1024);
    console.log("Server replit running for host 24/7");
}

exports.server = server;