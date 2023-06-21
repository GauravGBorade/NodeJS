module.exports.home = function (req, res) {
  console.log(req.cookies);
  // res.cookie("user_id", 12);
  res.render("home", {
    title: "AuraVibe Social",
  });
  // res.send("Controller working");
};
