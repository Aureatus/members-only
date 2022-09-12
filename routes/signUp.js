var express = require("express");
var router = express.Router();
const { sign_up_get } = require("../controllers/userController");

/* GET home page. */
router.get("/sign-up", sign_up_get);

module.exports = router;
