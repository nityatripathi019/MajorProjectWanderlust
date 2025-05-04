const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js")
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listingController.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })
// const { listingSchema } = require("../schema.js");

//get and post route
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    // validateListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.createNewRoute
    ));


//new route

router.get("/new",
  isLoggedIn,
  listingController.renderNewform
);




// Search route
router.get('/search', async (req, res) => {
  const { location } = req.query;

  try {
    const listings = await Listing.find({
      location: { $regex: new RegExp(location, 'i') }
    });
    console.log("User searched for:", location);

    res.render('listings/searchResults', { listings, location });
  } catch (err) {
    res.status(500).send('Server error while searching');
  }
});

//show,update,delete
router.route("/:id")
  .get(wrapAsync(listingController.showform
  ))
  .put(isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing
    ))
  .delete(isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing
    ))

//edit route

router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editForm
  ))

module.exports = router;