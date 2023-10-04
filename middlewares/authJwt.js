const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "You need to login first",
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized!",
      });
    }
    console.log(decoded); //gives the id iat and exp
    req.body._id = decoded.id;

    next();
  });
};


