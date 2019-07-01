const express = require("express");
const router = express.Router();

const passport = require("passport");
const User = require("../models/user");

// Root route
router.get("/", (req, res) => {
  res.render("landing");
});

// ==========================
// AUTHENTICATION ROUTES
// ==========================

// Show register form
router.get("/register", (req, res) => {
  res.render("register");
});

// Handle sign up logic
router.post("/register", (req, res) => {
  let newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err.message);
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome to YelpCamp " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// Show login form
router.get("/login", (req, res) => {
  res.render("login");
});

// Handling login logic
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), (req, res) => { });

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});

module.exports = router;