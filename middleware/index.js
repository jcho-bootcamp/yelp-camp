const Campground = require("../models/campground");
const Comment = require("../models/comment");

let middlewareObj = {};

// Check campground ownership
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  // Is user logged in?
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        res.redirect("back");
      } else {
        // Does user own campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          // Otherwise redirect
          res.redirect("back");
        }
      }
    });
  } else {
    // If not, redirect
    res.redirect("back");
  }
}

// Check campground ownership
middlewareObj.checkCommentOwnership = function (req, res, next) {
  // Is user logged in?
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        // Does user own comment?
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          // Otherwise redirect
          res.redirect("back");
        }
      }
    });
  } else {
    // If not, redirect
    res.redirect("back");
  }
}

// Check login state
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // Flash message
  req.flash("error", "Please login first!");
  res.redirect("/login");
}

module.exports = middlewareObj;

// Different ways of Exporting

// let middlewareObj = {
//   checkCampgroundOwnership: function() {

//   },
//   checkCommentOwnership: function() {

//   }
// };

// module.exports = {
//   checkCampgroundOwnership: function() {

//   }
// };

