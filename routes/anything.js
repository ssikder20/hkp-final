const router = require("express").Router();

router.post("/anything", async (req, res, next) => {
  const image = req.body.image;
  console.log(image);
  res.send("Gotten.");
});

module.exports = router;
