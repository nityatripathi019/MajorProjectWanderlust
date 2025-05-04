const express = require("express");
const app = express();
const session = require("express-session")
const sessionoption = {
  secret: "mysupersecretstring",
  resave: false, saveUninitialized: true
};
const flash = require("connect-flash")
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session(sessionoption));
app.use(flash());

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  if (name === "anonymous") {
    req.flash("err", "user not registered ");
  }
  else {
    req.flash("success", "user  registered successfully");
  }
  res.redirect("/hello");
})

app.get("/hello", (req, res) => {
  res.locals.successMsgs = req.flash("success")
  res.locals.errMsgs = req.flash("err");
  res.render("page.ejs", { name: req.session.name });
})
// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   }
//   else {
//     req.session.count = 1;
//   }

//   res.send(`you have sent a request ${req.session.count} times`);
// })

// app.get("/test", (req, res) => {
//   res.send("test successfull");
// })















// const users = require("./routes/user.js");
// const posts = require("./routes/post.js");
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookies", (req, res) => {
//   res.cookie("made-In", "India", { signed: true });
//   res.send("signed cookie sent");
// })

// app.get("/verify", (req, res) => {
//   console.log(req.signedCookies);
//   res.send("verified cookies ");
// })

// app.get("/getcookies", (req, res) => {
//   res.cookie("greet", "hello");
//   res.cookie("madeIn", "India");
//   res.cookie("hello", "jee");
//   res.send("sent you new cookies");
// })

// app.get("/greet", (req, res) => {
//   let { name = "not defined" } = req.cookies;
//   res.send(`Hello ,${name}`)
// })

// app.get("/", (req, res) => {
//   console.log(req.cookies);
//   res.send("Hi, i am root");
// })


// app.use("/users", users);
// app.use("/posts", posts);




app.listen(3000, () => {
  console.log("server is listening on port 3000")
})