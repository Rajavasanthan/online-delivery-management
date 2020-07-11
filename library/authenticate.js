const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  if (req.headers.authorization) {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (
      err,
      decoded
    ) {
      console.log(decoded);
      if (decoded == undefined) {
        res.status(401).json({
          message: "UnAuthorized",
        });
      } else {
        req.userId = decoded.id;
        req.userType = decoded.type;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "UnAuthorized",
    });
  }
}

function permit(...allowedUser) {
  const isAllowed = (role) => allowedUser.indexOf(role) > -1;
  return (request, response, next) => {
    if (request.userType && isAllowed(request.userType)) {
      next();
    } else {
     response.status(401).json({
        message: "UnAuthorized",
      });
    }
  };
}

module.exports = { authenticate, permit };
