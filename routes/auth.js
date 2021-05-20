const express = require('express');
const {
  Register,
  login,
  forgotPassword,
  logout,
} = require("../controllers/auth");

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(Register);
router.route("/forgotPassword").post(forgotPassword);
router.route("/logout").get(logout);

module.exports = router;