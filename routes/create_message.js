var express = require("express");
var router = express.Router();
const {
  create_message_get,
  create_message_post,
} = require("../controllers/messageController");

/* GET home page. */
router.get("/create-message", create_message_get);

router.post("/create-message", create_message_post);

module.exports = router;
