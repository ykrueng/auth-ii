const express = require("express");

const configMdlware = require("./config/middleware");

const registerRoute = require("./register/registerRoute");

const server = express();
configMdlware(server);

server.get("/", (req, res) => {
  res.send("Welcome to Auth-ii Project");
});

server.use("/api/register", registerRoute);

module.exports = server;
