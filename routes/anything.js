const router = require("express").Router();

router.post("/anything", async (req, res, next) => {
  const image = req.body.image;
  console.log(image);
});

module.exports = router;
