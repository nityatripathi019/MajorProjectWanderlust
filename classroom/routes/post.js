const express = require("express");
const router = express.Router();


//post - users
router.get("/", (req, res) => {
  res.send("get for posts")
})

//show 
router.get("/:id", (req, res) => {
  res.send("get for post id");
});

//posts

router.post("/", (req, res) => {
  res.send("post for posts")
})
//delete
router.delete("/:id", (req, res) => {
  res.send("DELETE for post id");
})

module.exports = router;