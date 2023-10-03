const express = require("express");

const { signup } = require("../controllers/signupController");
const { login } = require("../controllers/loginController");
const { editUser } = require("../controllers/editController");
const { verifyToken} = require("../middlewares/authJwt");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});
router.post("/login", login);
router.post("/signup", signup);
router.post("/edit", [verifyToken], editUser);

module.exports = router;
