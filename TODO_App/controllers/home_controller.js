const todos = require("../models/todo");

//exporting home controller i.e. our main homepage of TODO App.
//fetching data from DB then passing it to ejs file and rendering the home page with data.
module.exports.home = function (req, res) {
  todos
    .find({})
    .then((todo) => {
      res.render("home", {
        title: "TODO APP",
        todoList: todo, //passing todos to ejs
      });
    })
    .catch((err) => {
      console.log("Error while fetching data from DB");
      return;
    });
};

//creating a todo

module.exports.createTodo = function (req, res) {
  console.log(req.body.dueDate);

  // Get the date string from the form input
  const dateStr = req.body.dueDate;

  // Convert the date string to a Date object
  const dateObj = new Date(dateStr);

  // Format the date object to a desired format (e.g. May 23, 2023)
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  todos
    .create({
      desc: req.body.desc,
      category: req.body.category,
      dueDate: formattedDate, // Save the formatted date to MongoDB
    })
    .then((todo) => console.log(`new todo created : \n ${todo} `))
    .catch((err) => console.log(`ugh ohh Got this error : \n ${err}`));
  res.redirect("/");
};
