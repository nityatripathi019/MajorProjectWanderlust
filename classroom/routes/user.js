const express = require("express");
const router = express.Router();

//index-users
router.get("/", (req, res) => {
  res.send("this is get user")
})
//show - users
router.get("/:id", (req, res) => {
  res.send("get for show users")
})

//post-users
router.post("/", (req, res) => {
  res.send("POST for users");
})

//DELETE -USER
router.delete("/:id", (req, res) => {
  res.send("DELETE for user id");
})

module.exports = router;