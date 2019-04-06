const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let campgrounds = [
  { name: "Salmon Creek", image: "https://www.photosforclass.com/download/flickr-6015893151" },
  { name: "Granite Hill", image: "https://www.photosforclass.com/download/flickr-7121863467" },
  { name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/flickr-1430198323" }
];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;

  let newCampground = { name: name, image: image };

  campgrounds.push(newCampground);

  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

app.listen(3000, () => console.log("Server is listening on Port : 3000"));