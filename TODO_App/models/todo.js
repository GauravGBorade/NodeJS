const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
});

const todos = mongoose.model("todo", todoSchema);
module.exports = todos;
