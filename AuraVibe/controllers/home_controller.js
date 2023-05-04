module.exports.home = function (req, res) {
  res.render("home", {
    title: "AuraVibe Social",
  });
  // res.send("Controller working");
};
