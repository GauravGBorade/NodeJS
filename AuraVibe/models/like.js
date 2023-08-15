const mongoose = require("mongoose");

// Define the schema for the 'Like' collection
const likeSchema = new mongoose.Schema(
  {
    // Reference to the user who performed the like
    user: {
      type: mongoose.Schema.ObjectId, // Reference to another document's ObjectId
    },

    // Reference to the likeable object (either a Post or a Comment)
    likeable: {
      type: mongoose.Schema.Types.ObjectId, // Reference to another document's ObjectId
      required: true,
      refPath: "onModel", // Dynamically determines the model to populate based on 'onModel' field
    },

    // Indicates whether the like is associated with a Post or a Comment
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"], // Enumerated values indicating the possible types.Only post or comment would be accepted in onModel because of this.
    },
  },
  {
    timestamps: true,
  }
);

// Create the 'Like' model based on the schema
const Like = mongoose.model("Like", likeSchema);

// Export the 'Like' model to be used in other parts of the application
module.exports = Like;
