const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../../data/helpers/userDb");
const error = require("./registerError");
const { generateToken } = require("../common/token");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const user = req.body;

  if (!user || !user.username || !user.password) {
    next(400);
  }

  user.password = bcrypt.hashSync(user.password, 12);
  
  try {
    const userId = await db.register(user);
    const token = generateToken({ id: userId[0] });
    if (userId.length) {
      res.status(201).json({ id: userId[0], token });
    } else {
      next(500);
    }
  } catch (err) {
    next(err.errno || 500);
  }
});

router.use(error);

module.exports = router;
