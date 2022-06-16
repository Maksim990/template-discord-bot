const express = require("express");
const app = express();

app.all("/", res => {
   res.writeHead(200, {"Content-Type":"plain/html"});
   res.end("<p>start host</p>");
});

function server(){
   console.log("Start server replit 24/7");
   app.listen(1007, () => {console.log("Server running the start host repl 24/7")});
}

exports.server = server;