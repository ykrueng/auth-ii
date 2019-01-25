const express = require("express");

const usersRoute = require("./users/usersRoute");

router = express.Router();

router.use("/users", usersRoute);

module.exports = router;
