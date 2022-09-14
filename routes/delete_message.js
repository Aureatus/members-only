var express = require("express");
var router = express.Router();
const {
  delete_message_get,
  delete_message_post,
} = require("../controllers/messageController");

/* GET home page. */
router.get("/:id/delete", delete_message_get);

router.post("/:id/delete", delete_message_post);

module.exports = router;
