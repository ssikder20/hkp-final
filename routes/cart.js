const router = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const Cart = require("../models/Cart");

router.post("/cart", verifyToken, async (req, res, next) => {
  const user = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

  try {
    var cart = await Cart.find({ username: user.username });
    var newCart = [];

    for (let i = 0; i < cart.length; ++i) {
      const item = {
        _id: cart[i]._id,
        name: cart[i].name,
        description: cart[i].description,
        image: cart[i].image,
        quantity: cart[i].quantity,
        __v: cart[i].__v,
      };
      newCart.push(item);
    }

    res.send({ items: newCart });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.post("/cart/create", verifyToken, async (req, res, next) => {
  try {
    const user = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    await Cart.deleteMany({ username: user.username });
    const cart = req.body.items;

    for (let i = 0; i < cart.length; ++i) {
      const item = cart[i];
      const cartItem = new Cart({
        username: user.username,
        name: item.name,
        description: item.description,
        quantity: Number(item.quantity),
        image: item.image,
      });

      cartItem.save();
    }

    res.send({ message: "Cart created / modified." });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
