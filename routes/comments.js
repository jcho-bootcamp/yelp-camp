const express = require("express");
const router = express.Router({ mergeParams: true });

const Campground = require("../models/campground");
const Comment = require("../models/comment");

// ==========================
// COMMENTS ROUTES
// ==========================

// Comments New
router.get("/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

// Comments Create
router.post("/", isLoggedIn, (req, res) => {
  // Lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // console.log(req.body.comment);
      // Create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          // Connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // Redirect to campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
