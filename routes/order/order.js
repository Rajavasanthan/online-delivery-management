var express = require("express");
const authenticate = require("../../library/authenticate");
const { permit } = require("../../library/authenticate");
var router = express.Router();
var {Order} = require("../../model/order");

router.post("/create",[authenticate,permit("USER")],async (req,res) => {
     var order = await new Order(req.body);
     res.json({
          message : "Order Created"
     })
})

module.exports = router;