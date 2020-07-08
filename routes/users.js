var express = require("express");
var router = express.Router();
var { User } = require("../model/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
/* GET users listing. */
router.post("/register", async function (req, res, next) {
  req.body.userType = "USER";

  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      if (err) throw err;
      req.body.password = hash;
      let user = new User(req.body);
      try {
        await user.save();
        res.json({
          message: "User Created",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "User not created",
        });
      }
    });
  });
});

router.post("/login", async function (req, res) {
  // console.log(req.body)
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) throw err;
      if (result) {
        jwt.sign(
          { id: user._id, type: user.userType },
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
          function (err, token) {
            if (err) throw err;
            res.status(200).json({
              message: "Correct",
              token: token,
            });
          }
        );
      } else {
        res.status(200).json({
          message: "Password Wrong",
        });
      }
    });
  } else {
    res.status(401).json({
      message: "E-Mail not found",
    });
  }
});

module.exports = router;
