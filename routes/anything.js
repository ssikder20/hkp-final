const router = require("express").Router();

// General purpose router just for testing
router.post("/anything", async (req, res, next) => {
  const items = req.body.items;

  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    console.log(item.image);
  }

  res.send({ message: "Got" });
});

module.exports = router;
