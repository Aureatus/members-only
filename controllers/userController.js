const User = require("../models/user");

exports.sign_up_get = (req, res) => {
  res.render("sign_up_form", {
    title: "Sign up",
  });
};
