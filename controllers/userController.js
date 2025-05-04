const User = require("../models/user.js");

//signup route
module.exports.getSignupRoute = (req, res) => {
  res.render("users/signup.ejs")
}

//post signup route
module.exports.postSignupRoute = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to wanderlust");
      res.redirect("/listings");
    })

  } catch (e) {
    req.flash("error", "this username has already registered");
    res.redirect("/signup");
  }

}

//getloginroute
module.exports.getLoginRoute = (req, res) => {
  res.render("users/login.ejs");
}

//postloginroute
module.exports.postLoginRoute = async (req, res) => {
  req.flash("success", "welcome back to wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings"
  res.redirect(redirectUrl);
}

//logout

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "you are logged out successfully");
    res.redirect("/listings");
  })
}