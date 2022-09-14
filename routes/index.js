var express = require("express");
var router = express.Router();

var { messages_list } = require("../controllers/messageController");

/* GET home page. */
router.get("/", messages_list);
module.exports = router;
