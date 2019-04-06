const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let campgrounds = [
  { name: "Salmon Creek", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg" },
  { name: "Granite Hill", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg" },
  { name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
  { name: "Salmon Creek", image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg" },
  { name: "Granite Hill", image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg" },
  { name: "Salmon Creek", image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg" },
  { name: "Granite Hill", image: "https://farm6.staticflickr.com/5080/7004537596_a29365d72f.jpg" },
  { name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg" }
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