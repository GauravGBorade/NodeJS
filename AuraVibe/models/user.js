const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatar");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

//!storing the files in local storage.
let storage = multer.diskStorage({
  //* set destination where files will be stored.
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH)); //this will create the absolute path wrt current directory where files will be stored.
  },
  //*set the filename. Note - we will append current date time in miliseconds to the filename to avoid the same file name again.
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//* adding static files to access them over all user.

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("user", userSchema);
module.exports = User;
