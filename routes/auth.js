const express = require('express');
const {Register, login, forgotPassword } = require('../controllers/auth')

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(Register);
router.route("/forgotPassword").post(forgotPassword);

module.exports = router;