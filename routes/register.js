const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/users/register", async (req, res, next) => {
  if (req.body.username === null)
    return res.status(400).send({ message: "Username field cannot be empty." });

  if (req.body.password === null)
    return res.status(400).send({ message: "Password field cannot be empty" });

  const username = await User.find({ username: req.body.username });
  if (username.length > 0)
    return res.status(409).send({ message: "User already exists" });

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
  });

  try {
    await user.save();

    const payload = { username: user.username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.send({ token: token });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
