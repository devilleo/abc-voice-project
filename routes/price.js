var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log(req.user);
  res.render("price/pricing", { title: "Express", user: req.user });
});

module.exports = router;
