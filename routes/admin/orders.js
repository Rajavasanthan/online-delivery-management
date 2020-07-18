var express = require("express");
const authenticate = require("../../library/authenticate");
const { permit } = require("../../library/authenticate");
var router = express.Router();
var {Order} = require("../../model/order");

router.get("/list-order",[authenticate,permit("ADMIN")],async (req,res) => {
     let orders = await Order.find();
     res.json(orders);
});

module.exports = router;