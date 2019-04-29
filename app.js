const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds"),
  Comment = require("./models/comment");

seedDB();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

// Campground.create({
//   name: "Granite Hill",
//   image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
//   description: "This is a huge granite hill, no bathroom, no water, beatiful granite!"
// }, (err, campground) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Newly Created Campground : ");
//     console.log(campground);
//   }
// });

// let campgrounds = [
//   { name: "Salmon Creek", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg" },
//   { name: "Granite Hill", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg" },
//   { name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
//   { name: "Salmon Creek", image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg" },
//   { name: "Granite Hill", image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg" },
//   { name: "Salmon Creek", image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg" },
//   { name: "Granite Hill", image: "https://farm6.staticflickr.com/5080/7004537596_a29365d72f.jpg" },
//   { name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg" }
// ];

app.get("/", (req, res) => {
  res.render("landing");
});


// INDEX route - show all campgrounds
app.get("/campgrounds", (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  })
});

// CREATE route - create a new campground and save to DB
app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

// SHOW route - shows more info about one particular campground
app.get("/campgrounds/:id", (req, res) => {
  // Find the campground with provided ID
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // Render show template with that campground
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(3000, () => console.log("Server is listening on Port : 3000"));