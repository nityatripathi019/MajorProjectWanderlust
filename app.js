
if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

console.log(process.env.SECRECT)


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routers/listing.js");
const reviewRouter = require("./routers/review.js");
const userRouter = require("./routers/user.js");

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

const sessionoptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

// app.get("/", (req, res) => {
//     res.send("HI, i am a root");
// })

app.use(session(sessionoptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//fake user 
// app.get("/demouser", async (req, res) => {
//     let fakeuser = new User({
//         email: "abc@gmail.com",
//         username: "delta-student",
//     })

//     let registerdUser = await User.register(fakeuser, "helloworld");
//     res.send(registerdUser);
// })


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
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



