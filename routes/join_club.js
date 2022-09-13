var express = require("express");
var router = express.Router();
const {
  join_club_get,
  join_club_post,
} = require("../controllers/userController");

/* GET home page. */
router.get("/join-club", join_club_get);

router.post("/join-club", join_club_post);

module.exports = router;
