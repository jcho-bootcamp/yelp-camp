const mongoose = require("mongoose");
const Campground = require("./models/campground");

let data = [
  {
    name: "Cloud's Rest",
    image: "https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "blah blah blah"
  },
  {
    name: "Desert Mesa",
    image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "blah blah blah"
  },
  {
    name: "Canyon Floor",
    image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "blah blah blah"
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("removed campgrounds");
      // Add a few campgrounds
      data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added a campground");
            // Create a comment
            Comment.create({
              text: "This place is great, but I wish there was Internet!",
              author: "Homer"
            }, (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("created a comment");
              }
            });
          }
        });
      });
    };
    // Add a few comments
  });
}

module.exports = seedDB;