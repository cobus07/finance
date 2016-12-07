module.exports = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var db = req.db;
  db.User.findOne({username: username}, function(err, user) {
    if (err) {
      res.json({msg: 'Error acoured'});
    } else {
      if (!user) {
        res.json({msg: 'User doesn\'t exist'});
      } else {
        if (user.username === username && user.password === password) {
          req.session.userId = user._id;
          res.json({msg: 'Authenticated'});
        } else {
          res.json({msg: 'Unauthenticated'});
        }
      }
    }
  });
};
