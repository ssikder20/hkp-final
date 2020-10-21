const router = require("express").Router();
const Item = require("../models/Item");

router.get("/items/list", async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.send({ items: items });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.post("/items/create", async (req, res, next) => {
  const itemName = await Item.find({ name: req.body.name });
  if (itemName.length > 0)
    return res.status(409).send({ message: "Item already exists." });

  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    quantity: 0,
    image: req.body.image,
  });

  try {
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
