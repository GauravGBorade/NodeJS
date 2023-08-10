//* usually in api we use index when we are listing something.
const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
const User = require("../../../models/user");
module.exports.index = async function (req, res) {
  let post = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  //!below line is deprecated.
  // return res.json(200,{});

  //same as above just syntax change.
  return res.status(200).json({
    data: {
      message: "list of posts",
      posts: post,
    },
  });
};

//* deleting post without authorisation.
module.exports.destroy = async function (req, res) {
  try {
    //! we are passing post.id in the url using string params.
    let post = await Post.findById(req.params.id);

    if (req.user.id == post.user) {
      post.deleteOne({ id: req.params.id });
      await Comment.deleteMany({ post: req.params.id });
      return res.status(200).json({
        message: "Post & it's comments are deleted!!",
      });
    } else {
      return res.status(401).json({
        message: "You cannot delete this post!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error!",
    });
  }
};

/* module.exports.users = async function (req, res) {
  try {
    let users = await User.find({});

    return res.status(200).json({
      userList: users,
    });
  } catch (err) {
    console.log(err);
  }
}; */
