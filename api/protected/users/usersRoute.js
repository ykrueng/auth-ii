const express = require("express");

const db = require("../../../data/helpers/userDb");
// const error = require("./usersError");

const router = express.Router();

router.get("/", async (req, res) => {

  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user info."})
  }
});

module.exports = router;
