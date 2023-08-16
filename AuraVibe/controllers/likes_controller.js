// Controller function to toggle likes on posts/comments
const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");
module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let likedAlready = false;

    // Check if the type of entity is "Post" or "Comment"
    if (req.query.type == "Post") {
      // If it's a post, find the Post by ID and populate its 'likes' array
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      // If it's a comment, find the Comment by ID and populate its 'likes' array
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    // Check if the user has already liked this likeable object
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    if (existingLike) {
      // If the user has already liked, remove the like
      likeable.likes.pull(existingLike._id); // Remove the existing like from the 'likes' array
      likeable.save(); // Save the modified likeable object

      existingLike.deleteOne({ _id: existingLike._id }); // Delete the existing like from the 'Like' collection
      likedAlready = true; // Set the flag indicating that the user already liked
    } else {
      // If the user hasn't liked, create a new like
      let newLike = await Like.create({
        user: req.user._id, // Set the user ID to the current user
        likeable: req.query.id, // Set the ID of the liked entity (post/comment)
        onModel: req.query.type, // Set the type of the liked entity (post/comment)
      });
      likeable.likes.push(newLike._id); // Push the new like's ID to the 'likes' array
      likeable.save(); // Save the modified likeable object
    }

    return res.status(200).json({
      message: "Request Successful",
      data: {
        likedAlready: likedAlready,
      },
    });
  } catch (error) {
    console.log(error); // Log any errors that occur
    return res.redirect("/"); // Redirect the user in case of an error
  }
};
