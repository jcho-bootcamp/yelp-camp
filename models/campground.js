const mongoose = require("mongoose");

// SCHEMA
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

// MODEL
module.exports = mongoose.model("Campground", campgroundSchema);