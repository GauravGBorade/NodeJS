module.exports.setFlash = function (req, res, next) {
  //* setting locals as to show this message in ejs file on browser.

  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
};
