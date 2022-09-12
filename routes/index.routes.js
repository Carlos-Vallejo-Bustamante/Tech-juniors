const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.params);
  console.log(req.query);
  res.sendStatus(200);
});

module.exports = router;
