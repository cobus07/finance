module.exports = function(req, res, next) {
  var user = req.session.user;
  if (req.session.user) {
    req.session.destroy(function(err) {
      if (err) {
        res.json({msg: 'failed'});
        console.log('user %s logout failed.', user);
      } else {
        res.json({msg: 'success'});
        console.log('user %s logout sucessed.', user);
      }
    });
  } else {
    res.json({msg: 'Not login'});
  }
};
