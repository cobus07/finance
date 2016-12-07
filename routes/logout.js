module.exports = function(req, res, next) {
  var userId = req.session.userId;
  req.session.destroy(function(err) {
      if (err) {
        res.json({msg: 'logout failed'});
        console.log('user %s logout failed.', userId);
      } else {
        res.json({msg: 'success'});
        console.log('user %s logout sucessed.', userId);
      }
    });
};
