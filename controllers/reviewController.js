const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js")

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  console.log(req.params.id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "new review added");

  console.log("new review saved");
  res.redirect(`/listings/${req.params.id}`);
}

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })

  await Review.findByIdAndDelete(reviewId)
  req.flash("success", "Review deleted");
  res.redirect(`/listings/${id}`)


}