const express = require("express");
const cars = require("./routes/carsRoute");

const server = express();

server.use(express.json());
server.use('/cars', logger, cars);

server.get("/", logger, (req, res)=> {
    res.send("<h1>Server Root</h1>")
})


function logger (req, res, next){
    console.log(`[${new Date().toISOString()}] ${req.method} at ${req.url}`);
    next();
}

module.exports = server;