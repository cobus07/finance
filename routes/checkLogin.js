module.exports.checkLogin = function(req, res, next) {
  if (req.session) {
    return next();
  } else {
    res.redirect('/');
  }
};
