const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports.getAllUsers = async (req, res) => {
  try {
    //  console.log(req.body);
    const user = await User.findOne({ _id: req.body._id });
    if (user && user.isAdmin) {
      let allUsers = await User.find({}).select("-password");
      console.log(allUsers);
      allUsers.forEach((u) => {
        console.log(u);
        return u;
      });

      return res.json(200, {
        message: "Here's the list of all user",
        allUsers,
        success: true,
      });
    }

    // const pp = allUsers.map((u) => {
    // //   const { _doc } = u;
    // //   console.log("u -->", u);
    // //   const { password, ...temp } = _doc;
    // //   return temp;
    // });
    return res.json(401, {
      message: "You are not authorized to access this content",
      success: false,
    });
  } catch (error) {
    return res.json(400, {
      message: "Sorry try again",
      success: false,
      error: error,
    });
  }
};
