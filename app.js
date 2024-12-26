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
    const listing = await Listing.findById(id);
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



// app.get("/testlisting", async (req,res)=>{
//  let sampleListing = new Listing ({
//     title : "My new Villa",
//     description : "By the Beach",
//     price : 2500,
//     location : "Calunguta , Goa",
//     country : "India"
//  })
//  await sampleListing.save();
//  console.log("sample was saved");
//  res.send("successfull testing");
// })
//error handling middleware

//joi : it is npm package that is used server side schema
//we used boostrap classses to validate client side schema now for server side we use joi