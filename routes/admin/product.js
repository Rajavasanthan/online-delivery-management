var express = require("express");
var router = express.Router();
var { authenticate, permit } = require("../../library/authenticate");

router.post("/", [authenticate, permit("ADMIN")], (req, res) => {
  res.json({
    message: "Product Created!",
  });
});

module.exports = router;
