var express = require("express");
var router = express.Router();
var productRoute = require("./product")
var ordersRoute = require("./orders")

router.use("/product",productRoute)
router.use("/order",ordersRoute)

module.exports = router;