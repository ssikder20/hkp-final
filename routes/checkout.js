const router = require("express").Router();
const Metric = require("../models/Metric");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/verifyToken");
const jwt = require("jsonwebtoken");

router.post("/checkout", verifyToken, async (req, res, next) => {
  const user = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

  await Cart.deleteMany({ username: user.username });
  const cart = req.body.cart;
  const date = new Date();

  for (let i = 0; i < cart.length; ++i) {
    const item = cart[i];
    const checkoutItem = new Metric({
      username: user.username,
      name: item["name"],
      description: item["description"],
      quantity: Number(item["quantity"]),
      image: item["image"],
      timeBought: date.getTime(),
    });

    checkoutItem.save();
  }

  try {
    res.send({ message: "Purchase complete" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});
