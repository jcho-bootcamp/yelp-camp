const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds"),
  Comment = require("./models/comment"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("./models/user"),
  methodOverride = require("method-override");

// Requiring routes
const campgroundRoutes = require("./routes/campgrounds"),
  commentRoutes = require("./routes/comments"),
  indexRoutes = require("./routes/index");

// seedDB(); // Seed the database

// Flash messages
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Rust wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  // Flash accessible on every template
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

mongoose.connect("mongodb + srv://jcho0627:KX0JrmAChaqo63Z@cluster0-y4ipg.mongodb.net/yelp_camp_v12?retryWrites=true&w=majority", { useNewUrlParser: true });

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

app.listen(process.env.PORT || 3000, () => console.log("Server is listening on Port : 3000"));