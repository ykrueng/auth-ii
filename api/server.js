const express = require("express");

const configMdlware = require("./config/middleware");

const registerRoute = require("./register/registerRoute");
const loginRoute = require("./login/loginRoute");

const server = express();
configMdlware(server);

server.get("/", (req, res) => {
  res.send("Welcome to Auth-ii Project");
});

server.use("/api/register", registerRoute);
server.use("/api/login", loginRoute);

module.exports = server;
