const posts = require("../models/post");
const user = require("../models/user");
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
};
