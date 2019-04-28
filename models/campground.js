const mongoose = require("mongoose");

// SCHEMA
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

// MODEL
module.exports = mongoose.model("Campground", campgroundSchema);