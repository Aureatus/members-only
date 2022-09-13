var express = require("express");
var router = express.Router();
const { sign_up_get, sign_up_post } = require("../controllers/userController");

/* GET home page. */
router.get("/sign-up", sign_up_get);

router.post("/sign-up", sign_up_post);

module.exports = router;
