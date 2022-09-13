const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.sign_up_get = (req, res) => {
  res.render("sign_up_form", {
    title: "Sign up",
  });
};

exports.sign_up_post = [
  body("username").isEmail().normalizeEmail(),
  body("given_name").notEmpty().trim().escape(),
  body("family_name").notEmpty().trim().escape(),
  body("password").notEmpty().trim().escape(),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());

    if (!errors.isEmpty()) {
      res.render("sign_up_form", {
        title: "Sign up",
        errors: errors.array(),
      });
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) return next(err);
      const user = new User({
        user_name: req.body.username,
        given_name: req.body.given_name,
        family_name: req.body.family_name,
        password: hashedPassword,
        membership_status: false,
      });
      user.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    });
  },
];

exports.login_get = (req, res) => {
  res.render("login_form", {
    title: "Login",
  });
};

exports.login_post = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
};

exports.logout_get = (req, res) => {
  res.render("logout", {
    title: "Logout",
  });
};

exports.logout_post = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
