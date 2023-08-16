const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    //* if browser is making ajax req while creating the form this fucntion will be triggered.
    if (req.xhr) {
      // console.log("this is logged from Post controller");
      return res.status(200).json({
        //we return the status as 200 i.e. success and set data to post which is created.
        data: {
          post: post,
          userName: req.user.name,
        },
        message: "Post Created!",
      });
    }

    req.flash("success", "Posted!!");
    res.redirect("back");
  } catch (err) {
    req.flash("Error", "Error Creating the Post :(");
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
      //deleting the likes on the posts and its comments
      //post is post's id. as we got from above req.params.id
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      //This is the query condition for the deletion. It specifies that documents should be deleted where the _id (unique identifier) of the "Like" document is found in the post.comments array.
      await Like.deleteMany({ _id: { $in: post.comments } });

      post.deleteOne({ id: req.params.id });
      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post Deleted!",
        });
      }

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
