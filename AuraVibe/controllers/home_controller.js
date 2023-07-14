const posts = require("../models/post");
const user = require("../models/user");
/* 
module.exports.home = function (req, res) {
  posts
    .find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec()
    .then((posts) => {
      user.find({}).then((users) => {
        res.render("home", {
          title: "AuraVibe Social",
          posts: posts,
          all_users: users,
        });
      });
    })
    .catch((err) => {
      console.log("error fetching posts", err);
    });
}; */

//! converted above code to async await code

try {
  //* use try catch to catch errors.
  module.exports.home = async function (req, res) {
    //* first get all the posts with user and comments populated in it.
    let posts = await posts
      .find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    //* then get all the users
    let users = await user.find({});

    //* then in the end send users and posts to browser.
    return res.render("home", {
      title: "AuraVibe Social",
      posts: posts,
      all_users: users,
    });
  };
} catch (error) {
  console.log("Error", error);
  return;
}
