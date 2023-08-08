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

module.exports.destroy = async function (req, res) {
  try {
    //! we are passing post.id in the url using string params.
    let post = await Post.findById(req.params.id);
    /* checking if user who is deleting the post i.e. who made the request is actually the user who created the post.
    i.e. post.user will give us user who is creator of the post as we fetched it in .then after finding the post.
    and req.user.id will give us user who is currently signed in ez */
    //! note that req.user._id gives us id in object format and req.user.id gives us in string format.

    post.deleteOne({ id: req.params.id });
    await Comment.deleteMany({ post: req.params.id });
    return res.status(200).json({
      message: "Post & it's comments are deleted!!",
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error!",
    });
  }
};

module.exports.users = async function (req, res) {
  try {
    let users = await User.find({});

    return res.status(200).json({
      userList: users,
    });
  } catch (err) {
    console.log(err);
  }
};
