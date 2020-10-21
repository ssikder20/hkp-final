const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.body.token;
  if (!token) return res.status(401).send({ message: "Access Denied" });

  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verifiedToken;
    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid Token" });
  }
};
