const express = require("express");
const router = express.Router({ mergeParams: true });

const Campground = require("../models/campground");
const Comment = require("../models/comment");

// Name index.js for a reason
const middleware = require("../middleware");

// ==========================
// COMMENTS ROUTES
// ==========================

// Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

// Comments Create
router.post("/", middleware.isLoggedIn, (req, res) => {
  // Lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.flash("error", "Something went wrong...");
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // console.log(req.body.comment);
      // Create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          // Add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // Save comment
          comment.save()
          // Connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          req.flash("success", "Successfully added comment!");
          // Redirect to campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// Comments Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
    }
  });
});

// Comments Update
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// Comment Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  // findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted")
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;
