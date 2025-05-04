
const Listing = require("../models/listing.js")

//index route controller
module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}

//new route controller
module.exports.renderNewform = (req, res) => {

  res.render("listings/new.ejs")
}

//show route

module.exports.showform = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  const listing = await Listing.findById(id).populate({
    path: "reviews", populate: {
      path: "author",
    }
  }).populate("owner");
  console.log(listing);
  if (!listing) {
    req.flash("error", "listing that you looking for does not exit");
    return res.redirect("/listings")
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
}

//create new route

module.exports.createNewRoute = async (req, res, next) => {
  // let{title,location,description,price,country}=req.body;
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "...", filename);

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename }
  await newListing.save();
  req.flash("success", "new listing created");
  res.redirect("/listings");

}
//edit route
module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing that you looking for does not exit");
    return res.redirect("/listings")
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250")

  res.render("listings/edit.ejs", { listing, originalImageUrl });

}
//update route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename }
    await listing.save();
  }

  req.flash("success", "listing updated");
  res.redirect(`/listings/${id}`);
}

//delete route

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  // console.log("deleted listing")
  console.log(deletedListing);
  req.flash("success", "listing deleted");
  res.redirect("/listings");
}