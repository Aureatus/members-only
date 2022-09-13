var express = require("express");
var router = express.Router();
const { login_get, login_post } = require("../controllers/userController");

/* GET home page. */
router.get("/login", login_get);

router.post("/login", login_post);

module.exports = router;
