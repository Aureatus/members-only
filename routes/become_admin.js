var express = require("express");
var router = express.Router();
const {
  become_admin_get,
  become_admin_post,
} = require("../controllers/userController");

/* GET home page. */
router.get("/become-admin", become_admin_get);

router.post("/become-admin", become_admin_post);

module.exports = router;
