const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports.editUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.body._id });
    if (!user) {
      return res.json(400, {
        message: "Type in correct credentials",
        success: false,
        error: error,
      });
    }
    console.log(user);
    const updateDoc = {
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };

    if (req.body?.password) {
      updateDoc = { ...updateDoc, password: req.body.password };
    }

    if (user.email === req.body.email) {
      // Update the first document that matches the filter
      const result = await User.updateOne(
        { _id: req.body._id },
        { $set: { ...updateDoc } }
      );
      console.log(result);
      return res.json(200, {
        message: "sign in successful keep this token safe",
        result, //need to hide password here
        success: true,
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
