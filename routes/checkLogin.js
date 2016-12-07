module.exports = function(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.json({msg: 'Unauthenticated'});
  }
};
