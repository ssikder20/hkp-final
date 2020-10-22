const router = require("express").Router();

// General purpose router just for testing
router.post("/anything", async (req, res, next) => {
  const image = req.body.image;
  console.log(image);
});

module.exports = router;
