const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    res.redirect("back");
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    //! we are passing post.id in the url using string params.
    let post = await Post.findById(req.params.id);
    /* checking if user who is deleting the post i.e. who made the request is actually the user who created the post.
    i.e. post.user will give us user who is creator of the post as we fetched it in .then after finding the post.
    and req.user.id will give us user who is currently signed in ez */
    //! note that req.user._id gives us id in object format and req.user.id gives us in string format.
    if (post.user == req.user.id) {
      post.deleteOne({ id: req.params.id });
      await Comment.deleteMany({ post: req.params.id });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
