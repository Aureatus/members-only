var express = require("express");
var router = express.Router();
const { logout_get, logout_post } = require("../controllers/userController");

/* GET home page. */
router.get("/logout", logout_get);

router.post("/logout", logout_post);

module.exports = router;
