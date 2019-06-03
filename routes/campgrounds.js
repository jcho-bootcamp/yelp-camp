const express = require("express");
const router = express.Router();

const Campground = require("../models/campground");

// INDEX route - show all campgrounds
router.get("/", (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  })
});

// CREATE route - create a new campground and save to DB
router.post("/", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;

  let newCampground = { name: name, image: image, description: desc };

  // campgrounds.push(newCampground); // No more need of the array, will be moved to a DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      // Redirect back to campgrounds
      res.redirect("/campgrounds");
    }
  })
});

// NEW route - show form to create new campground
router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

// SHOW route - shows more info about one particular campground
router.get("/:id", (req, res) => {
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // Render show template with that campground
      res.render("campgrounds/show", { campground: foundCampground });
    }
  });
});

module.exports = router;