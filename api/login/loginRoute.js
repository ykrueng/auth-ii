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
    const result = await db.getUserByName(user.username);
    if (
      result.length &&
      bcrypt.compareSync(user.password, result[0].password)
    ) {
      const token = generateToken({ id: result[0].id });
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
