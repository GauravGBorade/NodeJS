const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    //! as post and user need to be linked; we are referencing them here.
    //! user will be the type of objectId which is present in DB and is byDefault unique.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    //include the array of id's of all commments here for easy fetching of comments on post as we need them almost everytime.
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
