const mongoose = require("mongoose");

// SCHEMA
let commentSchema = mongoose.Schema({
  text: String,
  author: String
});

// MODEL
module.exports = mongoose.model("Comment", commentSchema);