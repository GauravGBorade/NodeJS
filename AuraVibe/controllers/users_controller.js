module.exports.profile = function (res, res) {
  res.send("Profile page loaded!");
};

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "AuraVibe | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "AuraVibe | Sign In",
  });
};
