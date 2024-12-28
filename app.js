const express = require("express");
const app = express();
const Listing = require("./models/listing.js")
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js")
const Review = require("./models/review.js")
const { reviewSchema } = require("./schema.js")
// console.log(Review);
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main().then(() => {
    console.log("mongo connection successfull")
}).catch((err) => {
    console.log(err);
})


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("HI, i am a root");
})


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next()
    }
}

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next()
    }
}

//index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}))
//new route

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
})
//show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const listing = await Listing.findById(id).populate("reviews");
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}))

//create new route
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
    // let{title,location,description,price,country}=req.body;

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

}))

//edit route

app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });

}))

//update route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings`);
}))

//delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log("deleted listing")
    console.log(deletedListing);
    res.redirect("/listings");
}))


app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log("new review saved");
    res.redirect(`/listings/${req.params.id}`);
}))
//delete route for reviews

app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/listings/${id}`)
}))
//standard route
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"))
})


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs", { err })

})
app.listen(8080, () => {
    console.log("server listening on port 8080");
})



