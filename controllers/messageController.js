const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.create_message_get = (req, res) => {
  res.render("create_message_form", {
    title: "New message",
  });
};

exports.create_message_post = [
  body("title").notEmpty().trim().escape(),
  body("text_body").notEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      res.render("create_message_form", {
        title: "Create new message",
        errors: errors.array(),
      });
    }
    const message = new Message({
      title: req.body.title,
      timestamp: Date(),
      body: req.body.text_body,
      user: res.locals.currentUser._id,
    });
    message.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];

exports.messages_list = (req, res) => {
  let messageQuery = Message.find();
  if (res.locals.currentUser?.membership_status === true) {
    messageQuery = Message.find().populate("user");
  }

  messageQuery.exec((err, list_messages) => {
    if (err) {
      return next(err);
    }
    res.render("index", { title: "Home", messages: list_messages });
  });
};
