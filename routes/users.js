var express = require('express');
var router = express.Router();
var {User } = require("../model/user");
/* GET users listing. */
router.post('/register',async function(req, res, next) {
  req.body.userType = "USER"
    let user = new User(req.body)

    try {
      await user.save();
      res.json({
        message : "User Created"
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message : "User not created"
      })
    }

});

module.exports = router;
