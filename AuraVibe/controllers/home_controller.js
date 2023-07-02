const posts = require("../models/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie("user_id", 12);
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
      res.render("home", {
        title: "AuraVibe Social",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log("error fetching posts", err);
    });
};
