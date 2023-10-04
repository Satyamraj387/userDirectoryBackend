const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports.editUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    if (!user) {
      return res.json(400, {
        message: "Type in correct credentials",
        success: false,
        error: error,
      });
    }
    // console.log(user);
    let updateDoc = {
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };

    if (req.body?.password) {
      const password = bcrypt.hashSync(req.body.password, 8);
      updateDoc = { ...updateDoc, password };
    }
    console.log(updateDoc);

    if (user.email === req.body.email || user.isAdmin) {
      // Update the first document that matches the filter
      const result = await User.updateOne(
        { _id: req.body._id },
        { $set: { ...updateDoc } }
      );
      console.log(result);
      return res.json(200, {
        message: "sign in successful keep this token safe",
        result,
        success: true,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Sorry try again",
      success: false,
      error: error,
    });
  }
};
