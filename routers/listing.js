const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js")
const Listing = require("../models/listing.js")



const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next()
  }
}

//index route
router.get("/", wrapAsync(async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}))
//new route

router.get("/new", (req, res) => {
  res.render("listings/new.ejs")
})
//show route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  console.log(id);
  const listing = await Listing.findById(id).populate("reviews");
  console.log(listing);
  res.render("listings/show.ejs", { listing });
}))

//create new route
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
  // let{title,location,description,price,country}=req.body;

  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");

}))

//edit route

router.get("/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });

}))

router.put("/:id", validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings`);
}))

//delete route
router.delete("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  // console.log("deleted listing")
  console.log(deletedListing);
  res.redirect("/listings");
}))


module.exports = router;