const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/isAdmin", async (req, res, next) => {
  const token = req.body.token;
  const user = jwt.verify(token, process.env.TOKEN_SECRET);

  try {
    const dbUser = await User.findOne({ username: user.username });

    if (!dbUser.isAdmin) return res.status(401).send({ message: false });
    else return res.send({ message: true });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
