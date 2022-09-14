require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var session = require("express-session");
var bcrypt = require("bcryptjs");
var User = require("./models/user");

var indexRouter = require("./routes/index");
var signUpRouter = require("./routes/signUp");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var joinClubRouter = require("./routes/join_club.js");
var createMessageRouter = require("./routes/create_message");
var becomeAdminRouter = require("./routes/become_admin");
var deleteMessageRoute = require("./routes/delete_message");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

passport.use(
  new LocalStrategy(function verify(username, password, done) {
    User.findOne({ user_name: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return done(err);
        }
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

const { connect, connection } = require("mongoose");
const mongoDB = process.env.mongoConnectionURL;
connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/", signUpRouter);
app.use("/", loginRouter);
app.use("/", logoutRouter);
app.use("/", joinClubRouter);
app.use("/", createMessageRouter);
app.use("/", becomeAdminRouter);
app.use("/", deleteMessageRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
