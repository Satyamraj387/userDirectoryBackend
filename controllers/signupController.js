const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports.signup = async (req, res) => {
  try {
    //  console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const password = bcrypt.hashSync(req.body.password, 8);
      req.body.password = password;
      console.log(req.body);
      if(req.body.email=='satyamraj387@gmail.com'){
        req.body.isAdmin=true;
      }else{
        req.body.isAdmin='false'
      }

      const newUser = await User.create(req.body);
      delete newUser._doc.password;

      return res.json(200, {
        ...newUser._doc,
        message: "User created successfully",
        success: true,
      });
    } else {
      return res.json(500, {
        message: "User Already Present!",
        success: false,
      });
    }
  } catch (error) {
    return res.json(400, {
      message: "Sorry try again",
      success: false,
      error: error,
    });
  }
};
