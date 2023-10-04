const express = require("express");

const { signup } = require("../controllers/signupController");
const { login } = require("../controllers/loginController");
const { editUser } = require("../controllers/editController");
const { verifyToken } = require("../middlewares/authJwt");
const { getAllUsers } = require("../controllers/usersController");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.redirect('/login');
// });
router.post("/login", login);
router.post("/signup", signup);
router.post("/edit", [verifyToken], editUser);
router.get("/allUsers", [verifyToken], getAllUsers);

module.exports = router;
