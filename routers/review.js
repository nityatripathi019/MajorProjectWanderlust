const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js")

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviewController.js");



router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview
))
//delete route for reviews

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview
))

module.exports = router;