const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json(400, {
        message: "Type in correct credentials",
        success: false,
        error: error,
      });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.json(401, {
        success: false,
        message: "Please fill valid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    // res.status(200).send({
    //   email: user.email,
    //   name: user.name,
    //   orders: user.orders,
    //   accessToken: token,
    //   message: "You have been successfully logged in",
    //   success: true,
    // });
    console.log(token);
    return res.json(200, {
      message: "sign in successful keep this token safe",
      ...user._doc, //need to hide password here
      token,
      success: true,
    });
  } catch (error) {
    return res.json(400, {
      message: "Sorry try again",
      success: false,
      error: error,
    });
  }
};
