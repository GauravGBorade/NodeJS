const Comment = require("../models/comment");
const Post = require("../models/post");
module.exports.create = function (req, res) {
  // post here is an input field we set as hidden with the name "post" in the EJS file.
  // Assuming req.body.post is a valid post ID.
  Post.findById(req.body.post)
    .then((post) => {
      if (post) {
        return Comment.create({
          content: req.body.content,
          user: req.user._id,
          //req.body.post below is a input field we set as hidden with name as "post" as we need post's id and we already had that there in the ejs file so just using it here.
          post: req.body.post,
          //afrer creating the comment; push it to the post db for reasons specified above(for easy fetching of comments as we frequently need them for every post.Note that comment here wil automatically add the id to the post db's comment filed.)
        }).then((comment) => {
          post.comments.push(comment);
          return post.save();
        });
      }
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("ERROR WHILE CREATING COMMENT*******");
      console.log(err);
    });
};
