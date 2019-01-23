const express = require("express");

const db = require("../../../data/helpers/userDb");
const { decodeToken } = require("../../common/token");
// const error = require("./usersError");

const router = express.Router();

router.get("/", async (req, res) => {
  const { token } = req.body;
  const payload = decodeToken(token);

  try {
    const user = await db.getUserById(payload.id);
    const users = await db.getUsers(user.department);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user info."})
  }
});

module.exports = router;
