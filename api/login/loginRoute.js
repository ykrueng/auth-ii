const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../../data/helpers/userDb");
const error = require("./loginError");
const { generateToken } = require("../common/token");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const user = req.body;

  if (!user || !user.username || !user.password) {
    next(400);
  }

  try {
    const matchUser = await db.getUserByName(user.username);
    if (
      matchUser &&
      bcrypt.compareSync(user.password, matchUser.password)
    ) {
      const token = generateToken({ id: matchUser.id });
      res.status(200).json({ token });
    } else {
      next(400);
    }
  } catch (err) {
    res.status(500);
  }
});

router.use(error);

module.exports = router;
