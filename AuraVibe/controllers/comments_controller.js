const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require("../mailers/comments_mailer");
module.exports.create = async function (req, res) {
  try {
    // post here is an input field we set as hidden with the name "post" in the EJS file.
    // Assuming req.body.post is a valid post ID.
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        //req.body.post below is a input field we set as hidden with name as "post" as we need post's id and we already had that there in the ejs file so just using it here.
        post: req.body.post,
        //afrer creating the comment; push it to the post db for reasons specified above(for easy fetching of comments as we frequently need them for every post.Note that comment here wil automatically add the id to the post db's comment filed.)
      });
      post.comments.push(comment);
      post.save();

      //as we are passing comment object to the mailer it requires the user's info in it. thus we need to populate it.
      await (
        await comment.populate("user", "name email")
      ).populate({
        path: "post",
        populate: { path: "user", select: "name email" },
        select: "content",
      });

      console.log("comment passing *****", comment);
      // (await comment.populate("post")).populate({path:"user", populate:""});
      //sending the comment object to the mailer.
      commentMailer.newCommment(comment);

      req.flash("success", "Comment Published!");
      res.redirect("/");
      // comment = await comment.populate("user", "name").execPopulate();
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

//! deleting the comments
module.exports.destroy = async function (req, res) {
  try {
    //* comment to be deleted will be sent from front end using string params inside req.params.id from URL.

    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      /* We want to delete the comment from 2 places 1. from comment db and 2. from post's comment array.
       but once we delete it from comment db; the post.id which it is associated with will also be gone.
       so here we are first copying the post.id from comemnt db which is stored in comment.post and later use it to find the post. */

      let postId = comment.post;

      comment.deleteOne({ id: req.params.id });

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
