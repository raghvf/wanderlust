const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { savedRedirectUrl } = require("../middleware");
const userController = require('../controllers/users');


//signup
router.route("/signup")
.get(userController.signUpForm)
.post(userController.signUpUser);

router.route("/login")
.get(userController.loginForm)
.post(
    savedRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.loginUser
)

// logout
router.get("/logout", userController.logOutUser);

module.exports = router;